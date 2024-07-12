document.addEventListener("DOMContentLoaded", function () {
  // Display coin count from local storage
  const coinCount = localStorage.getItem("coin-counter") || 0;
  document.getElementById("coin-counter").textContent = `${coinCount}C`;

  // Fetch and display shop items
  fetchShopItems();

  // Listen for changes in local storage and update coin count in real-time
  window.addEventListener("storage", function (event) {
    if (event.key === "coin-counter") {
      const updatedCoinCount = event.newValue || 0;
      document.getElementById(
        "coin-counter"
      ).textContent = `${updatedCoinCount}C`;
    }
  });
});

function fetchShopItems() {
  const API_SERVER_DOMAIN = "http://3.34.241.109:8080";
  const url = API_SERVER_DOMAIN + "/api/shop";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch shop items");
      }
      return response.json();
    })
    .then((data) => {
      updateShopItems(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateShopItems(items) {
  items.forEach((item) => {
    let itemElement;
    switch (item.itemId) {
      case 1:
        itemElement = document.querySelector(".mainshop-red");
        break;
      case 2:
        itemElement = document.querySelector(".mainshop-blue");
        break;
      case 3:
        itemElement = document.querySelector(".mainshop-sun");
        break;
      case 4:
        itemElement = document.querySelector(".mainshop-window");
        break;
    }

    if (itemElement) {
      const nameElement = itemElement.querySelector("p");
      const priceElement = itemElement.querySelector("span");
      nameElement.textContent = item.name;
      priceElement.textContent = item.price + "C";
    }
  });
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

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
