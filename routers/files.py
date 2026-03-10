from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import shutil
import os
from typing import List
from database import get_db
from models import File as FileModel, Task

router = APIRouter(prefix="/files", tags=["Files"])

UPLOAD_FOLDER = "uploads"



if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)



@router.get("/task/{task_id}")
def get_files(task_id: int, db: Session = Depends(get_db)):
    files = db.query(FileModel).filter(FileModel.task_id == task_id).all()
    return files


@router.post("/upload/{task_id}")
def upload_files(
    task_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    uploaded_files = []
    for file in files:
        file_location = f"{UPLOAD_FOLDER}/{file.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        db_file = FileModel(
            filename=file.filename,
            filepath=file_location,
            task_id=task_id
        )

        db.add(db_file)
        db.commit()
        db.refresh(db_file)

        uploaded_files.append(db_file)

    return uploaded_files




@router.get("/download/{file_id}")
def download_file(file_id: int, db: Session = Depends(get_db)):
    db_file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=db_file.filepath,
        filename=db_file.filename,
        media_type="application/octet-stream"
    )



@router.delete("/{file_id}")
def delete_file(file_id: int, db: Session = Depends(get_db)):
    db_file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    if os.path.exists(db_file.filepath):
        os.remove(db_file.filepath)

    db.delete(db_file)
    db.commit()

    return {"message": "File deleted successfully"}