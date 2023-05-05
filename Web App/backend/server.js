const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", //a secret key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, //set the session cookie properties
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "software",
});

app.get("/student/home", (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/student/signup", (req, res) => {
  const sql =
    "INSERT INTO `user_info` (`FullName`,`UserName`, `UnivRegNo`, `ContactNo`,`Email`,`Faculty`,`Dept`,`PrivateAddress`,`Password`,`Role`) VALUES(?)";
  const values = [
    req.body.fullname,
    req.body.username,
    req.body.univregno,
    req.body.mobile,
    req.body.email,
    req.body.faculty,
    req.body.dept,
    req.body.paddress,
    req.body.password,
    req.body.role
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json({ Message: "Error in Node" });
    } else {
      return res.json(result);
    }
  });
});

app.post("/student/login", (req, res) => {
  const sql =
    "SELECT * FROM user_info WHERE `Email` = ? AND `Password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    if (result.length > 0) {
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.json("success");
});

app.listen(8081, () => {
  console.log("listening");
});
