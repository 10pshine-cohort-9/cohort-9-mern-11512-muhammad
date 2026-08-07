import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import pool from "../config/db.js"

export const register = async (req, res) => {
    const { full_name, email, password } = req.body;

  // 1. Check if email already exists
  // 2. Hash password
  // 3. Save user in database
  // 4. Return success response

  res.json({ message: "Regiister endpoint" })

};

export const login = async (req, res) => {
    const { email, password } = req.body;


    // 1. Find user by email
    // 2. Compare password with bcrypt
    // 3. Generate JWT
    // 4. Return token

    res.json({ message: "Login endpoint" });
}