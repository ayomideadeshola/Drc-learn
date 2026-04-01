import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected routes
router.post("/", authenticate, authorize(["admin", "creator"]), createCourse);
router.put("/:id", authenticate, authorize(["admin", "creator"]), updateCourse);
router.delete("/:id", authenticate, authorize(["admin", "creator"]), deleteCourse);

export default router;
