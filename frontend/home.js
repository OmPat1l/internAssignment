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
      // Assume that 'jsonData' is an array of JSON objects containing post data

      const colMd8 = document.querySelector(".col-md-8");

      // Loop through the JSON data and create a card element for each post
      for (let i = 0; i < dataresponse.length; i++) {
        const post = dataresponse[i];

        // Create the card element
        const card = document.createElement("div");
        card.classList.add("card", "p-3");

        // Create the card content
        const cardContent = `
    <div class="d-flex justify-content-between align-items-center">
      <div class="user d-flex flex-row align-items-center">
        <span><small class="font-weight-bold text-primary">${post.name}<br></small><small class="font-weight-bold">${post.post}</small></span>
      </div>
      <small>${post.email}</small>
    </div>
   
    </div>
  `;

        // Set the card content as the innerHTML of the card element
        card.innerHTML = cardContent;

        // Append the card element to the col-md-8 div
        colMd8.appendChild(card);
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
