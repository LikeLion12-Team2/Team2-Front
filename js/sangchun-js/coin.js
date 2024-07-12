async function fetchUserCoinBalance(userId, accessToken) {
  try {
    const response = await fetch(
      `http://3.34.241.109:8080/api/user/${userId}/coin`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("네트워크 응답이 정상이 아닙니다");
    }

    const data = await response.json();
    const coinAmount = data.coin;

    // DOM을 사용하여 받은 코인 잔액을 업데이트
    const coinElement = document.getElementById("recent-main-coin");
    coinElement.innerHTML = `<img src="/sangchun-html/sangchun-img/fluent-emoji-flat_coin.png" alt="COIN" />
                                 <span>${coinAmount}C</span>`;

    // 로컬 스토리지에 코인 값 저장
    localStorage.setItem("coinCount", coinAmount);
  } catch (error) {
    console.error(
      "사용자 코인 잔액을 가져오는 도중 오류가 발생했습니다:",
      error
    );
  }
}

function updateCoinDisplay() {
  const coinCount = localStorage.getItem("coinCount") || 0;
  const coinElement = document.getElementById("recent-main-coin");
  if (coinElement) {
    coinElement.innerHTML = `<img src="/sangchun-html/sangchun-img/fluent-emoji-flat_coin.png" alt="COIN" />
                                 <span>${coinCount}C</span>`;
  }
}

// 페이지가 로드될 때 함수를 호출합니다
document.addEventListener("DOMContentLoaded", function () {
  const userId = 사용자의_아이디_얻는_함수(); // 사용자의 아이디를 동적으로 가져오는 함수
  const accessToken = 액세스_토큰_얻는_함수(); // 액세스 토큰을 동적으로 가져오는 함수
  localStorage.setItem("coinCount", 50);
  fetchUserCoinBalance(userId, accessToken);

  // 다른 스크립트에서 코인 값이 업데이트된 경우를 대비해 초기 로드 시 표시 업데이트
  updateCoinDisplay();

  // 로컬 스토리지 변경 감지하여 코인 표시 업데이트
  window.addEventListener("storage", updateCoinDisplay);
});
