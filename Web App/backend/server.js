import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

import { error } from "console";
import fs from "fs";
import nodemailer from 'nodemailer';


//admin-start
//const admin_password = "admin123!@#"; // admin password
/////const admin_email = "uni_admin@gmail.com"; // admin password
//admin-end


const salt = 10; // for bcrypt
let userId=0;
//const boardingId=1;
const port = 8081;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public")); // images folder
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
      file.fieldname +
        "_" +
        Date.now() +
        "_" +
        filenameWithoutExt +
        path.extname(file.originalname)
    );
  },
});

const signup_upload = multer({
  storage: signup_storage,
});
app.post(
  "/student/signup",
  signup_upload.single("profileimage"),
  (req, res) => {
    const img_filename = req.file.filename;
    console.log("this is checking signup password : ");
    console.log(req.body.password);
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
        hash,
      ];
      db.query(sql, [values], (err, result) => {
        if (err){ return res.json({ Error: "Insert data Error in server" });
                }
        return res.json({ Status: "Success" });
      });
    });
  }
);
//signup - end

app.post("/student/login", (req, res) => {
  const sql = "SELECT * FROM student_info WHERE `Email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      req.session.email = result[0].Email;
      req.session.Id = result[0].Id;
      req.session.role = "student";
            userId = req.session.Id;
      console.log(req.session.email);
      console.log(req.session.role);
      console.log(req.session.Id);
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({
              Status: "Success",
              Email: req.session.Email,
              Role: req.session.role,
            });
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
    if (file.fieldname === "nidphoto") {
      cb(null, "public/images/nidphoto");
    } else if (file.fieldname === "profileimage") {
      cb(null, "public/images/profile_images/owner");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filenameWithoutExt = path.basename(file.originalname, ext);
    let filename;

    if (file.fieldname === "nidphoto") {
      filename =
        file.fieldname + "-" + Date.now() + "-" + filenameWithoutExt + ext;
    } else if (file.fieldname === "profileimage") {
      filename =
        file.fieldname + "-" + Date.now() + "-" + filenameWithoutExt + ext;
    }

    cb(null, filename);
  },
});

const O_signup_upload = multer({
  storage: O_signup_storage,
});
app.post(
  "/owner/signup",
  O_signup_upload.fields([
    { name: "nidphoto", maxCount: 1 },
    { name: "profileimage", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    const profileImgFilename = req.files["profileimage"][0].filename; // Retrieve the filename of the profile image
    const nidPhotoFilename = req.files["nidphoto"][0].filename; // Retrieve the filename of the nid photo
    console.log("checking profileImgFilename");
    console.log(profileImgFilename);
    console.log("checking nidPhotoFilename");
    console.log(nidPhotoFilename);
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
        hash,
      ];
      db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Insert data Error in server" });
        return res.json({ Status: "Success" });
      });
    });
  }
);
//signup end

app.post("/owner/login", (req, res) => {
  const sql = "SELECT * FROM owner_info WHERE `Email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      req.session.email = result[0].Email;
      req.session.role = "owner";
      req.session.Id = result[0].Id;
      console.log(req.session.Id);
      console.log(req.session.email);
      console.log(req.session.role);
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({
              Status: "Success",
              Email: req.session.Email,
              Role: req.session.role,
              Id: req.session.Id,
            });
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
      file.fieldname +
        "_" +
        Date.now() +
        "_" +
        filenameWithoutExt +
        path.extname(file.originalname)
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
  const owner_id = req.session.Id;
  const distance = req.body.distance + " " + req.body.distanceUnit; // Combine distance and distanceUnit
  console.log("post-ad, ownerId: " + owner_id);
  console.log("post-ad, distanceUnit: " + req.body.distanceUnit);
  const sql =
    "INSERT INTO `boarding_house` (`OwnerId`, `Title`, `Description`, `Price`,`Negotiable`, `Address`, `Distance`, `Boys`, `Girls`, `Facilities`, `Rules`, `ContactNo`, `CoverImage`) VALUES(?)";
  console.log(img_filename + "___" + req.body.address);
  const values = [
    owner_id,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.negotiable,
    req.body.address,
    distance,
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
      file.fieldname +
        "-" +
        Date.now() +
        "-" +
        filenameWithoutExt +
        path.extname(file.originalname)
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
      const sql =
        "UPDATE `boarding_house` SET `OtherImages` = ? WHERE `Id` = ?";
      console.log(RowId);
      console.log("valueString" + valuesString);

      db.query(sql, [valuesString, RowId], (err, data) => {
        if (err) return res.json({ Error: "Insert data Error in server" });
        return res.json({ Status: "Success" });
      });
    }
  });
});
// multiple image upload - end

//multiple image update - start
app.get("/images/update/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  console.log("itemId:", itemId);
  console.log("req.params.id:", req.params.id);
  const sql = "SELECT OtherImages FROM boarding_house WHERE id = ?";

  db.query(sql, [itemId], (error, results) => {
    if (error) {
      console.error("Error fetching selected images:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length === 0) {
      console.log("Boarding house not found");
      res.status(404).json({ error: "Boarding house not found" });
    } else {
      console.log("All are fine..........");
      const otherImages = JSON.parse(results[0].OtherImages);
      console.log(otherImages);
      // const imageUrls = otherImages.map(filename => `/uploads/${filename}`);
      const imageUrls = otherImages.map(
        (filename) => `http://localhost:8081/images/${filename}`
      );
      res.json({ selectedImages: imageUrls });
    }
  });
});
//multiple image update - end

///Owner - end
//profile start
app.get("/student/show", (req, res) => {
  const userId = req.session.Id;
  console.log("show");
  console.log(userId);
  let sql;
  if (req.session.role === "student") {
    sql = "SELECT * FROM student_info WHERE Id = ?";
  } else {
    sql = "SELECT * FROM owner_info WHERE Id = ?";
  }

  console.log(sql);
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json(data);
    return res.json(data);
  });
});
const handleProfileDelete = function (Id, Role) {
  console.log(Id);
};

const getProfileImage = function (Id, Role, callback) {
  console.log("getProfileImage was called.");

  let sql;
  if (Role === "owner") {
    sql = "SELECT ProfileImage FROM owner_info WHERE Id=?";
  } else {
    sql = "SELECT ProfileImage FROM student_info WHERE Id=?";
  }
  db.query(sql, [Id], (err, data) => {
    if (err) {
      callback("Issue in profile image.", null);
    } else callback(null, data);
  });
};
const getIDImage = function (Id, callback) {
  console.log("getIDImage was called.");
  let sql;
  sql = "SELECT NidPhoto FROM owner_info WHERE Id=?";

  db.query(sql, [Id], (err, data) => {
    if (err) {
      callback("Issue in Nid.", null);
    } else callback(null, data);
  });
};
const getCoverImage = function (Id, callback) {
  console.log("This is Cover Image function :" + Id);
  let sql = "SELECT CoverImage FROM boarding_house WHERE OwnerId=?";
  db.query(sql, [Id], (err, data) => {
    if (err) callback("Issue in cover image.", null);
    else {
      callback(null, data);
    }
  });
};
const getOtherImages = function (Id, callback) {
  console.log(Id);
  let sql = "SELECT OtherImages FROM boarding_house WHERE OwnerId=?";
  db.query(sql, [Id], (err, data) => {
    if (err) {
      callback("Issue in Boarding House.", null);
    } else {
      callback(null, data);
    }
  });
};

app.post("/student/delete", (req, res) => {
  // console.log(req);
  console.log("delete request came to backend !!!!!!!!");
  const ID = req.session.Id;
  const Role = req.session.role;

  let sql, sqla;
  let CoverImage = [];
  let OtherImages = [];
  let ProfileImage, NidPhoto;

  if (Role === "student") {
    getProfileImage(ID, Role, (err, data) => {
      if (err) {
        console.log(err);
        ProfileImage = 0;
      } else {
        console.log(
          "Profile Image that should delete : " + data[0].ProfileImage
        );
        ProfileImage = data[0].ProfileImage;
        if (ProfileImage !== 0) {
          console.log("Test 2  " + ProfileImage);
          fs.unlink(
            `public/images/profile_images/${req.session.role}/${ProfileImage}`,
            (err) => {
              if (err) {
                console.error("Error deleting profile image:", err);
              } else {
                console.log("Profile image deleted successfully.");
              }
            }
          );
        }
      }
    });
    sql = "DELETE FROM student_info WHERE Id = ?";
    db.query(sql, ID, (err, data) => {
      if (err) return "res.json(data)";
      return res.json(data);
    });
  } else if (Role === "owner") {
    console.log("ID" + ID);
    console.log("Role" + Role);
    getProfileImage(ID, Role, (err, data) => {
      if (err) {
        console.log(err);
        ProfileImage = 0;
      } else {
        console.log(
          "Profile Image that should delete : " + data[0].ProfileImage
        );
        ProfileImage = data[0].ProfileImage;
        if (ProfileImage !== 0) {
          console.log("Test 2  " + ProfileImage);
          fs.unlink(
            `public/images/profile_images/${req.session.role}/${ProfileImage}`,
            (err) => {
              if (err) {
                console.error("Error deleting profile image:", err);
              } else {
                console.log("Profile image deleted successfully.");
              }
            }
          );
        }
      }
    });
    getIDImage(ID, (err, data) => {
      if (err) {
        console.log(err);
        getIDImage = 0;
      } else {
        console.log("ID Image that should delete : " + data[0].NidPhoto);
        NidPhoto = data[0].NidPhoto;
        if (ProfileImage !== 0) {
          console.log("Test 2  " + NidPhoto);
          fs.unlink(`public/images/nidphoto/${NidPhoto}`, (err) => {
            if (err) {
              console.error("Error deleting profile image:", err);
            } else {
              console.log("Profile image deleted successfully.");
            }
          });
        }
      }
    });
    //CoverImage = getCoverImage(ID);
    getCoverImage(ID, (err, data) => {
      if (err) {
        console.log(err);
        CoverImage = [];
      } else {
        let covers = data.length;

        for (let i = 0; i < covers; i++) {
          console.log(data[i].CoverImage);
          fs.unlink(
            `public/images/cover_images/${data[i].CoverImage}`,
            (err) => {
              if (err) {
                console.error("Error deleting a Cover image:", err);
              } else {
                console.log("A cover image image deleted successfully.");
              }
            }
          );
          //CoverImage.push(data[i].CoverImage);
        }
        //console.log("Cover Images that should delete :"+CoverImage);
      }
    });

    getOtherImages(ID, (err, data) => {
      if (err) {
        OtherImages = 0;
      } else {
        let covers = data.length;

        for (let i = 0; i < covers; i++) {
          const imagePaths = JSON.parse(data[i].OtherImages);
          const SomeOfOtherImages = imagePaths.map((path) => path.trim());
          OtherImages.push(...SomeOfOtherImages);
        }
        console.log("Other image called : ");
        console.log(OtherImages);
        for (let i of OtherImages) {
          fs.unlink(`public/images/${OtherImages}`, (err) => {
            if (err) {
              console.error("Error deleting a optional image:", err);
            } else {
              console.log("A optional image deleted successfully.");
            }
          });
        }
      }
    });
    console.log("Beep Beep boop !!!");

    sqla = "DELETE FROM boarding_house WHERE OwnerId=?";
    sql = "DELETE FROM owner_info WHERE Id = ?";

    Promise.all([db.query(sqla, ID), db.query(sql, ID)])
      .then(([boardingHouseData, ownerData]) => {
        console.log(" delete happend!");
        res.json({ boardingHouseData, ownerData });
      })
      .catch((err) => {
        console.log(" delete not happend! : " + err);
        res.json(err);
      });
  } else {
    console.log("something went wrong.asked to delete a empty role account!");
  }
});

app.post("/rate/rate_amount",(req,res)=>{
    //let{Rate_amount}=req.body.updateRate;
    const { id, value } = req.body;
   //const id = req.params.id;
   //const review = req.params.value;
   //boardingId=1;
    const values = [userId,id,value];
    const valuess = [userId,id];
    let sql="SELECT * from `student_boarding`  WHERE `student_id` = ? and `boarding_id` = ? ";
    let sql1="INSERT INTO `student_boarding` (`student_id`, `boarding_id`,`review`) VALUES (?,?,?)";
    db.query(sql, valuess, (err,result) => {
        console.log(err);
        if (err) return res.json("error");
        if(result.length>0){
            console.log(" You have alredy rated");
        }else{
           db.query(sql1, values, (err) =>{
            console.log(err);
            if (err) return res.json("error");
           });
        }
       
    });
});
app.get('/boardingRated-data/:id', (req, res) => {
    const itemId = req.params.id;
    const sql='SELECT COUNT(*) AS count FROM student_boarding WHERE boarding_id = ?';
    const sql1 = 'SELECT SUM(review) AS sumOfRatings FROM student_boarding WHERE boarding_id = ?'; 
db.query(sql, [itemId], (err, resultss) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
        db.query(sql1, [itemId], (err, results) => {
            if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Internal server error' });
            } else {
               
                // Calculate the average rating
                //const totalRating = results.reduce((acc, result) => acc + result.rating, 0);
                const sumOfRatings = results[0]['sumOfRatings'] || 0;
                const countOfRatings = resultss[0]['count'] || 1;
                let averageRating = sumOfRatings / countOfRatings;
                let floatVal = sumOfRatings % countOfRatings;
                if (floatVal >= 5) {
                    averageRating = Math.ceil(averageRating); // Round up the average rating
                }
                res.json({ averageRating });
                
              
            }
          });
      }
    })
  });
  app.put("/updatecomments",(req,res)=>{
    
    const { comid, value } = req.body;
   
    const values = [value,comid];
    let sql="UPDATE comments SET comment = ? WHERE id = ?";
    db.query(sql, values, (err) => {
        console.log(err);
        if (err) return res.json("error");
    });
});
  app.post("/comments",(req,res)=>{
    
    const { id, value } = req.body;
   
    const values = [userId,id,value];
    let sql1="INSERT INTO `comments` (`student_id`, `boardingid`,`comment`) VALUES (?,?,?)";
    db.query(sql1, values, (err) => {
        console.log(err);
        if (err) return res.json("error");
    });
});

app.get('/getComments/:id',(req,res)=>{
    const itemId = req.params.id;
    const sql = "SELECT comments.id,comments.student_id,comments.comment,student_info.FullName FROM comments INNER JOIN student_info ON comments.student_id=student_info.Id WHERE boardingid =?";
    db.query(sql, itemId, (err, result) => {
        if(err) return res.json("error");
        return res.json(result);
    });

});
app.delete('/deletecomment/:id',(req,res)=>{
    const id =req.params.id;
    const sql ="DELETE FROM comments WHERE id=?"
    db.query(sql,id,(err)=>{
        if(err) return res.json("error");
    });
});
app.get('/arrayvalue/:id',(req,res)=>{
    const bId = req.params.id;
    let cid =1;
    let value=[bId,cid];
    const sql='SELECT COUNT(*) AS count FROM student_boarding WHERE boarding_id = ? and review=?';
    db.query(sql,value,(err,result)=>{
        if(err) return res.json("error");
        cid=2;
        const val1=result[0]['count'] ;
        let value=[bId,cid];
        db.query(sql,value,(err,result1)=>{
            if(err) return res.json("error");
            cid=3;
            const val2=result1[0]['count'] ;
            let value=[bId,cid];
            db.query(sql,value,(err,result2)=>{
                if(err) return res.json("error");
                cid=4;
                const val3=result2[0]['count'] ;
                let value=[bId,cid];
                db.query(sql,value,(err,result3)=>{
                    if(err) return res.json("error");
                    cid=5;
                    const val4=result3[0]['count'] ;
                    let value=[bId,cid];
                    db.query(sql,value,(err,result4)=>{
                        if(err) return res.json("error");
                        //const resultss=[result,result1,result2,result3,result4];
                        const val5=result4[0]['count'] ;
                        return res.json([{
                            id:0,
                            value:val1
                        },{
                           id:1,
                           value:val2
                        },{
                            id:2,
                            value:val3
                        },{
                            id:3,
                            value:val4
                        },{
                            id:4,
                            value:val5
                        }]);
                        
                        
                    });
                    
                });
            });
        });
    });
});
 


app.put("/student/updateUser", (req, res) => {
  const { ContactNo, Email, PrivateAddress } = req.body[0];
  const values = [ContactNo, Email, req.session.Id];
  //const sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?"
  let sql;
  let i;
  console.log("updateUser has been called");

  if (req.session.role === "student") {
    sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?";
  } else {
    sql =
      "UPDATE owner_info SET ContactNo = ?,Email = ?,PrivateAddress=? WHERE Id = ?";
    i = values.pop();
    values.push(PrivateAddress);
    values.push(i);
  }

  db.query(sql, values, (err, data) => {
    console.log(err);
    if (err) return res.json(data);
    return res.json(data);
  });
});

//profile image upload
const storage_profile = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(" role : " + req.session.role);
    if (req.session.role === "student") {
      cb(null, "public/images/profile_images/student");
    } else {
      cb(null, "public/images/profile_images/owner");
    }
    //cb(null, "public/images/profile_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname)
    );
  },
});
const imagefileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};
const upload_profile = multer({
  storage: storage_profile,
  fileFilter: imagefileFilter,
});
app.post(
  "/profile/upload",
  upload_profile.single("profile_image"),
  (req, res) => {
    // Handle the uploaded image here

    const values = [req.file.filename, req.session.Id];
    const valuessecond = [req.session.Id];
    //const sql = "UPDATE student_info SET ContactNo = ?,Email = ? WHERE Id = ?"
    let sql;
    let sqlsecond;

    if (req.session.role === "student") {
      sql = "UPDATE student_info SET ProfileImage = ? WHERE Id = ?";
      sqlsecond = "SELECT ProfileImage FROM student_info WHERE Id = ?";
    } else {
      sql = "UPDATE owner_info SET ProfileImage = ? WHERE Id = ?";
      sqlsecond = "SELECT ProfileImage FROM owner_info WHERE Id = ?";
    }
    console.log("filename" + req.file.filename);
    console.log("values" + values);
    console.log("sql" + sql);
    db.query(sqlsecond, valuessecond, (err, data) => {
      if (err) return res.json(data);
      const previmage = data[0].ProfileImage;
      console.log(previmage);
      db.query(sql, values, (err, data) => {
        if (err) return res.json(data);
        fs.unlink(
          `public/images/profile_images/${req.session.role}/${previmage}`,
          (err) => {
            if (err) {
              console.error("Error deleting previous image:", err);
            } else {
              console.log("Previous image deleted successfully.");
            }
          }
        );

        return res.json(data);
      });
    });
  }
);
// profile - end





//Fetch data for useEffect - start
app.get("/", (req, res) => {
    if (req.session.role) {
        return res.json({
            Valid: true,
            Id: req.session.Id,
            Role: req.session.role,
            Gmail:req.session.email
        });
    } else {
        return res.json({ Valid: false });
    }
});
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
  const boardingId = req.params.id;
  const sql = "SELECT * FROM boarding_house WHERE `Id` = ?";
  db.query(sql, [boardingId], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
// app.delete("/boarding-houses/delete/:id", (req, res) => {
//   const boardingId = req.params.id;

//   const sql = "DELETE * FROM boarding_house WHERE `Id` = ?";
//   db.query(sql, [boardingId], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       console.log("delete boarding house............");
//       console.log(result);
//       res.json(result);
//     }
//   });
// });
app.delete("/boarding-houses/delete/:id", (req, res) => {
  const id = req.params.id;

  // Define a SQL query to delete the boarding house by ID
  const sql = "DELETE FROM boarding_house WHERE Id = ?";

  // Execute the SQL query with the provided ID
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log("error occured..........");
      console.error("Error deleting boarding house:", err);
      res.status(500).json({ result: "An error occurred while deleting the boarding house" });
    } else if (result.affectedRows > 0) {
      // Boarding house found and deleted
      console.log("boarding house deleted..........");
      res.status(200).json({ result: "Boarding house deleted successfully", Deleted: "Yes" });
    } else {
      console.log("boarding house not found..........");
      // Boarding house not found
      res.status(404).json({ result: "Boarding house not found" });
    }
  });
});
// app.put("/update/boarding-data/:id", upload.single("coverimage"), (req, res) => {
//     console.log("update boarding data............")
//     console.log(req.file);
//     const boardingId = req.params.id;
//     console.log("boarding Id : "+ boardingId);
//    // const sql = "UPDATE boarding_house SET `Title` = ? ,`Description`= ? ,`Price` = ? ,`Negotiable` = ?, `Address` = ? ,`Distance` = ? ,`Boys` = ? ,`Girls` = ? ,`Facilities`= ? ,`Rules` = ? ,`ContactNo` = ?, `CoverImage` = ? WHERE `Id` = ?";
//     const sql = "UPDATE boarding_house SET `Title` = ? ,`Description`= ? ,`Price` = ? ,`Negotiable` = ?, `Address` = ? ,`Distance` = ? ,`Boys` = ? ,`Girls` = ? ,`Facilities`= ? ,`Rules` = ? ,`ContactNo` = ?" +
//                 (req.file ? ", `CoverImage` = ?" : "") + " WHERE `Id` = ?";
//     //const img_filename = req.file.filename;
//     const img_filename = req.file ? req.file.filename : null; // Only set img_filename if req.file is defined
//     console.log("test.............")
//     console.log(req.session);
//     const owner_id = req.session.Id;
//     const distance = req.body.distance + " " + req.body.distanceUnit; // Combine distance and distanceUnit
//     console.log("image filename: "+ img_filename);
//     console.log("post-ad, ownerId: " + owner_id);
//     console.log("post-ad, distanceUnit: " + req.body.distanceUnit);
//     const values = [
//         owner_id,
//         req.body.title,
//         req.body.description,
//         req.body.price,
//         req.body.negotiable,
//         req.body.address,
//         distance,
//         req.body.boys,
//         req.body.girls,
//         req.body.facilities,
//         req.body.rules,
//         req.body.contactno,
//         img_filename,
//         boardingId
//     ];
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error("Error executing MySQL query:", err);
//             res.status(500).json({ error: "Internal server error" });
//         } else {
//             console.log(result);
//             res.json({
//                 result,
//                 boardingId
//             });
//         }
//     });
// });
app.put(
  "/update/boarding-data/:id",
  upload.single("coverimage"),
  (req, res) => {
    console.log("update boarding data............");
    console.log(req.file);
    const boardingId = req.params.id;
    console.log("boarding Id : " + boardingId);
    let sql = "";
    let values = [];
    let distance = "";
    if (req.body.distance && req.body.distanceUnit) {
      distance = req.body.distance + " " + req.body.distanceUnit;
    }
    if (req.file) {
      sql =
        "UPDATE boarding_house SET `Title` = ?, `Description` = ?, `Price` = ?, `Negotiable` = ?, `Address` = ?, `Distance` = ?, `Boys` = ?, `Girls` = ?, `Facilities` = ?, `Rules` = ?, `ContactNo` = ?, `CoverImage` = ? WHERE `Id` = ?";
      values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.negotiable,
        req.body.address,
        distance,
        req.body.boys ? req.body.boys : null,
        req.body.girls ? req.body.girls : null,
        req.body.facilities,
        req.body.rules,
        req.body.contactno,
        req.file.filename,
        boardingId,
      ];
    } else {
      sql =
        "UPDATE boarding_house SET `Title` = ?, `Description` = ?, `Price` = ?, `Negotiable` = ?, `Address` = ?, `Distance` = ?, `Boys` = ?, `Girls` = ?, `Facilities` = ?, `Rules` = ?, `ContactNo` = ? WHERE `Id` = ?";
      values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.negotiable,
        req.body.address,
        distance,
        req.body.boys ? req.body.boys : null,
        req.body.girls ? req.body.girls : null,
        req.body.facilities,
        req.body.rules,
        req.body.contactno,
        boardingId,
      ];
    }
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log(result);
        res.json({
          result,
          boardingId,
        });
      }
    });
  }
);


app.get("/student/check-email", (req, res) => {
  const email = req.query.email;

  const sql = "SELECT * FROM `student_info` WHERE Email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ result: "Error" });
    }

    if (result.length > 0) {
      return res.json({ result: "EmailExists" });
    } else {
      return res.json({ result: "EmailDoesNotExists" });
    }
  });
});
app.get("/owner/check-email", (req, res) => {
  const email = req.query.email;

  const sql = "SELECT * FROM `owner_info` WHERE Email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ result: "Error" });
    }

    if (result.length > 0) {
      return res.json({ result: "EmailExists" });
    } else {
      return res.json({ result: "EmailDoesNotExists" });
    }
  });
});
app.get("/student/check-username", (req, res) => {
  const username = req.query.username;

  const sql = "SELECT * FROM `student_info` WHERE UserName = ?";
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ result: "Error" });
    }

    if (result.length > 0) {
      return res.json({ result: "UsernameExists" });
    } else {
      return res.json({ result: "UsernameDoesNotExists" });
    }
  });
});
app.get("/owner/check-username", (req, res) => {
  const username = req.query.username;

  const sql = "SELECT * FROM `owner_info` WHERE UserName = ?";
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ result: "Error" });
    }

    if (result.length > 0) {
      return res.json({ result: "UsernameExists" });
    } else {
      return res.json({ result: "UsernameDoesNotExists" });
    }
  });
});
app.get("/owner/boarding-data", (req, res) => {
  const owner_id = req.session.Id;
  console.log("OwnerId : " + owner_id);
  const sql = "SELECT * FROM boarding_house where `OwnerId` = ?";
  db.query(sql, [owner_id], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("result is here");
      res.json(result);
    }
  });
});
//Fetch data for useEffect - end



// Admin login and Signup



//signup - start
const signup_storage_admin = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/profile_images/admin");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get the file extension
        const filenameWithoutExt = path.basename(file.originalname, ext); // Get the filename without extension
        cb(
            null,
            file.fieldname +
                "_" +
                Date.now() +
                "_" +
                filenameWithoutExt +
                path.extname(file.originalname)
        );
    },
});

const signup_upload_admin = multer({
    storage: signup_storage_admin,
});
app.post(
    "/admin/signup",
    signup_upload_admin.single("profileimage"),
    (req, res) => {
        const img_filename = req.file.filename;
        const sql =
            "INSERT INTO `admin_info` (`FullName`,`UserName`, `UnivRegNo`, `ContactNo`, `ProfileImage`,`Email`,`Faculty`,`Dept`,`Position`,`Password`) VALUES(?)";
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
                req.body.position,
                hash,
            ];
            db.query(sql, [values], (err, result) => {
                if (err){
                    return res.json({ Error: "Insert data Error in server" });
                }
                return res.json({ Status: "Success" });
            });
        });
    }
);
//signup - end
//admin - start
app.post("/admin/login",(req,res)=>{
    console.log("this is admin login");
    const sql = "SELECT * FROM admin_info WHERE Email = ?";
    try{db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Message: "Login error in server" });

        if (result.length > 0) {
            req.session.email = result[0].Email;
            req.session.Id = result[0].Id;
            req.session.role = "admin";
            const admin_password = result[0].Password;
            console.log(req.session.email);
            console.log(req.session.role);
            console.log(req.session.Id);
            console.log(admin_password);
            bcrypt.compare(
                req.body.password.toString(),
                result[0].Password,
                (err, response) => {
                    if (err)
                        return res.json({ Error: "Password compare error" });
                    if (response) { 
                        return res.json({
                            Status: "Success",
                            Email: req.session.Email,
                            Role: req.session.role,
                        });
                    } else {
                        return res.json({ Error: "Password not matched" });
                    }
                }
            );
        } else {
            return res.json({ Error: "No email existed" });
        }
    });}
    catch(error){
        console.log("error is occured.")
    }
    
});


app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.clearCookie("connect.sid");
    console.log("User logout...");
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});
//check password

app.post("/checkPassword", (req, res) => {
  let sql;

  if (req.session.role === "student")
    sql = "SELECT * FROM student_info WHERE `Id` = ?";
  else if (req.session.role === "owner")
    sql = "SELECT * FROM owner_info WHERE `Id` = ?";
  else console.log("role of the account holder is unaware by session !!!!");

  db.query(sql, [req.session.Id], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });

    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({
              Status: "Success",
              Email: req.session.Email,
              Role: req.session.role,
            });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No Id existed" });
    }
  });
});
//new password update

app.put("/passwordChange", (req, res) => {
  let sql;
  console.log("Password : ");
  //console.log(req.body.password.toString());
  if (req.session.role === "owner") {
    sql = "UPDATE owner_info SET Password = ? WHERE Id = ?";
  } else if (req.session.role === "student") {
    sql = "UPDATE student_info SET Password = ? WHERE Id = ?";
  } else
    console.log("something went terribly wrong. Role is undefined in session");
  console.log(sql);
  console.log(req.body);
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      console.log("hashing failed. ");
      return res.json({ Error: "Error for hashing password" });
    }
    const values = [hash, req.session.Id];
    console.log("hash :");
    console.log(hash);
    console.log("values");
    console.log(values);
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("query failed");
        return res.json({ Error: "Insert data Error in server" });
      }
      res.json({ Status: "Success" });
    });
  });
});
/* */

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred during file upload
    res.status(400).json({ error: "File upload error: " + err.message });
  } else if (err) {
    // Other error occurred
    res.status(400).json({ error: err.message });
  } else {
    // Continue to the next middleware
    next();
  }
});
app.post("/submit-location/:id", (req, res) => {
    
    let boardingId = req.params.id;
   
    const { lat, lng } = req.body;
 
    const ownerQuery = "SELECT OwnerId FROM boarding_house WHERE Id = ?";
    db.query(ownerQuery, [boardingId], (ownerErr, ownerResult) => {
      if (ownerErr) {
        console.error("Error fetching owner ID:", ownerErr);
        return res.status(500).json({ error: "An error occurred while fetching owner data." });
      }
    
      if (ownerResult.length > 0 && ownerResult[0].OwnerId === req.session.Id) {
        
        const sql = `
          INSERT INTO location_data (id, latitude, longitude)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE latitude = VALUES(latitude), longitude = VALUES(longitude)
        `;
        db.query(sql, [boardingId, lat, lng], (err, result) => {
          if (err) {
            console.error("Error inserting data into the database:", err);
            return res.status(500).json({ error: "An error occurred while saving the location data." });
          }
  
          return res.status(200).json({ message: "Location data saved successfully." });
        });
      } else {
        
        return res.status(403).json({ error: "You are not authorized to update this location." });
      }
    });
  });
  
  app.get("/boarding-locations/:id", (req, res) => {
    const sql = "SELECT * FROM location_data WHERE id = ?";
    const boardingId = req.params.id;
    db.query(sql, [boardingId], (err, results) => {
      if (err) {
        console.error("Error fetching boarding locations:", err);
        res.status(500).json({ error: "An error occurred while fetching location data." });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(200).json({ message: "No location found" });
        }
      }
    });
  });
  
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'isharamadushankakity@gmail.com',
      pass: 'yzpo hinr achj qnht',
    },
  });
  
  // to send emails
  app.post('/send-email/:id', async (req, res) => {
    const { text } = req.body;
  
    console.log("Send Gmail");
  
    try {
      const sql = "SELECT OwnerId FROM boarding_house WHERE Id = ?";
      const boardingId = req.params.id;
      
      
      let email = '';
  
      db.query(sql, [boardingId], (err, results) => {
        if (err) {
          console.error("Error fetching boarding locations:", err);
          res.status(500).json({ error: "An error occurred while fetching location data." });
        } else {
          console.log(results[0].OwnerId);
          const OwnerId = results[0].OwnerId;
          
          try {
            const ownerEmailSql = "SELECT Email FROM owner_info WHERE Id = ?";
            
            db.query(ownerEmailSql, [OwnerId], (err, result) => {
              if (err) {
                console.error("Error fetching owner Email:", err);
                res.status(500).json({ error: "An error occurred while fetching Owner Email." });
              } else {
                console.log("Em: ");
                console.log(result[0].Email);
                email = result[0].Email;
                
                const mailOptions = {
                  from: 'isharamadushankakity@gmail.com',
                  to: email,
                  subject: 'A message from a student.',
                  text,
                };
  
                transporter.sendMail(mailOptions, (sendMailError) => {
                  if (sendMailError) {
                    console.error('Error sending email:', sendMailError);
                    res.status(500).json({ message: 'Email could not be sent' });
                  } else {
                    res.status(200).json({ message: 'Email sent successfully' });
                  }
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  

  app.post('/contact_admin', (req, res) => {
    const { email, role, text } = req.body;
  
    if (!text || !email || !role) {
      
      return res.status(400).json({ message: 'Invalid request data' });
    }
  
    const messageData = {
      email,
      role,
      message: text,
    };
  

    const sql = 'INSERT INTO admin_notify (email, type, message) VALUES (?, ?, ?)';
    db.query(sql, [messageData.email, messageData.role, messageData.message], (err, result) => {
      if (err) {
        console.error('Error inserting message:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      return res.status(200).json({ message: 'Message sent successfully' });
    });
  });
  
  
app.listen(8081, () => {
    console.log("listening");
});