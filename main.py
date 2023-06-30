from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

memos = []

class Memo(BaseModel):
  insertAt: str
  content: str

@app.post("/memos")
def createMemo(memo: Memo):
  memos.append(memo)
  
@app.get("/memos")
def readMemos():
  return memos

app.mount("/", StaticFiles(directory="static", html=True), name="static")