from fastapi import APIRouter
from api.routers import path_a, path_b, profile

router = APIRouter()

# Include all v1 routers
router.include_router(path_a.router, tags=["Path A - Recipe Generation"])
router.include_router(path_b.router, tags=["Path B - Plan Generation"])
router.include_router(profile.router, tags=["User Profile"]) 