var API_SERVER_DOMAIN = "http://3.34.241.109:8080";

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
  const form = document.querySelector(".set-plant-name");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const plantNameInput = document.querySelector(".input-plant-name");
    const plantName = plantNameInput.value.trim();

    if (!plantName) {
      alert("식물의 이름을 입력해주세요.");
      return;
    }

    const plantType = localStorage.getItem("plantType");
    const accessToken = getCookie("accessToken");

    fetch(API_SERVER_DOMAIN + "/api/plant/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        type: plantType,
        name: plantName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create plant.");
        }
        return response.json(); // 서버 응답을 JSON 형식으로 파싱하여 반환
      })
      .then((data) => {
        console.log("식물이 생성되었습니다!", data);
        // 응답으로 받은 plantId를 localStorage에 저장
        localStorage.setItem("plantId", data.id);

        // 식물 생성 후 다음 페이지로 이동
        window.location.href = "../chaemin-html/main1.html";

        localStorage.setItem("plantName", plantName);
      })
      .catch((error) => {
        console.error("식물을 생성하는 도중 오류가 생겼습니다!", error);
        alert("식물 생성에 실패했습니다.");
      });
  });
});
