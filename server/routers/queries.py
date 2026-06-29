from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from ..db.index import Item, get_db, ItemPriority, ItemStatus
from datetime import datetime, UTC
from pydantic import BaseModel
from math import ceil

class ItemCreate(BaseModel):
    title: str
    description: str | None = None
    priority: ItemPriority = ItemPriority.NORMAL.value

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
def read_items(page: int = Query(1, ge=1), db: Session = Depends(get_db)):
    page_size = 10
    offset = (page - 1) * page_size
    total = db.query(Item).count()

    items = db.query(Item).offset(offset).limit(page_size).all()

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
    return [
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
    ]

@router.post("/", status_code=status.HTTP_201_CREATED)
def add_item(item: ItemCreate, db: Session = Depends(get_db)):
    created_at = datetime.now(UTC)
    item = Item(**item.model_dump() | {"created_at": created_at, "updated_at": created_at})

    db.add(item)
    db.commit()
    db.refresh(item)
    return {
        "result": "ok"
    }

@router.put("/{item_id}")
def edit_Item(item_id: int, item: ItemEdit, db: Session = Depends(get_db)):
    db_item = db.get(Item, item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if db_item.status == ItemStatus.DONE.value:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Item status: done, which is permanent")
    
    db_item.status = item.status.value
    db_item.updated_at = datetime.now(UTC)
    db.commit()

    return {
        "result": "ok"
    }

@router.delete("/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.get(Item, item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if db_item.status == ItemStatus.DONE.value:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Item status: done. Unable to delete")
    db.delete(db_item)
    db.commit()
    return {
        "result": "ok"
    }
