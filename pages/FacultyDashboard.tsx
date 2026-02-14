import React, { useState, useEffect } from 'react';
import { Users, BarChart2, Calendar, BookOpen, X, Clock, MapPin, Plus, Save, UserPlus, Settings, FileText, TrendingUp, Activity, BarChart, Sparkles, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';

interface Lecture {
  id?: number;
  title: string;
  group_name: string;
  lecture_date: string;
  start_time: string;
  end_time: string;
  location: string;
  status?: 'scheduled' | 'live' | 'completed';
  focus_rate?: number;
}

interface Student {
  id?: number;
  full_name: string;
  roll_number: string;
  email: string;
  class_group: string;
  attendance_percentage?: number;
}

interface AttendanceRecord {
  student_name: string;
  roll_number: string;
  class_group: string;
  total_lectures: number;
  attended_lectures: number;
  percentage: number;
}

interface AttendanceSettings {
  threshold: number;
  alerts_enabled: boolean;
}

interface EngagementAnalytics {
  overall_score: number;
  distribution: { name: string; value: number; color: string }[];
  trend: { lecture: string; score: number }[];
  class_averages: { class_name: string; score: number }[];
}

interface WeeklyTrend {
  day: string;
  current_week: number;
  previous_week: number;
}

interface EngagementSettings {
  threshold: number;
  alerts_enabled: boolean;
}

const FacultyDashboard: React.FC = () => {
  // -- Modal States --
  const [showViewModal, setShowNotificationsModal] = useState(false); // Notifications Modal (used for schedule view)
  const [showStudentListModal, setShowStudentListModal] = useState(false); // Students List Modal

  const [isLoading, setIsLoading] = useState(false);

  // -- Data States (Lectures) --
  const [todaysLectures, setTodaysLectures] = useState<Lecture[]>([]);
  const [dailyLectureCount, setDailyLectureCount] = useState(2); // Completed lectures today

  // Completed Lectures for the "Previous Lectures" section
  const [completedLectures, setCompletedLectures] = useState<Lecture[]>([
    { id: 1, title: 'Machine Learning Basics', group_name: 'CS-501', lecture_date: 'Oct 24, 2023', start_time: '2:00 PM', end_time: '3:30 PM', location: 'Hall B', status: 'completed', focus_rate: 82 },
    { id: 2, title: 'Linked Lists & Pointers', group_name: 'CS-301', lecture_date: 'Oct 23, 2023', start_time: '9:00 AM', end_time: '10:30 AM', location: 'Hall A', status: 'completed', focus_rate: 75 },
    { id: 3, title: 'Complexity Analysis', group_name: 'CS-402', lecture_date: 'Oct 22, 2023', start_time: '11:00 AM', end_time: '12:30 PM', location: 'Lab 3', status: 'completed', focus_rate: 68 },
    { id: 4, title: 'Database Indexing', group_name: 'CS-202', lecture_date: 'Oct 21, 2023', start_time: '1:00 PM', end_time: '2:30 PM', location: 'Hall C', status: 'completed', focus_rate: 89 },
  ]);

  // -- Data States (Students) --
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [totalStudentsCount, setTotalStudentsCount] = useState(142);

  // Previous Class Summary Data (Mocked)
  const previousClassSummary = {
    name: "CS-402: Algorithms",
    date: "Yesterday, Oct 23",
    time: "11:00 AM - 12:30 PM",
    attendance: 92,
    attendedCount: 35,
    totalCount: 38,
    engagementStatus: "Highly Focused",
    distribution: [
      { name: 'Focused', value: 70, color: '#74B783' },
      { name: 'Confused', value: 15, color: '#88AED0' },
      { name: 'Bored', value: 10, color: '#C0C0C0' },
      { name: 'Distracted', value: 5, color: '#E8A89A' }
    ]
  };

  // -- Backend Integration Logic: Lectures --
  const fetchTodaysLectures = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/lectures/today');
        if (response.ok) {
            const data = await response.json();
            setTodaysLectures(data);
        } else {
            console.warn("Backend not connected. Using mock data.");
            setTodaysLectures([
                { id: 101, title: 'Data Structures', group_name: 'CS-301', lecture_date: '2023-10-24', start_time: '09:00', end_time: '10:30', location: 'Hall A', status: 'completed' },
                { id: 102, title: 'Advanced Algorithms', group_name: 'CS-402', lecture_date: '2023-10-24', start_time: '11:00', end_time: '12:30', location: 'Lab 3', status: 'completed' },
                { id: 103, title: 'Machine Learning', group_name: 'CS-501', lecture_date: '2023-10-24', start_time: '14:00', end_time: '15:30', location: 'Hall B', status: 'live' }
            ]);
        }
    } catch (error) {
        console.error("Error fetching lectures:", error);
    } finally {
        setIsLoading(false);
    }
  };

  // -- Backend Integration Logic: Students --
  const fetchStudentList = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/students/list');
        if (response.ok) {
            const data = await response.json();
            setStudentList(data);
            setTotalStudentsCount(data.length);
        } else {
            console.warn("Backend not connected. Using mock student data.");
            setStudentList([
                { id: 1, full_name: 'Alice Johnson', roll_number: 'CS-2024-001', email: 'alice@uni.edu', class_group: 'CS-301', attendance_percentage: 95 },
                { id: 2, full_name: 'Bob Smith', roll_number: 'CS-2024-002', email: 'bob@uni.edu', class_group: 'CS-301', attendance_percentage: 88 },
                { id: 3, full_name: 'Charlie Davis', roll_number: 'CS-2024-003', email: 'charlie@uni.edu', class_group: 'CS-402', attendance_percentage: 72 },
                { id: 4, full_name: 'Diana Evans', roll_number: 'CS-2024-004', email: 'diana@uni.edu', class_group: 'CS-101', attendance_percentage: 91 },
            ]);
        }
    } catch (error) {
        console.error("Error fetching students:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const statCards = [
    {
      id: 1,
      value: dailyLectureCount.toString(),
      label: "Daily Lecture Count",
      icon: <BookOpen className="w-6 h-6" />,
      style: "bg-blue-50 text-[#1B3B6F]",
      onClick: () => {
          fetchTodaysLectures();
          setShowNotificationsModal(true);
      },
      isClickable: true
    },
    {
      id: 2,
      value: totalStudentsCount.toString(),
      label: "Total Students",
      icon: <Users className="w-6 h-6" />,
      style: "bg-green-50 text-green-700",
      onClick: () => {
          fetchStudentList();
          setShowStudentListModal(true);
      },
      isClickable: true
    }
  ];

  return (
    <>
    <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Welcome, Professor.</h1>
        <p className="text-gray-500 font-serif italic">Here's the summary of your classes and student engagement today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {statCards.map((card) => (
            <div 
                key={card.id} 
                onClick={card.isClickable ? card.onClick : undefined}
                className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative ${card.isClickable ? 'btn-elevated cursor-pointer group' : ''}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg ${card.style} group-hover:scale-110 transition-transform duration-300`}>
                        {card.icon}
                    </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900">{card.value}</h3>
                <p className="text-sm text-gray-500">{card.label}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Previous Lectures Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-gray-900 font-serif">Previous Lectures</h3>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Historical Performance</span>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Lecture Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Group</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Focus Rate</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {completedLectures.map((lecture) => (
                            <tr key={lecture.id} className="hover:bg-gray-50/80 transition-colors duration-200">
                                <td className="px-6 py-4 font-bold text-gray-900">{lecture.title}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-50 text-[#1B3B6F] text-[10px] font-bold uppercase rounded-full border border-blue-100">
                                        {lecture.group_name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-serif italic">
                                    {lecture.lecture_date} • {lecture.start_time}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-green-500 rounded-full transition-all duration-700" 
                                                style={{ width: `${lecture.focus_rate}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">{lecture.focus_rate}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full flex items-center gap-1 w-fit border border-green-200">
                                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> Completed
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
                <button 
                    className="btn-elevated text-sm font-bold text-[#1B3B6F] bg-white border border-blue-100 px-4 py-2 rounded-lg"
                    onClick={() => { /* Potential Load More or Analytics redirect */ }}
                >
                    View All Analytics
                </button>
            </div>
        </div>

        {/* Previous Class Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-full flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-900 font-serif">Previous Class Summary</h3>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-full flex items-center gap-1 border border-green-100">
                    <Sparkles className="w-3 h-3" /> {previousClassSummary.engagementStatus}
                </span>
            </div>

            <div className="w-full mb-6 border-b border-gray-50 pb-4">
                <h4 className="text-xl font-bold text-gray-900 font-serif leading-tight">{previousClassSummary.name}</h4>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 italic">
                    <Calendar className="w-3 h-3" /> {previousClassSummary.date} • {previousClassSummary.time}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attendance</p>
                        <p className="text-lg font-bold text-[#1B3B6F]">{previousClassSummary.attendance}%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Students</p>
                        <p className="text-lg font-bold text-gray-600">{previousClassSummary.attendedCount}/{previousClassSummary.totalCount}</p>
                    </div>
                </div>
            </div>

            <div className="w-48 h-48 relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-gray-900 font-serif">{previousClassSummary.distribution[0].value}%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Focused</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={previousClassSummary.distribution}
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {previousClassSummary.distribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-3">
                 {previousClassSummary.distribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-gray-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-gray-900">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>

    {/* -- Modals -- */}
    
    {/* View Today's Schedule Modal */}
    {showViewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="modal-elevated bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-[#1B3B6F] rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold text-gray-900">Today's Schedule</h2>
                            <p className="text-xs text-gray-500 font-serif italic">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowNotificationsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="text-center py-12 text-gray-400">Loading schedule...</div>
                    ) : todaysLectures.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                            <Calendar className="w-12 h-12 mb-2 opacity-20" />
                            <p>No lectures scheduled for today.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todaysLectures.map((lecture) => (
                                <div key={lecture.id} className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900">{lecture.title}</h3>
                                            <span className="px-2 py-0.5 bg-blue-50 text-[#1B3B6F] text-[10px] font-bold uppercase rounded-full">{lecture.group_name}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lecture.start_time} - {lecture.end_time}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {lecture.location}</span>
                                        </div>
                                    </div>
                                    <button className="btn-elevated px-4 py-2 text-sm font-bold text-[#1B3B6F] border border-blue-100 rounded-lg bg-white">
                                        View details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button 
                        onClick={() => setShowNotificationsModal(false)}
                        className="btn-elevated px-6 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )}

    {/* View Student List Modal */}
    {showStudentListModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="modal-elevated bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-700 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold text-gray-900">Student List</h2>
                            <p className="text-xs text-gray-500 font-serif italic">Total Records: {studentList.length}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowStudentListModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="overflow-auto p-0 flex-1">
                    {isLoading ? (
                         <div className="text-center py-12 text-gray-400">Loading students...</div>
                    ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Roll Number</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Class</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {studentList.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">{student.full_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{student.roll_number}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-50 text-[#1B3B6F] text-xs font-bold rounded-full">{student.class_group}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button onClick={() => setShowStudentListModal(false)} className="btn-elevated px-6 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50">Close</button>
                </div>
            </div>
        </div>
    )}
    
    </>
  );
};

export default FacultyDashboard;
