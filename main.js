// 1. 투두리스트 디자인 만들기
// 2. Todo 객체 생성
// 내용, 체크여부, id

// 날짜
let time = $("#time");
let day = $("#day");
setTimeout(() => {
  timer();
  thisDay();
});
setInterval(() => {
  timer();
}, 1000);

function timer() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  time.text(
    `${hours < 10 ? `0${hours}` : hours} : ${
      minutes < 10 ? `0${minutes}` : minutes
    } : ${seconds < 10 ? `0${seconds}` : seconds}`
  );
}

function thisDay() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  day.text(
    `${year} / ${month + 1 < 10 ? `0${month + 1}` : month + 1} / ${
      date < 10 ? `0${date}` : date
    }`
  );
}

// 날씨
const api_key = "91bdbdffc330fa9fd5e5f1cf3e376ed4";
const setWeather = $("#weather");
setTimeout(() => {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    },
    function (error) {
      console.log("위치 정보 제공을 거부하였습니다.");
      alert("위치 정보가 제공되지 않았습니다.");
    }
  );
});

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=kr`
  )
    .then((response) => response.json())
    .then((data) => {
      const icon = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      const temperature = Math.floor(data.main.temp);
      const description = data.weather[0].description;
      $("#icon").attr("src", iconURL);
      setWeather.text(`${description} (${temperature}°C)`);
    })
    .catch((error) => {
      alert(error);
    });
}

// 투두 추가
const todos = [];
const todoAdd = $("#todoAdd");
const todoUl = $("#todo_list");

// 엔터키
$(document).on("keydown", function (event) {
  if (event.key === "Enter" && todoAdd.val() !== "") {
    todoList();
  }
});

const saveTodoList = JSON.parse(localStorage.getItem("list"));
console.log(saveTodoList);
if (saveTodoList) {
  for (let k = 0; k < saveTodoList.length; k++) {
    todos.push(saveTodoList[k]);
    console.log(todos);
    let li = $("<li></li>").attr("id", saveTodoList[k].id);
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

    span.text(saveTodoList[k].content);

    if (saveTodoList[k].checked === true) {
      span.addClass("finsh");
      check.prop("checked", true);
    }
    makeTodo();
  }
}
let i = todos.length;
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
    i++;
    todos.push(todo);
    console.log(todos);
    saveItem();
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
      .off("click")
      .on("click", () => {
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
            saveItem();
          } else {
            alert("내용을 적어주세요...");
          }
        }
        console.log(todos);
      });

    // 체크박스
    $(`#${item.id} #check`)
      .off("click")
      .on("click", () => {
        todoSpan.toggleClass("finsh");
        item.checked = $(`#${item.id} #check`).is(":checked");
        console.log(todos);
        saveItem();
      });

    // 삭제
    $(`#${item.id} #del`)
      .off("click")
      .on("click", () => {
        const index = todos.findIndex((t) => t.id === item.id);
        if (index !== -1) {
          todos.splice(index, 1);
        }
        $(`#${item.id}`).remove();
        console.log(todos);
        saveItem();
      });
  });
}

// 로컬 스토리지
function saveItem() {
  localStorage.setItem("list", JSON.stringify(todos));
}
