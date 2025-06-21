from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import router as api_v1_router

app = FastAPI(
    title="SmartMeal API",
    description="SmartMeal P0 MVP Backend API",
    version="1.0.0"
)

# CORS configuration for React Native development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_v1_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "SmartMeal API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 