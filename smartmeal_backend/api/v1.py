from fastapi import APIRouter
from api.routers.path_a_routes import router as path_a_router
from api.routers.path_b_routes import router as path_b_router
from api.routers import profile

router = APIRouter()

# Include all v1 routers
router.include_router(path_a_router, tags=["Path A - Recipe Generation"])
router.include_router(path_b_router, tags=["Path B - Plan Generation"])
router.include_router(profile.router, tags=["User Profile"]) 