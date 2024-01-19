import { body, validationResult } from "express-validator";

const RegisterValidations = () => {
  return [
    body("fullName", "First Name is required < 50 &&  > 2 char").isLength({
      min: 2,
      max: 50,
    }),

    body("displayName", "Last Name is Required")
      .notEmpty()
      .isLength({ min: 2, max: 50 })
      .withMessage("Length should be <2 and >15"),

    body("email", "Should be a Valid Email").isEmail(),

    body("phone", "Should be a Valid Phone Number").isMobilePhone(),

    body("title", " title is Required")
      .notEmpty()
      .isLength({ min: 2, max: 25 })
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

export { RegisterValidations, errorMiddelware };
