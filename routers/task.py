from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Task
from schemas import TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["Tasks"])




@router.post("/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = Task(
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        due_date=task.due_date,
        assigned_to=task.assigned_to
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task





@router.get("/")
def get_tasks(
    db: Session = Depends(get_db),
    status: Optional[str] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = "id",
    page: int = 1,
    limit: int = 10
):

    query = db.query(Task).filter(Task.is_deleted == False)

    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority)

    if search:
        query = query.filter(Task.title.ilike(f"%{search}%"))

    query = query.order_by(getattr(Task, sort_by))

    tasks = query.offset((page - 1) * limit).limit(limit).all()

    return tasks




@router.get("/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task



@router.put("/{task_id}")
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):

    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)

    return db_task




@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.is_deleted = True

    db.commit()

    return {"message": "Task deleted successfully"}





@router.post("/bulk")
def bulk_create_tasks(tasks: List[TaskCreate], db: Session = Depends(get_db)):

    task_objects = []

    for task in tasks:
        new_task = Task(
            title=task.title,
            description=task.description,
            status=task.status,
            priority=task.priority,
            due_date=task.due_date,
            assigned_to=task.assigned_to
        )

        task_objects.append(new_task)

    db.add_all(task_objects)
    db.commit()

    return {"message": f"{len(task_objects)} tasks created"}