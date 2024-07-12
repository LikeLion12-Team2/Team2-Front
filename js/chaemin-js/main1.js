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
  const levelDisplay = document.querySelector("#level");
  const expDisplay = document.querySelector("#exp");
  const plantImage = document.querySelector("#levelplant img");
  const wateringcanImage = document.querySelector("#wateringcan");
  const sunImage = document.querySelector("#main1-sun img");
  const plantButton = document.querySelector("#plant-storage");
  const setLevelButton = document.querySelector("#sevenButton");

  // 식물 이름 설정
  const plantNameElements = document.querySelectorAll(".plant-name-display");
  const plantName = localStorage.getItem("plantName");

  if (plantName) {
    plantNameElements.forEach((element) => {
      element.textContent = plantName;
    });
  } else {
    plantNameElements.forEach((element) => {
      element.textContent = "이름이 설정되지 않았습니다.";
    });
  }

  // 식물 종류에 따라 이미지 설정
  const setPlantImages = () => {
    const plantType = localStorage.getItem("plantType");

    let plantImages;

    if (plantType === "TREE") {
      plantImages = [
        "../chaemin-img/plant1.png", // 1-3 레벨
        "../chaemin-img/plant2.png", // 4-6 레벨
        "../chaemin-img/tree3.png", // 7-9 레벨
        "../chaemin-img/tree4.png", // 10 레벨
      ];
    } else {
      plantImages = [
        "../chaemin-img/plant1.png", // 1-3 레벨
        "../chaemin-img/plant2.png", // 4-6 레벨
        "../chaemin-img/flower3.png", // 7-9 레벨
        "../chaemin-img/flower4.png", // 10 레벨
      ];
    }

    return plantImages; // 배열 반환
  };

  plantButton.style.display = "none";

  // 레벨과 경험치 업데이트
  const updateExpAndLevel = () => {
    const levelExp = [2, 4, 5, 8, 10, 12, 14, 16, 18, 20]; // 각 레벨의 총 경험치
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    let level = parseInt(localStorage.getItem("level")) || 1;

    const updateLevelDisplay = () => {
      let requiredExp = levelExp[level - 1];
      while (exp >= requiredExp && level < 10) {
        exp -= requiredExp;
        level++;
        requiredExp = levelExp[level - 1];
      }

      levelDisplay.textContent = level;
      expDisplay.textContent = `${exp} / ${requiredExp}`;

      const plantImages = setPlantImages(); // 함수 호출 및 결과 할당

      if (level <= 3) {
        plantImage.src = plantImages[0];
      } else if (level <= 6) {
        plantImage.src = plantImages[1];
      } else if (level <= 9) {
        plantImage.src = plantImages[2];
        plantImage.style.width = "250px";
        plantImage.style.height = "250px";
      } else {
        plantImage.src = plantImages[3];
        wateringcanImage.style.display = "none";
        sunImage.style.display = "none";
        plantImage.classList.add("location");
        plantButton.style.display = "block";
        plantImage.style.width = "230px";
        plantImage.style.height = "230px";
      }
    };

    updateLevelDisplay();
  };

  // // 초기화 버튼 클릭 시 레벨과 경험치 초기화
  // const resetLevelAndExp = () => {
  //   localStorage.setItem("level", "1");
  //   localStorage.setItem("exp", "0");
  //   updateExpAndLevel();
  // };

  // //초기화 버튼에 이벤트 리스너 추가
  // const resetButton = document.querySelector("#resetButton");
  // resetButton.addEventListener("click", resetLevelAndExp);

  // //  7레벨 설정 버튼 클릭 시 레벨 7로 설정
  // setLevelButton.addEventListener("click", () => {
  //   localStorage.setItem("level", "7");
  //   localStorage.setItem("exp", "0");
  //   updateExpAndLevel();
  // });

  // 페이지 로드 시 실행
  updateExpAndLevel();
});
