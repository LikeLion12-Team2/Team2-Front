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

function fetchItemDetails(url) {
  const accessToken = getCookie("accessToken");

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayItemDetails(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayItemDetails(item) {
  document.getElementById("plant-name1").textContent = item.name;
  document.querySelector(".red-coin span").textContent = `${item.price}C`;

  const details = item.detail.split("\n");
  const shopesMiddle2 = document.querySelector(".shopes-middle2");
  shopesMiddle2.innerHTML = "";
  details.forEach((detail) => {
    const p = document.createElement("p");
    p.textContent = detail;
    shopesMiddle2.appendChild(p);
  });

  if (item.owned) {
    updatePurchaseButton();
  }
  // 코인 수 확인 후 구매 가능 여부 결정
}

// DOM이 로드되었을 때 아이템 상세 정보를 가져옵니다
document.addEventListener("DOMContentLoaded", () => {
  const requestUrl = `http://3.34.241.109:8080/api/shop/item?itemId=${itemId}`;
  fetchItemDetails(requestUrl);
});
