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
  console.log("hello");
  const input = document.querySelector("#memo-form > #memo-input");

  createMemo(input.value);
  input.value = null;
}
async function createMemo(text) {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth().toString().padStart(2, "0");
  const date = currentTime.getDate().toString().padStart(2, "0");
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");

  const memo = {
    insertAt: `${year}.${month}.${date} ${hours}:${minutes}`,
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
  li.textContent = `[${memo.insertAt}] ${memo.content}`;
  ul.appendChild(li);
}
