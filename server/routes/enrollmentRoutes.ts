import { Router } from "express";
import * as enrollmentController from "../controllers/enrollmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// All enrollment routes require authentication
router.use(authenticate);

// Join a course
router.post("/join", (req, res) => enrollmentController.enrollInCourse(req, res));

// Get courses user is enrolled in
router.get("/my-courses", (req, res) => enrollmentController.getUserEnrollments(req, res));

// Get list of students in a course (for instructors)
router.get("/course/:courseId/students", (req, res) => enrollmentController.getCourseStudents(req, res));

export default router;
