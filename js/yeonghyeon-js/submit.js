document.addEventListener("DOMContentLoaded", function () {
  var form = document.forms["submit"];
  var submitButton = document.querySelector(".last-button");
  var API_SERVER_DOMAIN = "http://3.34.241.109:8080";

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // 버튼 기본 동작 막기

    // 폼 데이터 수집
    var email = form.email.value;
    var password = form.pwd.value;
    var passwordRe = form.pwd_re.value;
    var nickname = form.nickname.value;

    // 비밀번호 확인
    if (password !== passwordRe) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 서버로 보낼 데이터 형식
    var requestData = {
      email: email,
      password: password,
      nickname: nickname,
    };

    console.log(requestData);
    // 서버로 POST 요청 보내기
    fetch(`${API_SERVER_DOMAIN}/api/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        window.location.href = "../yeonghyeon-html/login.html";
      })
      .catch((error) => {
        console.error("회원가입 중 오류 발생:", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  });
});
