import adminModel from "../models/Admins.js";

import express from "express";
import {
  RegisterValidations,
  errorMiddelware,
} from "../Middleware/users/index.js";

const router = express.Router();

//POST admin
router.post("/register",RegisterValidations(),
errorMiddelware, async (req, res) => {
  try {
    let adminData = new adminModel(req.body);

    //checking for already exist
    let emailCheck = await adminModel.findOne({ email: adminData.email });
    let phoneCheck = await adminModel.findOne({ phone: adminData.phone });

    if (emailCheck || phoneCheck) {
      return res.status(409).json({ msg: "Email and Phone Already Exist" });
    }

    //Hashing Password
    let hashPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashPassword;

    //user verification
    adminData.userverifytoken.email = randomString(10);
    adminData.userverifytoken.phone = randomString(10);

    //user authorization
    let emailToken = jwt.sign(
      { email: adminData.userverifytoken.email },
      config.get("JWTKEY"),
      { expiresIn: "1h" }
    );
    let phoneToken = jwt.sign(
      { phone: adminData.userverifytoken.phone },
      config.get("JWTKEY"),
      { expiresIn: "1h" }
    );

    console.log(`${config.get("URL")}/admin/email/verify/${emailToken}`);

    sendSMS({
      body: `Hi ${
        adminData.fullName
      }, Please click the given link to verify your phone ${config.get(
        "URL"
      )}/admin/phone/verify/${phoneToken}`,
      phonenumber: userData.phone,
    });

    console.log(`${config.get("URL")}/admin/phone/verify/${phoneToken}`);

    await adminData.save();
    res.status(200).json({ sucess: true, msg: "admin Rgister Successfully" ,adminData});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/email/verify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let verify = jwt.verify(token, config.get("JWTKEY"));

    if (!verify) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }
    let adminData = await adminModel.findOne({
      "userverifytoken.email": verify.email,
    });
    if (!adminData) {
      return res
        .status(200)
        .json({ success: "The Email has been Verified Already." });
    }
    // console.log(adminData);
    adminData.userverified.email = true;

    await adminData.save();
    res.status(200).json({ success: "The Email has been Verified." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

router.get("/phone/verify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let verify = jwt.verify(token, config.get("JWTKEY"));
    // console.log(verify);

    if (!verify) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }

    let adminData = await adminModel.findOne({
      "userverifytoken.phone": verify.phone,
    });
    // console.log(adminData);

    if (!adminData) {
      return res
        .status(200)
        .json({ success: "The Phone has been Verified Already." });
    }

    adminData.userverified.phone = true;
    await adminData.save();
    res.status(200).json({ success: "The Phone has been Verified." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});



//Login
router.post("/login", async (req, res) => {
  try {
    let {email,password}=req.body;
    let emailFound =await adminModel.findOne({email});
    
    if(!emailFound){
      return res.status(400).json({msg:"Please Register"});
    }
    
    const passwordFound = await bcrypt.compare(password,emailFound.password)
    // console.log(password);
    // console.log(emailFound.password);


    if(!passwordFound){
      return res.status(400).json({msg:"Incorrect Password"});
    }

    let jwtsignToken =jwt.sign({email},config.get("JWTKEY"),{expiresIn:"1h"});
    // console.log(jwtsignToken);

    let encryptedToken=CryptoJS.AES.encrypt(jwtsignToken,config.get("CRYPTOKEY")).toString();
    // console.log(encryptedToken);
   
    if(!encryptedToken){
      res.status(201).json({msg:"Token Expire"})
    }
    let admin = emailFound
    res.status(201).json({msg:"LoggedIn Sucessfully",admin})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});


//GET ALL admin
router.get("/getall", async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET admin BY ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    let uid = req.params.id;

    let admins = await adminModel.findOne({ uid });
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

//UPDATE admin BY ID
router.put("/updateadmin/:id", async (req, res) => {
  try {
    let uid = req.params.id;
    let adminData = req.body;
    await adminModel.findOneAndUpdate(
      { uid },
      {
        $set: adminData,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "Task Updated sucessfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

// DELETE ALL
router.delete("/deleteall", async (req, res) => {
  try {
    await adminModel.deleteMany({});
    res.status(200).json({ msg: " Deleted Sucessfully!! " });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BY ID
router.delete("/delete/:uid", async (req, res) => {
  try {
    let uid = req.params.uid;
    await adminModel.findOneAndDelete(uid);
    res.status(200).json({ msg: "Deleted Sucessfully!!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get all Projects
router.get("/getall/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const projects = admin.projects;

    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//GET PROJECTS BY ID
router.get("/getbyid/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const project = admin.projects.find((proj) => proj.uid == projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//GET PROJECTS BY CREATEDAT
router.get("/projects/created-at/:date", async (req, res) => {
  try {
    const targetDate = req.params.date; // Date in format 'YYYY-MM-DD'

    // Find projects created at the specified date
    const projects = await adminModel.aggregate([
      { $unwind: "$projects" },
      {
        $match: {
          "projects.createdAt": new Date(targetDate),
        },
      },
      {
        $group: {
          _id: "$_id",
          projects: { $push: "$projects" },
        },
      },
    ]);

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: "No projects found for the specified date" });
    }

    res.status(200).json({ projects: projects[0].projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//POST PROJECTS
router.post("/addprojects/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectData = req.body;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    admin.projects.push(projectData);

    await admin.save();

    res.status(200).json({ success: "Project added successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//UPDATE PROJECTS BY ID
router.put("/updatebyid/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;
    const updatedProjectData = req.body;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const project = admin.projects.find(
      (proj) => String(proj.uid) === projectId
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
    }

    // Update the project data
    Object.assign(project, updatedProjectData);

    await admin.save();

    res.status(200).json({ success: "Project updated successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

// DELETE PROJECTS BY ID
router.delete("/delete/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const projectIndex = admin.projects.findIndex(
      (proj) => String(proj.uid) === projectId
    );

    if (projectIndex === -1) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
    }

    // Remove the project from the admin's projects array
    admin.projects.splice(projectIndex, 1);

    // Save the updated admin object (with the project removed)
    await admin.save();

    res.status(200).json({ success: "Project deleted successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//Delete all projects
router.delete("/deleteall/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    admin.projects = [];
    
    await admin.save(); // Save the updated admin object with empty projects array

    res.status(200).json({ success: "All projects deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

export default router;
