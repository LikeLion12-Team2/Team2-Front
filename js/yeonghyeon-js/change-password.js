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

function changeNickname(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  var form = document.forms["change-nickname"];

  // 쿠키에서 accessToken 가져오기
  var accessToken = getCookie("accessToken");

  // 폼 데이터 수집
  var newNickname = form.new_nickname.value;

  // 공백 입력 시
  if (newNickname == "") {
    alert("닉네임을 입력해주세요.");
    return;
  }

  // 서버로 보낼 데이터 형식
  var requestData = {
    newNickname: newNickname,
  };

  // 서버로 PUT 요청 보내기
  fetch(`${API_SERVER_DOMAIN}/api/user/updateUserNickname`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답이 실패했습니다.");
      }
      console.log(response);
      window.location.href = "../yeonghyeon-html/change-nickname-success.html";
    })
    .catch((error) => {
      console.error("닉네임 변경 중 오류 발생:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var findPwdBtn = document.getElementById("find_pwd_btn");
  findPwdBtn.addEventListener("click", changeNickname);
});
