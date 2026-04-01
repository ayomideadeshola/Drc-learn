import { Request, Response } from "express";
import { Course } from "../models/course.js";
import { User } from "../models/user.js";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, thumbnail } = req.body;
    const creatorId = (req as any).user?.id; // Assuming auth middleware adds user to req

    if (!creatorId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const course = await Course.create({
      title,
      description,
      creatorId,
      price,
      category,
      thumbnail,
    });

    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: User, as: "creator", attributes: ["name", "email"] }],
    });
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: [{ model: User, as: "creator", attributes: ["name", "email"] }],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, thumbnail } = req.body;
    const userId = (req as any).user?.id;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Only creator or admin can update
    if (course.creatorId !== userId && (req as any).user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await course.update({
      title,
      description,
      price,
      category,
      thumbnail,
    });

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Only creator or admin can delete
    if (course.creatorId !== userId && (req as any).user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
