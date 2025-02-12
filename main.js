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
    $(`#${item.id} #check`).click(() => {
      $(`#${item.id} span`).toggleClass("finsh");
      item.checked = $(`#${item.id} #check`).is(":checked");
      console.log(todos);
    });

    $(`#${item.id} #del`).click(() => {
      const index = todos.findIndex((t) => t.id === item.id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
      $(`#${item.id}`).remove();
      console.log(todos);
    });

    // 수정
    $(`#${item.id} #change`).click(() => {
      if (!item.checkChange) {
        item.checkChange = true;
        $(`#${item.id} span`).css("display", "none");
        let todoChange = $("<input type='text'>").attr("id", "changeSpan");
        todoChange.val($(`#${item.id} span`).text());
        $(`#${item.id}`).append(todoChange);
      } else {
        let todoChange = $(`#${item.id} #changeSpan`);
        if (todoChange.val()) {
          item.checkChange = false;
          $(`#${item.id} span`).text(todoChange.val());
          $(`#${item.id} span`).css("display", "inline-block");
          item.content = todoChange.val();
          todoChange.remove();
        } else {
          alert("내용을 적어주세요...");
        }
      }
      console.log(todos);
    });
  });
}
