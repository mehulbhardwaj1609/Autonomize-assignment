from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import Task, User
import csv
from fastapi.responses import StreamingResponse
import io

router = APIRouter(prefix="/analytics", tags=["Analytics"])


# TASK STATUS
@router.get("/status")
def task_status(db: Session = Depends(get_db)):

    results = db.query(
        Task.status,
        func.count(Task.id)
    ).group_by(Task.status).all()

    return [{"status": r[0], "count": r[1]} for r in results]


# TASK OVERVIEW
@router.get("/task-overview")
def task_overview(db: Session = Depends(get_db)):

    status_counts = db.query(
        Task.status,
        func.count(Task.id)
    ).group_by(Task.status).all()

    priority_counts = db.query(
        Task.priority,
        func.count(Task.id)
    ).group_by(Task.priority).all()

    return {
        "status_counts": [{"status": s[0], "count": s[1]} for s in status_counts],
        "priority_counts": [{"priority": p[0], "count": p[1]} for p in priority_counts]
    }


# USER PERFORMANCE
@router.get("/user-performance")
def user_performance(db: Session = Depends(get_db)):

    results = db.query(
        User.name,
        func.count(Task.id)
    ).join(
        Task, Task.assigned_to == User.id
    ).filter(
        Task.status == "done"
    ).group_by(
        User.name
    ).all()

    return [
        {"user": r[0], "completed_tasks": r[1]}
        for r in results
    ]


# TASK TRENDS
@router.get("/task-trends")
def task_trends(db: Session = Depends(get_db)):

    results = db.query(
        func.date(Task.due_date),
        func.count(Task.id)
    ).group_by(func.date(Task.due_date)).all()

    return [{"date": r[0], "tasks": r[1]} for r in results]


# EXPORT CSV
@router.get("/export")
def export_tasks(db: Session = Depends(get_db)):

    tasks = db.query(Task).all()

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(["ID","Title","Status","Priority","Due Date"])

    for t in tasks:
        writer.writerow([
            t.id,
            t.title,
            t.status,
            t.priority,
            t.due_date
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=tasks.csv"}
    )