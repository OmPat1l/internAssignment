const express = require("express");
const admin = require("firebase-admin");

const app = express();
const PORT = 3003;

const serviceAccount = require("./serviceKey/servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const colref = db.collection("users");

app.use(express.json());
let userLogged = 0;
let loggedin = false;
let loginMail = 0;

//change password and name
app.patch("/users/:email", async (req, res) => {
  const email12 = req.params.email;
  if (loggedin == false) {
    return res.status(500).json({ message: "please login to change password" });
  }
  if (email12 != loginMail) {
    return res.status(500).json({
      message: "please login from same account, email does not match",
    });
  }

  const name = req.body.name;
  const password = req.body.password;

  try {
    const querySnapshot = await colref.where("email", "==", email12).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const docRef = querySnapshot.docs[0].ref;
    await docRef.update({
      name: name,
      password: password,
    });

    return res.status(204).json({ message: "updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
});

//signing up
app.post("/signup", async (req, res) => {
  let buff = req.body;
  let name = buff.name;
  let email = buff.email;
  let password = buff.password;
  if (!name || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const usersSnapshot = await colref.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        return res.status(200).json({ error: "Account exists, please login" });
      }
    }
    try {
      const newUser = await colref.add({
        name,
        password,
        email,
      });
      userLogged = newUser.id;
      loggedin = true;
      loginMail = email;
      return res.json({ id: newUser.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to add user" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server failed" });
  }
});
//logging in
app.post("/login", async (req, res) => {
  let buff = req.body;
  let name = buff.name;
  let email = buff.email;
  let password = buff.password;
  if (!name || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const usersSnapshot = await colref.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        loggedin = true;
        loginMail = email;
        return res.status(200).json({ message: "logged in" });

        //login activity
      }
    }
    return res.status(200).json({ message: "account does not exist" });
  } catch (error) {
    return res.status(500).json({ error: "Server failed" });
  }
});
//admin access to database
app.get("/adminData", async (req, res) => {
  try {
    const usersSnapshot = await colref.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return res.status(200).json(users);
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: "Failed to get users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
