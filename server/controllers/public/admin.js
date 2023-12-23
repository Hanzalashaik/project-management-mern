import adminModel from "../../models/Admins.js";
import bcrypt from "bcrypt";
import randomString from "../../utils/randomString.js";
import jwt from "jsonwebtoken";
import config from "config";
import CryptoJS from "crypto-js";
import sendSMS from "../../utils/sendSMS.js";
import express from "express";
import {
  RegisterValidations,
  errorMiddelware,
} from "../../Middleware/users/index.js";

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
      { expiresIn: "1d" }
    );
    let phoneToken = jwt.sign(
      { phone: adminData.userverifytoken.phone },
      config.get("JWTKEY"),
      { expiresIn: "1d" }
    );

    console.log(`${config.get("URL")}/admin/email/verify/${emailToken}`);

    // sendSMS({
    //   body: `Hi ${
    //     adminData.fullName
    //   }, Please click the given link to verify your phone ${config.get(
    //     "URL"
    //   )}/admin/phone/verify/${phoneToken}`,
    //   phonenumber: userData.phone,
    // });

    console.log(`${config.get("URL")}/admin/phone/verify/${phoneToken}`);

    await adminData.save();
    res.status(200).json({ sucess: true, msg: "admin Rgister Successfully" });
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

    let jwtsignToken =jwt.sign({email},config.get("JWTKEY"),{expiresIn:"1d"});
    // console.log(jwtsignToken);

   
    if(!jwtsignToken){
      res.status(201).json({msg:"Token Expire"})
    }
    let admin = emailFound
    res.status(201).json({msg:"LoggedIn Sucessfully",admin,jwtsignToken})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});


export default router;