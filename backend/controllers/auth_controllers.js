import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import pool from "../config/db.js"

export const register = async (req, res) => {
  try {

    const { full_name, email, password  } = req.body;

	if (!full_name || !email || !password) {
	return res.status(400).json({
		message: "All fields are required"
	});
	}

    const existing_user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing_user.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }


    const hashed_pass = await bcrypt.hash(password , 10);
    
    const new_user = await pool.query(
      `INSERT INTO users (full_name, email, password )
      VALUEs ($1, $2, $3)
      RETURNING id, full_name, email`,
      [full_name, email, hashed_pass]
    );
    
    res.status(201).json({
      message: "User registeredd SUCCESSfully",
      user: new_user.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }


};

export const login = async (req, res) => {
    try {
		const { email, password } = req.body;

		if (!email || !password) {
		return res.status(400).json({
			message: "All fields are required"
		});
		}
		
		const user = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}
		
		const existing_user = user.rows[0];

		const Match = await bcrypt.compare(
			password ,
			existing_user.password
		);

		if (!Match) {
			return res.status(401).json({

				message: "Invalid Emaill or PAssword",
			});
		}
	
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

		res.status(200).json({
			message: "Login Successful",
			token,
		});

	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: "Server Error",
		});
	}

}