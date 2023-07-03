from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

memos = []

class Memo(BaseModel):
  id: str
  content: str

@app.post("/memos")
def createMemo(memo: Memo):
  memos.append(memo)
  
@app.get("/memos")
def readMemos():
  return memos

@app.put("/memos/{memo_id}")
def editMemo(newMemo: Memo, memo_id):
  for memo in memos:
    if memo.id == memo_id:
      memo.content = newMemo.content
      return "200"
  
  return "그런 메모는 존재하지 않습니다."

@app.delete("/memos/{delete_id}")
def deleteMemo(delete_id):
  for (index, memo) in enumerate(memos):
    if (memo.id == delete_id):
      memos.pop(index)
      return "200"
    
  return "그런 메모는 존재하지 않습니다."

app.mount("/", StaticFiles(directory="static", html=True), name="static")