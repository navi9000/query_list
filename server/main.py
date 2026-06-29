from contextlib import asynccontextmanager

from fastapi import FastAPI

from .db import index
from .routers import queries


@asynccontextmanager
async def lifespan(app: FastAPI):
    index.create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(queries.router)

