from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db.index import Query, get_db, QueryPriority, QueryStatus
from datetime import datetime, UTC
from pydantic import BaseModel

class QueryCreate(BaseModel):
    title: str
    description: str | None = None
    priority: QueryPriority = QueryPriority.NORMAL.value

class QueryEdit(BaseModel):
    status: QueryStatus

router = APIRouter(prefix="/queries")

@router.get("/")
def read_queries(db: Session = Depends(get_db)):
    items = db.query(Query).all()
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
def add_query(item: QueryCreate, db: Session = Depends(get_db)):
    created_at = datetime.now(UTC)
    item = Query(**item.model_dump() | {"created_at": created_at, "updated_at": created_at})

    db.add(item)
    db.commit()
    db.refresh(item)
    return {
        "result": "ok"
    }

@router.put("/{query_id}")
def edit_query(query_id: int, item: QueryEdit, db: Session = Depends(get_db)):
    db_item = db.get(Query, query_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if db_item.status == QueryStatus.DONE.value:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Query status: done, which is permanent")
    
    db_item.status = item.status.value
    db.commit()

    return {
        "result": "ok"
    }

@router.delete("/{query_id}")
def remove_query(query_id: int, db: Session = Depends(get_db)):
    db_item = db.get(Query, query_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if db_item.status == QueryStatus.DONE.value:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Query status: done. Unable to delete")
    db.delete(db_item)
    db.commit()
    return {
        "result": "ok"
    }
