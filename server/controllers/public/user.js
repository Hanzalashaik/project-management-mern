import userModel from "../../models/Users.js";
import express from "express";
import bcrypt from "bcrypt";
import randomString from "../../utils/randomString.js";
import jwt from "jsonwebtoken";
import config from "config";
import sendSMS from "../../utils/sendSMS.js";

import {
  RegisterValidations,
  errorMiddelware,
} from "../../Middleware/users/index.js";

const router = express.Router();


//POST USER/ REGISTER USER
router.post(
  "/register",
  RegisterValidations(),
  errorMiddelware,
  async (req, res) => {
    try {
      let userData = new userModel(req.body);

      //checking for already exist
      let emailCheck = await userModel.findOne({ email: userData.email });
      let phoneCheck = await userModel.findOne({ phone: userData.phone });

      if (emailCheck || phoneCheck) {
        return res.status(409).json({ msg: "Email and Phone Already Exist" });
      }

      //Hashing Password
      let hashPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashPassword;

      //user verification
      userData.userverifytoken.email = randomString(10);
      userData.userverifytoken.phone = randomString(10);

      //user authorization
      let emailToken = jwt.sign(
        { email: userData.userverifytoken.email },
        config.get("JWTKEY"),
        { expiresIn: "1d" }
      );
      let phoneToken = jwt.sign(
        { phone: userData.userverifytoken.phone },
        config.get("JWTKEY"),
        { expiresIn: "1d" }
      );

      console.log(`${config.get("URL")}/user/email/verify/${emailToken}`);

      //SMS
      // sendSMS({
      //   body: `Hi ${
      //     userData.fullName
      //   }, Please click the given link to verify your phone ${config.get(
      //     "URL"
      //   )}/user/phone/verify/${phoneToken}`,
      //   phonenumber: userData.phone,
      // });

      console.log(`${config.get("URL")}/user/phone/verify/${phoneToken}`);

      await userData.save();
      res
        .status(200)
        .json({ sucess: true, msg: "User Rgister Successfully", userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/email/verify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let verify = jwt.verify(token, config.get("JWTKEY"));

    if (!verify) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }
    let userData = await userModel.findOne({
      "userverifytoken.email": verify.email,
    });
    if (!userData) {
      return res
        .status(200)
        .json({ success: "The Email has been Verified Already." });
    }
    // console.log(userData);
    userData.userverified.email = true;

    await userData.save();
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

    let userData = await userModel.findOne({
      "userverifytoken.phone": verify.phone,
    });
    // console.log(userData);

    if (!userData) {
      return res
        .status(200)
        .json({ success: "The Phone has been Verified Already." });
    }

    userData.userverified.phone = true;
    await userData.save();
    res.status(200).json({ success: "The Phone has been Verified." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let emailFound = await userModel.findOne({ email });

    if (!emailFound) {
      return res.status(400).json({ msg: "Please Register" });
    }

    const passwordFound = await bcrypt.compare(password, emailFound.password);
    // console.log(password);
    // console.log(emailFound.password);

    if (!passwordFound) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    let jwtsignToken = jwt.sign({ email }, config.get("JWTKEY"), {
      expiresIn: "1d",
    });
    // console.log(jwtsignToken);

    // let encryptedToken = CryptoJS.AES.encrypt(
    //   jwtsignToken,
    //   config.get("CRYPTOKEY")
    // ).toString();
    // console.log(encryptedToken);

    if (!jwtsignToken) {
      res.status(201).json({ msg: "Token Expire" });
    }
    let user = emailFound;
    res.status(201).json({ msg: "LoggedIn Sucessfully", user , jwtsignToken});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

export default router;