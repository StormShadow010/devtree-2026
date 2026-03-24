import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";

const router = Router();

/** Auth and Registration Routes */
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  createAccount,
);

export default router;
