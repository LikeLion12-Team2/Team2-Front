const API_SERVER_DOMAIN = "http://3.34.241.109:8080";

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const addValue = document.querySelector("#add-list");
  const todoList = document.querySelector("#checklist");
  const todoCount = document.querySelector("#num");
  const wateringButton = document.querySelector("#watering-button");

  let checkboxes = [];
  let totalWateringCount = parseInt(localStorage.getItem("wateringCount")) || 0;
  let exp = parseInt(localStorage.getItem("exp")) || 0;
  let initiallyChecked = new Set();

  const updateCount = () => {
    const currentCheckedCount = countChecked();
    todoCount.textContent = totalWateringCount + currentCheckedCount;
  };

  const initializePage = () => {
    localStorage.removeItem("wateringCount");
    localStorage.removeItem("exp");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("checkbox_")) {
        localStorage.removeItem(key);
      }
    }
    todoList.innerHTML = "";
    totalWateringCount = 0;
    exp = 0;
    initiallyChecked = new Set();
    updateCount(); // Now updateCount is defined before it's called
  };

  function countChecked() {
    return checkboxes.reduce(
      (count, checkbox) => (checkbox.checked ? count + 1 : count),
      0
    );
  }

  const fetchActivities = () => {
    const accessToken = getCookie("accessToken");

    fetch(`${API_SERVER_DOMAIN}/api/activity`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        renderActivities(data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
        alert("활동 목록을 가져오는데 실패했습니다.");
      });
  };

  const createTodoItem = (activity, index) => {
    const newLi = document.createElement("li");

    const newLabel = document.createElement("label");
    const newSpan = document.createElement("span");
    const newCheckbox = document.createElement("input");
    const del = document.createElement("i");

    del.className = "fas fa-trash";
    newCheckbox.type = "checkbox";
    newCheckbox.id = `item${activity.activityId}`;
    newSpan.textContent = `${index + 1}. ${activity.content}`;

    const isChecked =
      localStorage.getItem("checkbox_" + activity.activityId) === "true";
    newCheckbox.checked = isChecked;

    if (isChecked) {
      newSpan.style.textDecoration = "line-through";
      initiallyChecked.add(newCheckbox);
    }

    newLabel.appendChild(newSpan);
    newLabel.appendChild(del);
    newLabel.appendChild(newCheckbox);
    newLi.appendChild(newLabel);

    todoList.appendChild(newLi);
    checkboxes.push(newCheckbox);

    newCheckbox.addEventListener("change", () =>
      handleCheckboxChange(newCheckbox, newSpan, activity.activityId)
    );
    del.addEventListener("click", () =>
      handleDelete(newLi, newCheckbox, activity.activityId)
    );
  };

  const renderActivities = (activities) => {
    activities.forEach((activity, index) => createTodoItem(activity, index));
    updateCount();
  };

  const handleCheckboxChange = (checkbox, span, activityId) => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      exp += 1;
      initiallyChecked.add(checkbox);
    } else {
      span.style.textDecoration = "none";
      exp -= 1;
      initiallyChecked.delete(checkbox);
    }

    localStorage.setItem("exp", exp);
    localStorage.setItem("checkbox_" + activityId, checkbox.checked);
    updateCount();

    const accessToken = getCookie("accessToken");

    fetch(`${API_SERVER_DOMAIN}/api/activity/check?activityId=${activityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update activity check status.");
        }
      })
      .then((data) => {
        console.log("Successfully updated activity check status!", data);
      })
      .catch((error) => {
        console.error("Error updating activity check status:", error);
        alert("활동 체크 상태 업데이트에 실패하였습니다.");
      });

    fetch(
      `${API_SERVER_DOMAIN}/api/activity/uncheck?activityId=${activityId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update activity check status.");
        }
      })
      .then((data) => {
        console.log("Successfully updated activity check status!", data);
      })
      .catch((error) => {
        console.error("Error updating activity check status:", error);
        alert("활동 체크 상태 업데이트에 실패하였습니다.");
      });
  };

  const handleDelete = (li, checkbox, activityId) => {
    if (initiallyChecked.has(checkbox)) {
      alert("물주기가 설정된 항목은 삭제할 수 없습니다.");
      return;
    }

    todoList.removeChild(li);
    checkboxes = checkboxes.filter((cb) => cb !== checkbox);
    localStorage.removeItem("checkbox_" + activityId);
    updateCount();
  };

  const addTodo = () => {
    if (addValue.value !== "") {
      const newActivity = {
        activityId: `temp_${Date.now()}`, // 임시 ID
        content: addValue.value,
      };

      createTodoItem(newActivity, todoList.childElementCount);
      addValue.value = "";
    } else {
      alert("내용을 입력하세요!");
    }
  };

  addValue.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  });

  wateringButton.addEventListener("click", () => {
    const currentCheckedCount = countChecked();
    const additionalCount = currentCheckedCount - initiallyChecked.size;

    if (totalWateringCount + additionalCount > 10) {
      alert("물주기는 최대 10회까지 가능합니다.");
      return;
    }

    totalWateringCount += additionalCount;
    exp += additionalCount;
    initiallyChecked = new Set(
      checkboxes.filter((checkbox) => checkbox.checked)
    );
    localStorage.setItem("wateringCount", totalWateringCount);
    localStorage.setItem("exp", exp);
    updateCount();

    const accessToken = getCookie("accessToken");
    const plantId = localStorage.getItem("plantId");

    if (!plantId) {
      console.error("Plant ID is null");
      alert("Plant ID가 설정되지 않았습니다.");
      return;
    }

    fetch(`${API_SERVER_DOMAIN}/api/watering/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        plantId: plantId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to water the plant.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully watered the plant!", data);
        alert(`물을 ${currentCheckedCount}회 주었습니다.`);
      })
      .catch((error) => {
        console.error("Error watering the plant:", error);
        alert("물주기에 실패하였습니다.");
      });
  });

  fetchActivities();
  initializePage(); // Call initializePage after defining updateCount
});
