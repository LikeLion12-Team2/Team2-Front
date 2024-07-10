const levelDisplay = document.querySelector("#level");
const expDisplay = document.querySelector("#exp");
const plantImage = document.querySelector("#levelplant img");
const wateringcanImage = document.querySelector("#wateringcan");
const sunImage = document.querySelector("#sun");
const plantButton = document.querySelector("#plant-storage");

const levelExp = [2, 4, 5, 8, 10, 12, 14, 16, 18, 20]; // 각 레벨의 총 경험치
const plantImages = [
  "../chaemin-img/plant1.png", // 1-3 레벨
  "../chaemin-img/plant2.png", // 4-6 레벨
  "../chaemin-img/flower3.png", // 7-9 레벨
  "../chaemin-img/flower4.png", // 10 레벨
];

let exp = parseInt(localStorage.getItem("exp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;

plantButton.style.display = "none";

const updateExpAndLevel = () => {
  let requiredExp = levelExp[level - 1];
  while (exp >= requiredExp && level < 10) {
    exp -= requiredExp;
    level++;
    requiredExp = levelExp[level - 1];
  }

  levelDisplay.textContent = level;
  expDisplay.textContent = `${exp} / ${requiredExp}`;

  if (level <= 3) {
    plantImage.src = plantImages[0];
  } else if (level <= 6) {
    plantImage.src = plantImages[1];
  } else if (level <= 9) {
    plantImage.src = plantImages[2];
  } else {
    plantImage.src = plantImages[3];
    wateringcanImage.style.display = "none";
    sunImage.style.display = "none";
    plantImage.classList.add("location");
    plantButton.style.display = "block";
  }
};

updateExpAndLevel();

const resetLevelAndExp = () => {
  // 레벨과 경험치 변수 초기화
  level = 1;
  exp = 0;

  // localStorage에서 레벨과 경험치 정보 삭제
  localStorage.removeItem("level");
  localStorage.removeItem("exp");

  // 화면에 레벨과 경험치 정보 업데이트
  updateExpAndLevel();
};

// 초기화 버튼에 이벤트 리스너 추가
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetLevelAndExp);

// 페이지 로드 시 초기화 함수 호출하여 화면에 초기 상태 표시
updateExpAndLevel();
