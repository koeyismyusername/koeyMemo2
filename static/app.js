const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemoAll();

/*
=========================================================
함수 선언부
=========================================================
*/
function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-form > #memo-input");

  createMemo(input.value);
  input.value = null;
}
async function createMemo(text) {
  const memo = {
    id: new Date().getTime(),
    content: text,
  };
  const body = JSON.stringify(memo);

  await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  displayMemo(memo);
}

async function readMemoAll() {
  const res = await fetch("/memos");
  const memos = await res.json();
  memos.forEach((memo) => displayMemo(memo));
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const currentTime = new Date(parseInt(memo.id));

  const year = currentTime.getFullYear();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  const date = currentTime.getDate().toString().padStart(2, "0");
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");

  li.textContent = `[${year}.${month}.${date} ${hours}:${minutes}] ${memo.content}`;
  li.dataset.id = memo.id;

  // 수정 버튼
  const btnEdit = document.createElement("button");
  btnEdit.textContent = "수정";
  btnEdit.addEventListener("click", editMemo);
  li.appendChild(btnEdit);

  // 삭제 버튼
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "삭제";
  btnDelete.addEventListener("click", deleteMemo);
  li.appendChild(btnDelete);

  ul.appendChild(li);
}

async function editMemo(event) {
  const newContent = prompt("새로운 메모를 입력하세요.");
  const memo = {
    id: new Date().getTime(),
    content: newContent,
  };

  await fetch(`/memos/${event.target.parentElement.dataset.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });

  window.location.reload();
}

async function deleteMemo(event) {
  const memoID = event.target.parentElement.dataset.id;
  await fetch(`/memos/${memoID}`, {
    method: "DELETE",
  });
  window.location.reload();
}
