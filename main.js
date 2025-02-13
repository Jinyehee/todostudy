// 1. 투두리스트 디자인 만들기
// 2. Todo 객체 생성
// 내용, 체크여부, id

const todos = [];
let i = 0;
const todoAdd = $("#todoAdd");
const todoUl = $("#todo_list");
function todoList() {
  if (todoAdd.val()) {
    let li = $("<li></li>").attr("id", i);
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

    span.text(todoAdd.val());

    todoAdd.val("");

    // 객체에 넣은 후 배열에 넣는다
    const todo = {
      content: span.text(),
      checked: check.is(":checked"),
      id: i,
      checkChange: false,
    };
    todos.push(todo);
    console.log(todos);
    i++;

    makeTodo();
  } else {
    alert("내용을 입력해주세요...");
  }
}

function makeTodo() {
  todos.forEach((item) => {
    const todoLi = $(`#${item.id}`);
    const todoSpan = $(`#${item.id} span`);
    // 수정 버튼에 대한 클릭 이벤트를 이벤트 위임을 통해 처리
    $(`#${item.id} #change`)
      .click(() => {})
      .off("click")
      .on("click", function () {
        if (!item.checkChange) {
          item.checkChange = true;
          todoSpan.css("display", "none");
          const todoChange = $("<input type='text'>").attr("id", "changeSpan");
          todoChange.val(todoSpan.text());
          todoLi.append(todoChange);
        } else {
          const todoChange = $(`#${item.id} #changeSpan`);
          if (todoChange.val()) {
            item.checkChange = false;
            todoSpan.text(todoChange.val());
            todoSpan.css("display", "inline-block");
            item.content = todoChange.val();
            todoChange.remove();
          } else {
            alert("내용을 적어주세요...");
          }
        }
        console.log(todos);
      });

    // 체크박스
    $(`#${item.id} #check`).click(() => {
      todoSpan.toggleClass("finsh");
      item.checked = $(`#${item.id} #check`).is(":checked");
      console.log(todos);
    });

    // 삭제
    $(`#${item.id} #del`).click(() => {
      const index = todos.findIndex((t) => t.id === item.id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
      $(`#${item.id}`).remove();
      console.log(todos);
    });
  });
}
