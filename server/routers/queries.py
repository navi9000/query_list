from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.index import Query, get_db, QueryPriority, QueryStatus
from datetime import datetime, UTC
from pydantic import BaseModel

class QueryCreate(BaseModel):
    title: str
    description: str | None = None
    priority: QueryPriority = QueryPriority.NORMAL.value

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

@router.post("/")
def add_query(item: QueryCreate, db: Session = Depends(get_db)):
    created_at = datetime.now(UTC)
    item = Query(**item.model_dump() | {"created_at": created_at, "updated_at": created_at})

    db.add(item)
    db.commit()
    db.refresh(item)
    return {
        "result": "ok"
    }