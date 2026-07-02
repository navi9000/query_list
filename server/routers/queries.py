from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import desc
from sqlalchemy.orm import Session
from ..db.index import Item, get_db, ItemPriority, ItemStatus
from datetime import datetime, UTC
from pydantic import BaseModel, StringConstraints
from math import ceil
from typing import Optional, Annotated
from ..middlewares.user import get_current_user

class ItemCreate(BaseModel):
    title: Annotated[str, StringConstraints(min_length=3, max_length=120)] 
    description: Annotated[str, StringConstraints(max_length=1000)] | None = None
    status: ItemStatus = ItemStatus.NEW
    priority: ItemPriority = ItemPriority.NORMAL

class ItemEdit(BaseModel):
    status: ItemStatus

class ItemResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: ItemStatus
    priority: ItemPriority
    created_at: str
    updated_at: str

router = APIRouter(prefix="/queries")

@router.get("/")
def read_items(
    page: int = Query(1, ge=1),
    status: Optional[ItemStatus] = Query(None), 
    priority: Optional[ItemPriority] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    db: Session = Depends(get_db)
):
    try:
        page_size = 10
        offset = (page - 1) * page_size
        
        query = db.query(Item)
        if status:
            query = query.filter(Item.status == status.value)
        if priority:
            query = query.filter(Item.priority == priority.value)
        if search:
            query = query.filter(Item.title.icontains(search) | Item.description.icontains(search))
        if sort_by:
            query = query.order_by(desc(sort_by))
        
        total = query.count()
        items = query.offset(offset).limit(page_size).all()

        total_pages = ceil(total / page_size)
        return {
            "is_success": True,
            "data": [
                {
                    "id": item.id,
                    "title": item.title,
                    "description": item.description,
                    "status": item.status,
                    "priority": item.priority,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at,
                }
                for item in items
            ],
            "meta": {
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages
            }
        }
    except:
        raise HTTPException(status_code=500, detail="Серверная ошибка")
        

@router.post("/", status_code=201)
def add_item(
    item: ItemCreate,
    db: Session = Depends(get_db)
):
    try:
        created_at = datetime.now(UTC)
        payload = item.model_dump(exclude_unset=True, mode="json")
        payload.setdefault("status", ItemStatus.NEW.value)
        payload.setdefault("priority", ItemPriority.NORMAL.value)
        payload.update({"created_at": created_at, "updated_at": created_at})
        new_item = Item(**payload)

        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return {
            "result": "ok"
        }
    except:
        raise HTTPException(status_code=500, detail="Серверная ошибка")



@router.put("/{item_id}")
def edit_Item(
    item_id: int,
    item: ItemEdit,
    db: Session = Depends(get_db)
):
    db_item = db.get(Item, item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    if db_item.status == ItemStatus.DONE.value:
        raise HTTPException(status_code=422, detail="Запись имеет статус \"Готово\". Его невозможно изменить.")
    
    db_item.status = item.status.value
    db_item.updated_at = datetime.now(UTC)
    db.commit()

    return {
        "result": "ok"
    }

@router.delete("/{item_id}")
def remove_item(
    item_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user)
):
    db_item = db.get(Item, item_id)
    if username != "admin":
        raise HTTPException(status_code=403, detail="У вас нет разрешения на удаление записи")
    if db_item is None:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    if db_item.status == ItemStatus.DONE.value:
        raise HTTPException(status_code=422, detail="Запись имеет статус \"Готово\". Ее невозможно удалить.")
    db.delete(db_item)
    db.commit()
    return {
        "result": "ok"
    }
