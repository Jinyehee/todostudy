// 1. 투두리스트 디자인 만들기
// 2. Todo 객체 생성
// 내용, 체크여부, id

const todoAdd = $("#todoAdd");
const todoUl = $("#todo_list");
function todoList() {
  let li = $("<li></li>");
  let check = $("<input type='checkbox'>").attr("id", "check");
  let span = $("<span></span>");
  let delBtn = $("<button></button>").attr("id", "del");
  let chgBtn = $("<button></button>").attr("id", "change");

  li.append(check);
  li.append(span);
  li.append(delBtn);
  li.append(chgBtn);

  todoUl.append(li);

  delBtn.text("삭제");
  chgBtn.text("수정");

  if (todoAdd.val()) {
    span.text(todoAdd.val());
  } else {
    alert("내용을 입력해주세요...");
  }
}
