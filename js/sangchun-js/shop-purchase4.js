document.addEventListener("DOMContentLoaded", function () {
  // Display coin count from local storage
  let coinCount = localStorage.getItem("coin-counter");
  console.log(coinCount);
  document.getElementById("coin-counter").textContent = `${coinCount}C`;

  // Update coin count in real-time
  window.addEventListener("storage", function (event) {
    if (event.key === "coin-counter") {
      const updatedCoinCount = event.newValue || 0;
      document.getElementById(
        "coin-counter"
      ).textContent = `${updatedCoinCount}C`;
    }
  });
  console.log(localStorage.getItem("coin-counter"));
  // Handle purchase button click
  document.querySelector(".open-btn").addEventListener("click", handlePurchase);
});

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

function purchaseItem(itemId, plantId) {
  const accessToken = getCookie("accessToken");

  fetch("http://3.34.241.109:8080/api/shop/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      itemId: itemId,
      plantId: plantId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      alert(data);
      updatePurchaseButton();
      updateCoinCount();
    })
    .catch((error) => {
      console.error("There was a problem with the purchase operation:", error);
    });
}

function updateCoinCount() {
  let coinCount = localStorage.getItem("coin-counter") || 0;
  coinCount -= 40;
  localStorage.setItem("coin-counter", coinCount);
  document.getElementById("coin-counter").textContent = `${coinCount}C`;
  window.dispatchEvent(new Event("storage"));
}

function updatePurchaseButton() {
  const purchaseButton = document.getElementById("shop-buy2");
  purchaseButton.textContent = "이미 보유한 아이템입니다";
  purchaseButton.classList.add("disabled");
  purchaseButton.style.color = "black";
  purchaseButton.style.pointerEvents = "none";
  purchaseButton.style.backgroundColor = "#d9d9d9";
}

function handlePurchase() {
  let coinCount = localStorage.getItem("coin-counter") || 0;
  if (coinCount < 40) {
    alert("보유 코인이 부족합니다!");
    document.getElementById("modal-toggle").checked = false;
    return;
  }
  const plantId = 3; // This should be dynamically fetched
  const itemId = 4; // Assuming itemId for window is 4
  purchaseItem(itemId, plantId);
}
