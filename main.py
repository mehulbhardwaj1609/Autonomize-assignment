from fastapi import FastAPI
from models import Base
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from routers import analytic, comment, files, task
from auth import router as auth_router




Base.metadata.create_all(bind = engine)

app = FastAPI(title = "Task API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(analytic.router)
app.include_router(comment.router)
app.include_router(task.router)
app.include_router(files.router)


@app.get("/")
def start():
    return {"message" : "app running"}



