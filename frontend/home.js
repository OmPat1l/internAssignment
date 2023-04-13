async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:3003/allposts");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // do something with the response data
    } else {
      console.log("Error: " + response.statusText);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
async function getUserInfo() {
  try {
    let buff = await fetch("http://localhost:3003/userInfo");
    if (buff.ok) {
      let data1 = await buff.json();
      console.log(data1);
      let cardsUser = document.querySelector(".card-body");
      let usercontent = `<h6 class="card-subtitle mb-2 text-body-secondary">Name: ${data1.name}</h6>
          <h6 class="card-subtitle mb-2 text-body-secondary">Mail: ${data1.email}</h6>

          <p class="card-text">Password: ${data1.password}</p>`;
      cardsUser.innerHTML += usercontent;

      // do something with the response data
    } else {
      console.log("Error: " + buff.statusText);
    }
  } catch (error) {
    alert(error);
  }
}
async function getPostInfo() {
  try {
    let buffPost = await fetch("http://localhost:3003/allposts");
    if (buffPost.ok) {
      let data2 = await buffPost.json();
      let dataresponse = data2.filter((post) => post.post);
      console.log(dataresponse);
      const cardsDiv = document.querySelector(".col-md-8");

      for (let i = 0; i < dataresponse.length; i++) {
        const user = dataresponse[i];
        const card = document.createElement("div");
        card.className = "card p-3";

        if (Array.isArray(user.post)) {
          // if user has multiple posts
          for (let j = 0; j < user.post.length; j++) {
            const post = user.post[j];
            const cardContent = `
        <div class="d-flex justify-content-between align-items-center">
          <div class="user d-flex flex-row align-items-center">
            <span>
              <small class="font-weight-bold text-primary">${user.name}</small>
              <small class="font-weight-bold">${post}</small>
            </span>
          </div>
          <small>${user.email}</small>
        </div>
        <div class="action d-flex justify-content-between mt-2 align-items-center">
          <div class="reply px-4">
            <small>Remove</small>
            <span class="dots"></span>
            <small>Reply</small>
            <span class="dots"></span>
            <small>Translate</small>
          </div>
          <div class="icons align-items-center">
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-check-circle-o check-icon"></i>
          </div>
        </div>
      `;
            card.innerHTML += cardContent;
          }
        } else {
          // if user has only one post
          const cardContent = `
      <div class="d-flex justify-content-between align-items-center">
        <div class="user d-flex flex-row align-items-center">
          <span>
            <small class="font-weight-bold text-primary">${user.name}</small>
            <small class="font-weight-bold">${user.post}</small>
          </span>
        </div>
        <small>${user.email}</small>
      </div>
      <div class="action d-flex justify-content-between mt-2 align-items-center">
        <div class="reply px-4">
          <small>Remove</small>
          <span class="dots"></span>
          <small>Reply</small>
          <span class="dots"></span>
          <small>Translate</small>
        </div>
        <div class="icons align-items-center">
          <i class="fa fa-star text-warning"></i>
          <i class="fa fa-check-circle-o check-icon"></i>
        </div>
      </div>
    `;
          card.innerHTML = cardContent;
        }

        cardsDiv.appendChild(card);
      }

      // do something with the response data
    } else {
      alert("Error: " + buff.statusText);
    }
  } catch (error) {
    alert(error);
  }
}
getPostInfo();
getUserInfo();

getAllPosts();
