from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: str
    password: str
    name: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str

    model_config = {
        "from_attributes": True
    } 



class TaskCreate(BaseModel):
    title: str
    description: Optional[str]
    status: str
    priority: str
    due_date: Optional[datetime]
    assigned_to: Optional[int]


class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    priority: Optional[str]
    due_date: Optional[datetime]
    assigned_to: Optional[int]



class CommentCreate(BaseModel):
    text: str



class CommentResponse(BaseModel):
    id: int
    text: str
    task_id: int

    model_config = {
        "from_attributes": True
    }    


class FileResponse(BaseModel):
    id: int
    filename: str
    task_id: int

    model_config = {
        "from_attributes": True
    }       