from jose import jwt,JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from database import get_db
from sqlalchemy.orm import Session
import models

SECRET_KEY = ""
ALGORITHM = "HS256"

oauth_scheme = OAuth2PasswordBearer(tokenUrl="login")



def create_token(user_id:int):
    return jwt.encode({"user_id":user_id},SECRET_KEY, algorithm=ALGORITHM)



def get_current_user(token : str = Depends(oauth_scheme), db : Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if user_id in None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
