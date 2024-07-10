const addValue = document.querySelector("#add-list");
const todoList = document.querySelector("#checklist");
const todoCount = document.querySelector("#num");
const wateringButton = document.querySelector("#watering-button");

let checkboxes = document.querySelectorAll(
  '.stress-relief-list input[type="checkbox"]'
);
let count = countChecked();
const maxTasks = 10;
let totalWateringCount = 0;
let exp = parseInt(localStorage.getItem("exp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
const levelExp = [2, 4, 5, 8, 10, 12, 14, 16, 18, 20]; // 각 레벨의 총 경험치
let initiallyChecked = new Set();
let previousCount = 0;

function countChecked() {
  let checkedCount = 0;
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkedCount++;
    }
  });
  return checkedCount;
}

function initializeCheckboxes() {
  checkboxes.forEach((checkbox, index) => {
    const labelSpan = checkbox.parentElement.querySelector("span");
    labelSpan.textContent = `${index + 1}. ${labelSpan.textContent.slice(
      labelSpan.textContent.indexOf(".") + 2
    )}`;
  });
}

initializeCheckboxes();

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (initiallyChecked.has(checkbox) && !checkbox.checked) {
      checkbox.checked = true;
      return;
    }

    const listItem = checkbox.parentElement;
    const labelSpan = listItem.querySelector("span");

    if (checkbox.checked) {
      labelSpan.style.textDecoration = "line-through";
    } else {
      labelSpan.style.textDecoration = "none";
    }
    updateCount();
  });
});

function updateCount() {
  count = countChecked();
  updateTodoCount();
}

const addTodo = () => {
  if (addValue.value !== "") {
    if (checkboxes.length >= maxTasks) {
      alert(`최대 ${maxTasks}개의 항목까지만 추가할 수 있습니다.`);
      return;
    }

    const newLi = document.createElement("li");

    const newLabel = document.createElement("label");
    const newSpan = document.createElement("span");
    const newCheckbox = document.createElement("input");
    const del = document.createElement("i");

    del.className = "fas fa-trash";
    newCheckbox.type = "checkbox";
    newSpan.textContent = `${checkboxes.length + 1}. ${addValue.value}`;

    newLabel.appendChild(newSpan);
    newLabel.appendChild(del);
    newLabel.appendChild(newCheckbox);
    newLi.appendChild(newLabel);

    todoList.appendChild(newLi);

    addValue.value = "";
    checkboxes = document.querySelectorAll(
      '.stress-relief-list input[type="checkbox"]'
    );
    updateTodoCount();

    newCheckbox.addEventListener("change", () => {
      if (initiallyChecked.has(newCheckbox) && !newCheckbox.checked) {
        newCheckbox.checked = true;
        return;
      }

      if (newCheckbox.checked) {
        newSpan.style.textDecoration = "line-through";
      } else {
        newSpan.style.textDecoration = "none";
      }
      updateCount();
    });

    del.addEventListener("click", (event) => {
      if (initiallyChecked.has(newCheckbox)) {
        alert("물주기가 설정된 항목은 삭제할 수 없습니다.");
        return;
      }

      todoList.removeChild(newLi);
      checkboxes = document.querySelectorAll(
        '.stress-relief-list input[type="checkbox"]'
      );
      updateCount();
      initializeCheckboxes();
    });
  } else {
    alert("내용을 입력하세요!");
  }
};

const updateTodoCount = () => {
  todoCount.textContent = totalWateringCount;
};

const updateExpAndLevel = () => {
  let requiredExp = levelExp[level - 1];
  while (exp >= requiredExp && level < 10) {
    exp -= requiredExp;
    level++;
    requiredExp = levelExp[level - 1];
  }

  localStorage.setItem("exp", exp);
  localStorage.setItem("level", level);
};

addValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
});

wateringButton.addEventListener("click", () => {
  const currentCheckedCount = countChecked();
  const additionalCount = currentCheckedCount - previousCount;

  if (totalWateringCount + additionalCount > 10) {
    alert("물주기는 최대 10회까지 가능합니다.");
    return;
  }

  totalWateringCount += additionalCount;
  previousCount = currentCheckedCount; // 현재 체크된 항목 수를 고정
  exp += additionalCount; // 경험치 증가
  updateTodoCount(); // num의 값을 물주기 수로 고정

  // 물주기 버튼을 누를 때 체크된 체크박스를 집합에 추가
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      initiallyChecked.add(checkbox);
    }
  });
  updateExpAndLevel();
  alert(`물을 ${totalWateringCount}회 주었습니다.`);
});
