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
    methods: ["POST", "GET","PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static('public'));// images folder
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

// app.get("/home", (req, res) => {
//   if (req.session.role) {
//     return res.json({ valid: true, role: req.session.role });
//   } else {
//     return res.json({ valid: false });
//   }
// });

//signup - start
const signup_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profile_images/student");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filenameWithoutExt = path.basename(file.originalname, ext); // Get the filename without extension
    cb(
      null,
      file.fieldname + "_" + Date.now() +"_"+ filenameWithoutExt + path.extname(file.originalname)
    );
  },
});

const signup_upload = multer({
  storage: signup_storage,
});
app.post("/student/signup", signup_upload.single("profile_image"), (req, res) => {
  const img_filename = req.file.filename;
  const sql =
    "INSERT INTO `student_info` (`FullName`,`UserName`, `UnivRegNo`, `ContactNo`, `ProfileImage`,`Email`,`Faculty`,`Dept`,`Password`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [
      req.body.fullname,
      req.body.username,
      req.body.univregno,
      req.body.mobile,
      img_filename,
      req.body.email,
      req.body.faculty,
      req.body.dept,
      hash
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Insert data Error in server" });
      return res.json({ Status: "Success" });
    });
  });
});
//signup - end

app.post("/student/login", (req, res) => {
  const sql = "SELECT * FROM student_info WHERE `Email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      req.session.email = result[0].Email
      req.session.Id = result[0].Id
      req.session.role = "student";
      console.log(req.session.email)
      console.log(req.session.role)
      console.log(req.session.Id)
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({ Status: "Success", Email: req.session.Email, Role: req.session.role });
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
//signup - start
const O_signup_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'nidphoto') {
      cb(null, "public/images/nidphoto");
    } else if (file.fieldname === 'profileimage') {
      cb(null, "public/images/profile_images/owner");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filenameWithoutExt = path.basename(file.originalname, ext);
    let filename;

    if (file.fieldname === 'nidphoto') {
      filename =
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        filenameWithoutExt +
        ext;
    } else if (file.fieldname === 'profileimage') {
      filename =
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        filenameWithoutExt +
        ext;
    }

    cb(null, filename);
  },
});

const O_signup_upload = multer({
  storage: O_signup_storage,
});
app.post("/owner/signup", O_signup_upload.fields([
  { name: 'nidphoto', maxCount: 1 },
  { name: 'profileimage', maxCount: 1 }
]), (req, res) => {
  console.log("checking req.files")
  console.log(req.files)
  const profileImgFilename = req.files['profileimage'][0].filename // Retrieve the filename of the profile image
  const nidPhotoFilename = req.files['nidphoto'][0].filename // Retrieve the filename of the nid photo
  console.log("checking profileImgFilename")
  console.log(profileImgFilename)
  console.log("checking nidPhotoFilename")
  console.log(nidPhotoFilename)
  const sql =
    "INSERT INTO `owner_info` (`FullName`,`UserName`, `ContactNo`, `Email`, `ProfileImage`, `NidNo`, `NidPhoto`, `PrivateAddress`, `Password`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [
      req.body.fullname,
      req.body.username,
      req.body.mobile,
      req.body.email,
      profileImgFilename,
      req.body.nidno,
      nidPhotoFilename,
      req.body.paddress,
      hash
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Insert data Error in server" });
      return res.json({ Status: "Success" });
    });
  });
});
//signup end

app.post("/owner/login", (req, res) => {
  const sql = "SELECT * FROM owner_info WHERE `Email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      req.session.email = result[0].Email
      req.session.role = "owner";
      req.session.Id = result[0].Id
      
      console.log(req.session.email)
      console.log(req.session.role)
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({ Status: "Success", Email: req.session.Email, Role: req.session.role });
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

//Cover image upload - start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/cover_images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filenameWithoutExt = path.basename(file.originalname, ext); // Get the filename without extension
    cb(
      null,
      file.fieldname + "_" + Date.now() +"_"+filenameWithoutExt+ path.extname(file.originalname)
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
    "INSERT INTO `boarding_house` (`Title`, `Description`, `Price`,`Negotiable`, `Address`, `Distance`, `Boys`, `Girls`, `Facilities`, `Rules`, `ContactNo`, `CoverImage`) VALUES(?)";
  console.log(img_filename + "___" + req.body.address);
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.negotiable,
    req.body.address,
    req.body.distance,
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
    const ext = path.extname(file.originalname); // Get the file extension
    const filenameWithoutExt = path.basename(file.originalname, ext); // Get the filename without extension
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + filenameWithoutExt + path.extname(file.originalname)
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
      console.log("valueString"+valuesString);
      
      db.query(sql, [valuesString, RowId], (err, data) => {
        if (err) return res.json({ Error: "Insert data Error in server" });
        return res.json({ Status: "Success" });
      });
    }
  });
});
// multiple image upload - end

///Owner - end
//profile start
app.get("/student/show", (req, res) => {
  const userId = req.session.Id;
  console.log("show")
  console.log(userId)
  let sql;
  if(req.session.role === 'student'){
   sql = "SELECT * FROM student_info WHERE Id = ?";}
  else  { sql = "SELECT * FROM owner_info WHERE Id = ?";}

  console.log(sql)
  db.query(sql,[userId],(err,data)=>{
    if(err) return res.json(data)
    return res.json(data)
})
});
app.put("/student/updateUser",(req,res)=>{
  const {ContactNo,Email,PrivateAddress} = req.body[0];
 const values = [ContactNo,Email,req.session.Id];
//const sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?"
 let sql;
 let i ;
  if(req.session.role === 'student'){
   sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?";}
  else  { sql = "UPDATE owner_info SET ContactNo = ?,Email = ?,PrivateAddress=? WHERE Id = ?";
  i = values.pop();
  values.push(PrivateAddress);
  values.push(i);
  
}

  db.query(sql,values,(err,data) => { 
    console.log(err)
    if(err) return res.json(data)
    return res.json(data)
  });
})
//profile image upload
const storage_profile = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(" role : "+req.session.role);
    if(req.session.role ==="student")
    {cb(null, "public/images/profile_images/student");}
    else{
      cb(null, "public/images/profile_images/owner");
    }
    //cb(null, "public/images/profile_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now()+"_" + path.extname(file.originalname)
      
    );
  },
});
const upload_profile = multer({
  storage: storage_profile,
});
app.post("/profile/upload", upload_profile.single("profile_image"), (req, res) => {
  // Handle the uploaded image here
  
 
  const values = [ req.file.filename,req.session.Id];
 //const sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?"
  let sql;
   if(req.session.role === 'student'){
    sql = "UPDATE student_info SET ProfileImage = ? WHERE Id = ?";}
   else  { sql = "UPDATE owner_info SET ProfileImage = ? WHERE Id = ?";}
   console.log("filename"+req.file.filename)
  console.log("values"+values)
  console.log("sql"+sql)
   db.query(sql,values,(err,data) => {  
     if(err) return res.json(data)
     return res.json(data)
   });

/*
  if (req.file) {
    console.log(req.file.filename);
    console.log(req.file);
    // You can save the image details to the database or perform other actions
  } else {
    console.log("Image upload failed");
  }
  res.sendStatus(200);*/
});
// profile - end

//Fetch data for useEffect - start
app.get('/', (req,res)=>{
	if(req.session.role){
		return res.json({Valid: true,Id:req.session.Id, Role: req.session.role })
	} else {
		return res.json({Valid: false})
	}
})
app.get("/boarding-data", (req, res) => {
  const sql = "SELECT * FROM boarding_house";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});
app.get("/boarding-data/:id", (req, res) => {
  const RowId = req.params.id;
  const sql = "SELECT * FROM boarding_house WHERE `Id` = ?";
  db.query(sql, [RowId], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      //console.log(result);
      res.json(result);
    }
  });
});
//Fetch data for useEffect - end

app.get('/logout',(req,res)=>{
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.redirect('/'); //Inside a callback… bulletproof!
   });
})

app.listen(8081, () => {
  console.log("listening");
});
