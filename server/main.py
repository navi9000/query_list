from fastapi import FastAPI
from pydantic import BaseModel
from enum import Enum
from .routers import queries

app = FastAPI()

class QueryStatus(Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class QueryPriority(Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"

class Query(BaseModel):
    id: int
    title: str
    description: str | None = None
    status: QueryStatus
    priority: QueryPriority
    created_at: str
    updated_at: str


app.include_router(queries.router)