import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Star, Users, Play, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Course } from "../api/courses";
import { getMyEnrollments } from "../api/enrollment";

interface Creator {
  id: string;
  name: string;
}

interface EnrollmentCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  lessons: number;
  thumbnail: string;
  creator: Creator;
}

interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  ststus: string;        // ✅ matches API typo exactly
  progress: number;
  createdAt: string;
  updatedAt: string;
  Course: EnrollmentCourse; // ✅ capital C to match API
}

const MyCourses: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const data = await getMyEnrollments();
        setEnrollments(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch your courses");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-container text-on-error-container p-6 rounded-3xl border border-error/20 text-center">
        <p className="font-bold">Error loading your courses</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-bold underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-on-surface">
          My Learning Journey
        </h1>
        <p className="text-on-surface-variant mt-1 text-sm sm:text-base">
          Continue where you left off and master new skills.
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <BookOpen size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-on-surface">
              No courses yet
            </h2>
            <p className="text-on-surface-variant max-w-md mx-auto">
              You haven't enrolled in any courses yet. Explore our library to
              find the perfect course for you.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <span>Browse Courses</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((enrollment, index) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              {/* ─── Thumbnail ─────────────────────── */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={enrollment.Course.thumbnail}   // ✅ capital Course
                  alt={enrollment.Course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    to={`/courses/${enrollment.courseId}`}
                    className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500"
                  >
                    <Play className="text-white fill-white ml-1" size={24} />
                  </Link>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                    {enrollment.Course.category}   {/* ✅ capital Course */}
                  </div>
                </div>
              </div>

              {/* ─── Card Body ─────────────────────── */}
              <div className="p-6 space-y-4">

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${enrollment.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                  {enrollment.Course.title}   {/* ✅ capital Course */}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-on-surface-variant text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{enrollment.Course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} />
                    <span>{enrollment.Course.lessons} Lessons</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users size={12} className="text-primary" />
                  </div>
                  <span>By <strong>{enrollment.Course.creator.name}</strong></span>
                </div>

                {/* CTA */}
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="w-full py-3 bg-surface-container-low text-on-surface font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>
                    {enrollment.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;