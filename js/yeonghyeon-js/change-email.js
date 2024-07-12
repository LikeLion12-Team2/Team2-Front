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

function checkPwd(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  var form = document.forms["change-email-1"];

  // 폼 데이터 수집
  var originalPwd = form.original_pwd.value;

  window.location.href = "../yeonghyeon-html/change-email-2";
}

function changeEmail(event) {}

document.addEventListener("DOMContentLoaded", function () {
  var changeEmailNextBtn = document.getElementById("change_email_next_btn");
  changeEmailNextBtn.addEventListener("click", checkPwd);

  var emailBtn = document.getElementById("email_btn");
  emailBtn.addEventListener("click", changeEmail);
});
