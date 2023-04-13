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

      // do something with the response data
    } else {
      alert("Error: " + buff.statusText);
    }
  } catch (error) {
    alert(error);
  }
}
// getPostInfo();
getUserInfo();

// getAllPosts();
