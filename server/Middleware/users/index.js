import { body, validationResult } from "express-validator";

const userRegisterValidations = () => {
  return [
    body("fullName", "First Name is required &&  > 2 char").isLength({
      min: 2,
      max: 15,
    }),

    body("displayName", "Last Name is Required")
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage("Length should be <2 and >15"),

    body("email", "Should be a Valid Email").isEmail(),

    body("phone", "Should be a Valid Phone Number").isMobilePhone(),

    body("title", " title is Required")
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage("Length should be <2 and >15"),
    body("password", "Should be a Strong Password")
      .isStrongPassword()
      .isLength({ min: 8, max: 16 }),
  ];
};

const errorMiddelware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  return next();
};

export { userRegisterValidations, errorMiddelware };
