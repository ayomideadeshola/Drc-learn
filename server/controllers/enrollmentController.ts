import { Request, Response } from "express";
import { Enrollment, Course, User } from "../models/index.js";

export async function enrollInCourse(req: Request, res: Response) {
  try {
    const { courseId } = req.body;
    const userId = (req as any).user.id;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      status: "active",
      progress: 0,
    });

    // Update course enrollment count
    await course.increment("enrolled");

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (error) {
    console.error("Error in enrollInCourse:", error);
    res.status(500).json({ message: "Server error during enrollment" });
  }
}

export async function getUserEnrollments(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          attributes: ["id", "title", "thumbnail", "category", "duration", "lessons"],
          include: [
            {
              model: User,
              as: "creator",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.json(enrollments);
  } catch (error: any) {
    console.error("Error in getUserEnrollments:", error);
    res.status(500).json({ 
      message: "Server error fetching enrollments",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

export async function getCourseStudents(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user.id;

    // Check if user is the creator of the course
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.creatorId !== userId) {
      return res.status(403).json({ message: "Unauthorized to view student list" });
    }

    const students = await Enrollment.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json(students);
  } catch (error) {
    console.error("Error in getCourseStudents:", error);
    res.status(500).json({ message: "Server error fetching students" });
  }
}
