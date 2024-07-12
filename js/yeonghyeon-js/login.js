var API_SERVER_DOMAIN = "http://3.34.241.109:8080";

function submitLoginForm(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  // 사용자가 입력한 이메일과 비밀번호를 가져옵니다.
  var email = document.getElementById("email").value;
  var password = document.getElementById("pwd").value;

  // 서버에 로그인 요청을 보냅니다.
  fetch(API_SERVER_DOMAIN + "/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      var accessToken = data.accessToken;
      var refreshToken = data.refreshToken;
      // 토큰을 쿠키에 저장합니다.
      setCookie("accessToken", accessToken, 1);
      setCookie("refreshToken", refreshToken, 1);
      // 로그인이 성공하면 다음 동작을 수행합니다.
      getCoinInfo(accessToken);
      window.location.replace("../chaemin-html/select-plant.html");
    })
    .catch((error) => {
      alert("아이디나 비밀번호를 다시 확인해주세요", error);
      // 로그인 실패 시 사용자에게 메시지를 표시하는 등의 동작을 수행할 수 있습니다.
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

function getCoinInfo(accessToken) {
  var userId = localStorage.getItem("userId");
  return fetch(`${API_SERVER_DOMAIN}/api/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Coin info request failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("코인 개수: " + data.coin);
      localStorage.setItem("coin-counter", data.coin);
      console.log(localStorage.getItem("coin-counter"));
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var loginButton = document.getElementById("login-btn");
  loginButton.addEventListener("click", submitLoginForm);
});
