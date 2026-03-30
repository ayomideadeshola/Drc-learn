import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Force role to 'user' or 'creator' only. Never 'admin'.
    const finalRole = (role === "creator") ? "creator" : "user";

    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      name,
      role: finalRole,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error during signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const trimmedPassword = password?.trim();
    console.log(`Login attempt for: ${normalizedEmail}`);
    
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      console.log(`User not found: ${normalizedEmail}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`Stored hash for ${normalizedEmail}: ${user.password}`);
    console.log(`Comparing with password: ${trimmedPassword}`);
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log(`Password match for ${normalizedEmail}: ${isMatch}`);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const getMe = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
