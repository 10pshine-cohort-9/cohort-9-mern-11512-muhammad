import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import pool from "../config/db.js"

export const register = async (req, res) => {
  try {

    const { full_name, email, password  } = req.body;
    // TO DO
    // 1. Check if email already exists
    const existing_user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing_user.rows.length > 0) {
      return res.status(400).json({
        success:false,
        message: "Email already exists"
      });
    }
    
    // 2. Hash 
    const hashed_pass = await bcrypt.hash(password , 10);
    
    // 3. Save user in database
    const new_user = await pool.query(
      `INSERT INTO users (full_name, email, password )
      VALUEs ($1, $2, $3)
      RETURNING id, full_name, email`,
      [full_name, email, hashed_pass]
    );
    
    // 4. Return success response
    res.status(201).json({
      success: true, 
      message: "User registeredd SUCCESSfully",
      user: new_user.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }


};

export const login = async (req, res) => {
    try {
		const { email, password } = req.body;
		
		// to DDo 
		// 1. Find user by email
		const user = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}
		
		const existing_user = user.rows[0];

		// 2. Compare password with bcrypt
		const Match = await bcrypt.compare(
			password ,
			existing_user.password
		);

		if (!Match) {
			return res.status(401).json({
				success: false,
				message: "Invalid Emaill or PAssword",
			});
		}
		// 3. Generate JWT
		const token = jwt.sign(
			{
				id: existing_user.id,
				email: existing_user.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			}
		);

		// 4. Return token
		res.status(200).json({
			success: true,
			message: "Login Successful",
			token,
		});

	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}

}