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
    // 수정 버튼에 대한 클릭 이벤트를 이벤트 위임을 통해 처리
    $(`#${item.id} #change`)
      .off("click")
      .on("click", function () {
        const todoLi = $(this).closest("li");
        const todoSpan = todoLi.find("span");
        const todoChangeInput = todoLi.find("#changeSpan");

        if (!item.checkChange) {
          item.checkChange = true;
          todoSpan.css("display", "none");

          // 기존 input이 있는지 확인하고, 없다면 새로 생성
          if (todoChangeInput.length === 0) {
            const todoChange = $("<input type='text'>").attr(
              "id",
              "changeSpan"
            );
            todoChange.val(todoSpan.text());
            todoLi.append(todoChange);
          }
        } else {
          if (todoChangeInput.val()) {
            item.checkChange = false;
            todoSpan.text(todoChangeInput.val());
            todoSpan.css("display", "inline-block");
            item.content = todoChangeInput.val();
            todoChangeInput.remove();
          } else {
            alert("내용을 적어주세요...");
          }
        }
        console.log(todos);
      });

    // 체크박스 클릭
    $(`#${item.id} #check`)
      .off("click")
      .on("click", () => {
        $(`#${item.id} span`).toggleClass("finsh");
        item.checked = $(`#${item.id} #check`).is(":checked");
        console.log(todos);
      });

    // 삭제 클릭
    $(`#${item.id} #del`)
      .off("click")
      .on("click", () => {
        const index = todos.findIndex((t) => t.id === item.id);
        if (index !== -1) {
          todos.splice(index, 1);
        }
        $(`#${item.id}`).remove();
        console.log(todos);
      });
  });
}
