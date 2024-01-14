const express = require("express");
const cors = require("cors");
let db = require("./service/db");
const app = express();
const port = 3000;
var path = require("path");

app.use(express.json());

app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/profile/:nama", async (req, res) => {
  let skill = await db.fetchData();
  res.render("index", {
    nama: req.params.nama,
    skill: skill,
  });
});

app.get("/", (req, res) => {
  res.redirect("/profile/Dian Prasetyo");
});

app.get("/update-skill", async (req, res) => {
  res.render("update-skill", { id: 0, data: [] });
});

app.get("/update-skill/:id", async (req, res) => {
  const id = req.params.id;
  const data = await db.fetchDataById(id);
  res.render("update-skill", { id, data });
});

app.post("/skill", async (req, res) => {
  await db.insertData(req.body.skillName, req.body.level);
  res.send("OK");
});

app.put("/skill", async (req, res) => {
  await db.updateData(req.body.id, req.body.skillName, req.body.level);
  res.send("OK");
});

app.delete("/skill/:id", async (req, res) => {
  await db.deleteData(req.params.id);
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
