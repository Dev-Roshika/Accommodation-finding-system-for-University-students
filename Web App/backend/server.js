import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

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

///Owner - start

//Cover image upload - start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/cover_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/owner/post-ad", upload.single("coverimage"), (req, res) => {
  // console.log(req.file) // Can retrieve image information like this
  // console.log(req.file.filename) // Can retrieve image filename information like this
  // console.log(req.body.title) // Can retrieve title information like this
  // console.log(req.body.image) //Cannot retrieve image information like this
  const img_filename = req.file.filename;
  const sql =
    "INSERT INTO `boarding_house` (`Title`, `Description`, `Price`, `Address`, `Boys`, `Girls`, `Facilities`, `Rules`, `ContactNo`, `CoverImage`) VALUES(?)";
  console.log(img_filename + "___" + req.body.address);
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.address,
    req.body.boys,
    req.body.girls,
    req.body.facilities,
    req.body.rules,
    req.body.contactno,
    img_filename,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Error: "Insert data Error in server" });
    return res.json({ Status: "Success", RowId: data.insertId });
  });
});
//Cover image upload - end

// multiple image upload - start
// Configure Multer for file upload
const storage_multiple = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const fileFilter = function (req, file, cb) {
  // Validate file types (you can customize this as per your requirements)
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
  }
};
const upload_multiple = multer({
  storage: storage_multiple,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    files: 6, // Limit the number of files to 6
  },
}).array("uploadImages", 6); // 'uploadImages' is the field name for the uploaded files

app.post("/images/upload/:id", (req, res) => {
  const RowId = req.params.id;
  upload_multiple(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer error
        console.log("Multer Error:", err);
        res.status(500).json({ error: "File upload error" });
      } else {
        // Other errors
        console.log("Error:", err);
        res.status(400).json({ error: err.message });
      }
    } else {
      // Files uploaded successfully
      console.log("Files uploaded:", req.files);
      const values = req.files ? req.files.map((file) => file.filename) : [];
      const valuesString = JSON.stringify(values); // Convert array to JSON string
      const sql = "UPDATE `boarding_house` SET `OtherImages` = ? WHERE `Id` = ?";
      console.log(RowId);
      console.log(valuesString);
      
      db.query(sql, [valuesString, RowId], (err, data) => {
        if (err) return res.json({ Error: "Insert data Error in server" });
        return res.json({ Status: "Success" });
      });
    }
  });
});
// multiple image upload - end

///Owner - end

app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.json("success");
});

app.listen(8081, () => {
  console.log("listening");
});
