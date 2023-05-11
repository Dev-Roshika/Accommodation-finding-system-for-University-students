const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
//const { response } = require("express");
const salt = 10; // for bcrypt

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

app.get("/home", (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/student/signup", (req, res) => {
  const sql =
    "INSERT INTO `user_info` (`FullName`,`UserName`, `UnivRegNo`, `ContactNo`,`Email`,`Faculty`,`Dept`,`PrivateAddress`,`Password`,`Role`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [
      req.body.fullname,
      req.body.username,
      req.body.univregno,
      req.body.mobile,
      req.body.email,
      req.body.faculty,
      req.body.dept,
      req.body.paddress,
      hash,
      req.body.role,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Insert data Error in server" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/student/login", (req, res) => {
  const sql = "SELECT * FROM user_info WHERE `Email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
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
