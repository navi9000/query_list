from fastapi import APIRouter

router = APIRouter(prefix="/queries")

@router.get("/")
def read_queries():
    return {"is_success": True, "data": []}