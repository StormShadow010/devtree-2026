import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  //Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Extract user details from the request body
  const { name, email, password, handle } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const handleCheck = slug(handle, "");
  const handleExists = await User.findOne({ handle: handleCheck });
  if (handleExists) {
    return res.status(400).json({ message: "Handle already exists" });
  }

  const newUser = { name, email, password, handle: handleCheck };
  // Hash the password before saving
  newUser.password = await hashPassword(newUser.password);

  // Save the new user to the database
  await User.create(newUser);
  res.status(201).json({ message: "User registered successfully" });
};
