var form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the default form submission behavior

  var email = document.getElementById("InputEmail1").value;
  var password = document.getElementById("InputPassword1").value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3003/login");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      window.location.href = "./home.html";
    } else {
      alert("Error: " + xhr.statusText);
    }
  };

  xhr.send(JSON.stringify({ email: email, password: password }));
});
