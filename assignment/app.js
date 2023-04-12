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
