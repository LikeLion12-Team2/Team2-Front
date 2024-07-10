document.querySelector(".open-btn").addEventListener("click", function () {
  var buyButton = document.getElementById("shop-buy2");
  buyButton.textContent = "이미 보유한 아이템입니다";
  buyButton.style.backgroundColor = "#d9d9d9";
  buyButton.style.color = "black";
  buyButton.classList.add("disabled");
  buyButton.style.pointerEvents = "none";
});
document.querySelector(".open-btn").addEventListener("click", function () {
  var buyButton = document.getElementById("shop-buy");
  buyButton.textContent = "이미 보유한 아이템입니다";
  buyButton.style.backgroundColor = "#d9d9d9";
  buyButton.style.color = "black";
  buyButton.classList.add("disabled");
  buyButton.style.pointerEvents = "none";
});
