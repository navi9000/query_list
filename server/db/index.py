
from enum import Enum

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

class QueryStatus(Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class QueryPriority(Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"


sqlite_filename = "database.db"
sqlite_url = f"sqlite:///{sqlite_filename}"
engine = create_engine(sqlite_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Query(Base):
    __tablename__ = "queries"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, default=None, index=True, nullable=True)
    status = Column(String, default=QueryStatus.NEW.value, index=True)
    priority = Column(String, default=QueryPriority.NORMAL.value, index=True)
    created_at = Column(String, index=True)
    updated_at = Column(String)

def create_db_and_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



