import React, { useState, useEffect } from "react";
import {
  Search,
  Grid,
  List,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  Plus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { courseApi, Course } from "../api/courses";
import { enrollInCourse, getMyEnrollments } from "../api/enrollment"

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "Technology",
    thumbnail: "https://picsum.photos/seed/course/800/600",
    rating: 4.5,
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    duration: "10h",
    lessons: 10,
    enrolled: 0,
  });

  const categories = [
    "All Courses",
    "Leadership",
    "Analytics",
    "Technology",
    "Finance",
    "Management",
    "Soft Skills",
  ];

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const [coursesData, enrollmentsData] = await Promise.all([
        courseApi.getAll(),
        user ? getMyEnrollments() : Promise.resolve([]),
      ]);
      setCourses(coursesData);
      if (enrollmentsData) {
        setEnrolledCourseIds(new Set(enrollmentsData.map((e: any) => e.courseId)));
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category,
        thumbnail: course.thumbnail,
        rating: course.rating,
        level: course.level,
        duration: course.duration,
        lessons: course.lessons,
        enrolled: course.enrolled,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: "",
        description: "",
        price: 0,
        category: "Technology",
        thumbnail: "https://picsum.photos/seed/course/800/600",
        rating: 4.5,
        level: "Beginner",
        duration: "10h",
        lessons: 10,
        enrolled: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await courseApi.update(editingCourse.id, formData);
      } else {
        await courseApi.create(formData);
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err: any) {
      alert(err.message || "Failed to save course");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseApi.delete(id);
      fetchCourses();
    } catch (err: any) {
      alert(err.message || "Failed to delete course");
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      alert("Please login to enroll in courses");
      return;
    }
    try {
      setEnrollingId(courseId);
      await enrollInCourse(courseId);
      setEnrolledCourseIds((prev) => new Set([...prev, courseId]));
      // Update local course count
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to enroll in course");
    } finally {
      setEnrollingId(null);
    }
  };

  const canManage = user?.role === "admin" || user?.role === "creator";

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === 0 || course.category === categories[activeCategory];
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-on-surface">
            Course Library
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm sm:text-base">
            Explore our comprehensive suite of executive learning modules.
          </p>
        </div>
        {canManage && (
          <button
            onClick={() => handleOpenModal()}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm whitespace-nowrap"
          >
            <Plus size={16} />
            <span>New Course</span>
          </button>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant p-4 sm:p-6 shadow-sm space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === i
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-outline-variant hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              size={16}
            />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant shrink-0">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid / List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-error-container text-on-error-container p-6 rounded-3xl border border-error/20 text-center">
          <p className="font-bold">Error loading courses</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={fetchCourses}
            className="mt-4 text-sm font-bold underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-5 sm:gap-6 lg:gap-8 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer relative ${
                view === "list"
                  ? "flex flex-col sm:flex-row sm:items-center sm:gap-6 sm:p-4"
                  : ""
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`relative overflow-hidden shrink-0 ${
                  view === "list"
                    ? "w-full h-48 sm:w-52 sm:h-36 sm:rounded-2xl"
                    : "aspect-video"
                }`}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                    {course.category}
                  </span>
                </div>

                {canManage &&
                  (course.creatorId === user?.id || user?.role === "admin") && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(course);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-md text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(course.id);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-md text-error rounded-lg hover:bg-error hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 p-4 sm:p-5 ${view === "list" ? "sm:p-0" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-bold text-on-surface">
                      {course.rating}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      course.level === "Advanced"
                        ? "bg-red-500/10 text-red-600"
                        : course.level === "Intermediate"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-bold text-on-surface leading-tight group-hover:text-primary transition-colors mb-3">
                  {course.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-xs font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={13} />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={13} />
                    <span>{course.enrolled.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {course.creator?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "U"}
                    </div>
                    <span className="text-xs font-bold text-on-surface truncate max-w-[120px]">
                      {course.creator?.name || "Unknown"}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </div>
                </div>

                {/* Enrollment Button */}
                {!canManage && (
                  <div className="mt-4">
                    {enrolledCourseIds.has(course.id) ? (
                      <button
                        disabled
                        className="w-full py-2.5 bg-emerald-500/10 text-emerald-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2"
                      >
                        <Star size={14} fill="currentColor" />
                        <span>Enrolled</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(course.id);
                        }}
                        disabled={enrollingId === course.id}
                        className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                      >
                        {enrollingId === course.id ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Plus size={14} />
                        )}
                        <span>Enroll Now</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface-container-lowest rounded-[2rem] border border-outline-variant shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-outline-variant flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-on-surface">
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">
                    Course Title
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Advanced Leadership Strategies"
                    className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe what students will learn..."
                    className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    >
                      {categories
                        .filter((c) => c !== "All Courses")
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: e.target.value as any,
                        })
                      }
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Rating
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value),
                        })
                      }
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="e.g. 12h 30m"
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">
                      Lessons
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.lessons}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lessons: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                    className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 bg-surface-container-low text-on-surface font-bold rounded-2xl hover:bg-outline-variant transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
                  >
                    {editingCourse ? "Update Course" : "Create Course"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
