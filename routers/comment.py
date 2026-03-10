from fastapi import Depends, APIRouter,HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from typing import List

router = APIRouter(prefix="/comments",tags=["Comments"])



@router.post("/tasks/{task_id}")
def add_comment(task_id: int, comment: schemas.CommentCreate, db: Session = Depends(get_db)):

    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    new_comment = models.Comment(
        text=comment.text,
        task_id=task_id,
        user_id=1
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment



@router.get("/tasks/{task_id}", response_model=List[schemas.CommentResponse])
def get_comments(task_id: int, db: Session = Depends(get_db)):

    comments = db.query(models.Comment).filter(
        models.Comment.task_id == task_id
    ).all()

    return comments



@router.put("/{comment_id}")
def update_comment(comment_id: int, comment: schemas.CommentCreate, db: Session = Depends(get_db)):

    db_comment = db.query(models.Comment).filter(
        models.Comment.id == comment_id
    ).first()

    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    db_comment.text = comment.text

    db.commit()
    db.refresh(db_comment)

    return db_comment



@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):

    db_comment = db.query(models.Comment).filter(
        models.Comment.id == comment_id
    ).first()

    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    db.delete(db_comment)
    db.commit()

    return {"message": "Comment deleted successfully"}