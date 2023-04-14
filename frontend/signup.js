const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("InputName").value;
  const email = document.getElementById("InputEmail1").value;
  const password = document.getElementById("InputPassword1").value;

  const body = { name: name, email: email, password: password };

  try {
    const response = await fetch("http://localhost:3003/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      window.location.href = "./home.html"; // redirect to success page
    } else {
      alert("Account already exists");
    }
  } catch (error) {
    alert(error + "Account already exists/ invalid credentials");

    // console.error(error);
    // display error message to user
  }
});
