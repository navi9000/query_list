from contextlib import asynccontextmanager

from fastapi import FastAPI

from .db.index import create_db_and_tables
from .routers import queries


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(queries.router)

