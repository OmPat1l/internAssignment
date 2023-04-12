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

app.post("/signup/", async (req, res) => {
  let buff = req.body;
  let name = buff.name;
  let email = buff.email;
  let password = buff.password;

  if (!name || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
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
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
