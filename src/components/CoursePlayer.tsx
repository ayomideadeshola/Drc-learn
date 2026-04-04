import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Play, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Clock, 
  ArrowLeft 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  duration: string;
  order: number;
  isCompleted: boolean;
}

interface Course {
  id: string;
  title: string;
}

export default function CoursePlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`/api/lessons/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLessons(data);
          
          // Find first uncompleted lesson
          const firstUncompleted = data.findIndex((l: Lesson) => !l.isCompleted);
          if (firstUncompleted !== -1) {
            setCurrentLessonIndex(firstUncompleted);
          }
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchLessons();
    fetchCourse();
  }, [courseId]);

  const currentLesson = lessons[currentLessonIndex];

  const handleComplete = async () => {
    if (!currentLesson) return;

    try {
      const response = await fetch(`/api/lessons/${currentLesson.id}/complete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedLessons = [...lessons];
        updatedLessons[currentLessonIndex].isCompleted = true;
        setLessons(updatedLessons);

        // Auto-advance to next lesson if available
        if (currentLessonIndex < lessons.length - 1) {
          setCurrentLessonIndex(currentLessonIndex + 1);
        }
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">No content available for this course yet.</h2>
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 flex flex-col lg:relative"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-bold text-lg truncate pr-4">{course?.title || "Course Content"}</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`w-full text-left px-6 py-4 flex items-start gap-3 transition-colors ${
                    index === currentLessonIndex 
                      ? "bg-indigo-600/20 text-indigo-400 border-r-2 border-indigo-500" 
                      : "hover:bg-slate-800 text-slate-400"
                  }`}
                >
                  <div className="mt-1">
                    {lesson.isCompleted ? (
                      <CheckCircle size={18} className="text-emerald-500" />
                    ) : (
                      <Play size={18} className={index === currentLessonIndex ? "text-indigo-400" : "text-slate-600"} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${index === currentLessonIndex ? "text-white" : ""}`}>
                      {index + 1}. {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs opacity-60">
                      <Clock size={12} />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-slate-800">
              <button 
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="text-slate-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
            )}
            <h1 className="font-semibold text-slate-200 truncate max-w-md">
              {currentLesson?.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentLessonIndex === 0}
              onClick={() => setCurrentLessonIndex(prev => prev - 1)}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-sm text-slate-500">
              {currentLessonIndex + 1} / {lessons.length}
            </span>
            <button
              disabled={currentLessonIndex === lessons.length - 1}
              onClick={() => setCurrentLessonIndex(prev => prev + 1)}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </header>

        {/* Player Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group">
              {currentLesson?.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                  <Play size={64} className="mb-4 opacity-20" />
                  <p>No video available for this lesson</p>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{currentLesson?.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} /> {currentLesson?.duration}
                    </span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold">
                      Lesson {currentLessonIndex + 1}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  disabled={currentLesson?.isCompleted}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentLesson?.isCompleted
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                  }`}
                >
                  {currentLesson?.isCompleted ? (
                    <>
                      <CheckCircle size={20} /> Completed
                    </>
                  ) : (
                    "Mark as Completed"
                  )}
                </button>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                {currentLesson?.content}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
