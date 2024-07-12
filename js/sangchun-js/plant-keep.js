function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve userId and accessToken from local storage
  const userId = localStorage.getItem("userId");
  const accessToken = getCookie("accessToken");

  if (userId && accessToken) {
    const accessToken = getCookie("accessToken");
    const url = `http://3.34.241.109:8080/api/plant/allPlant/${userId}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        displayPlants(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    console.error("User ID not found in local storage");
  }
});
console.log(getCookie("accessToken"));
console.log(localStorage.getItem("userId"));

function displayPlants(plants) {
  const plantContainer = document.querySelector(".plant-container"); // 식물 컨테이너 선택

  let keepIndex = 1; // plant-keep의 숫자 초기화
  let middleIndex = 1; // keep-middle의 숫자 초기화

  plants.forEach((plant) => {
    if (plant.status === "Complete") {
      const plantDiv = document.createElement("div");
      plantDiv.className = `keep-middle${middleIndex}`; // middle 숫자 설정

      let imageUrl;
      if (plant.type === "FLOWER") {
        imageUrl = "/sangchun-html/sangchun-img/Group 83.png"; // 꽃 이미지 경로 입력
      } else if (plant.type === "TREE") {
        imageUrl = "/sangchun-html/sangchun-img/noto_deciduous-tree.png"; // 나무 이미지 경로 입력
      }

      plantDiv.innerHTML = `
        <a href="plant-keep${keepIndex}.html">
          <img src="${imageUrl}" alt="${plant.name}" />
        </a>
        <div class="keep-plantname">
          <p>${plant.name}</p>
        </div>
        <div class="keep-planttype">
          <p>${plant.type}</p>
        </div>
      `;

      plantContainer.appendChild(plantDiv); // 생성한 식물 DIV 추가

      keepIndex++; // 다음 plant-keep 번호 증가
      if (middleIndex < 4) {
        // keep-middle의 최대는 4
        middleIndex++;
      }
    }
  });
}
