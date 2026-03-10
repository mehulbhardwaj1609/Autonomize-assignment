from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)
    name = Column(String)
    tasks = relationship("Task", back_populates="owner")
    comments = relationship("Comment", back_populates="user")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(Text)
    status = Column(String)
    priority = Column(String)
    due_date = Column(DateTime)

    assigned_to = Column(Integer, ForeignKey("users.id"))
    is_deleted = Column(Boolean, default=False)

    owner = relationship("User", back_populates="tasks")
    comments = relationship("Comment", back_populates="task")
    files = relationship("File", back_populates="task")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    text = Column(Text)

    task_id = Column(Integer, ForeignKey("tasks.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("Task", back_populates="comments")
    user = relationship("User", back_populates="comments")


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    filepath = Column(String)

    task_id = Column(Integer, ForeignKey("tasks.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("Task", back_populates="files")