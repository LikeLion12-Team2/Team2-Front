var API_SERVER_DOMAIN = "http://3.34.241.109:8080";

function goChangePwd(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  var form = document.forms["find-password"];
  var findPwdEmail = form.find_pwd_email.value;

  localStorage.setItem("email", findPwdEmail);

  window.location.href = "../yeonghyeon-html/change-password-2.html";
}

function changePwd(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  var email = localStorage.getItem("email");

  var form = document.forms["change-password-2"];
  var newPwd = form.new_pwd.value;

  var form = document.forms["change-password-2"];
  var newPwdRe = form.new_pwd_re.value;

  // 비밀번호 정규식 확인
  var pwdInfo = document.getElementById("new-pwd-info");
  var regExp = /^[A-Za-z0-9]{6,12}$/;
  if (!regExp.test(newPwd)) {
    pwdInfo.style.color = "#FF0000";
    return;
  } else {
    pwdInfo.style.color = "#0dcb09";
  }

  // 비밀번호 확인
  if (newPwd !== newPwdRe) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 서버로 보낼 데이터 형식
  var requestData = {
    email: email,
    newPassword: newPwd,
  };

  // 서버로 GET 요청 보내기
  fetch(`${API_SERVER_DOMAIN}/api/user/findpassword`, {
    method: "GET",
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답이 실패했습니다.");
      }
      console.log(response);
      window.location.href = "../yeonghyeon-html/change-password-success.html";
    })
    .catch((error) => {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("해당 이메일이 존재하지 않습니다.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var findPwdBtn = document.getElementById("find_pwd_btn");
  findPwdBtn.addEventListener("click", goChangePwd);

  //   var pwdEye = document.getElementById("pwd_eye_2");
  //   var pwdField = document.getElementById("pwd_field_2");

  //   pwdEye.addEventListener("click", function () {
  //     if (pwdEye.src.includes("eye-off.png")) {
  //       pwdEye.src = "../yeonghyeon-img/eye-on.png";
  //       pwdField.type = "text";
  //     } else {
  //       pwdEye.src = "../yeonghyeon-img/eye-off.png";
  //       pwdField.type = "password";
  //     }
  //   });

  //   var pwdReEye = document.getElementById("pwd_re_eye_2");
  //   var pwdReField = document.getElementById("pwd_re_field_2");

  //   pwdReEye.addEventListener("click", function () {
  //     if (pwdReEye.src.includes("eye-off.png")) {
  //       pwdReEye.src = "../yeonghyeon-img/eye-on.png";
  //       pwdReField.type = "text";
  //     } else {
  //       pwdReEye.src = "../yeonghyeon-img/eye-off.png";
  //       pwdReField.type = "password";
  //     }
  //   });

  var changePwdBtn = document.getElementById("change_pwd_btn");
  changePwdBtn.addEventListener("click", changePwd);
});
