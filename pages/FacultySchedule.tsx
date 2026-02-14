
import React, { useState } from 'react';
import { Calendar, Clock, Edit2, BookOpen, MapPin, CheckCircle } from 'lucide-react';

interface ScheduledLecture {
  title: string;
  group: string;
  date: string;
  time: string;
  location: string;
}

const FacultySchedule: React.FC = () => {
  // State for the list of lectures
  const [upcomingLectures, setUpcomingLectures] = useState<ScheduledLecture[]>([
    {
      title: "Advanced Algorithms",
      group: "CS-2024-A (Sophomores)",
      date: "Oct 24, 2023",
      time: "10:00 AM - 11:30 AM",
      location: "LECTURE HALL B"
    },
    {
      title: "Cloud Computing Seminar",
      group: "CS-Elective-Cloud",
      date: "Oct 25, 2023",
      time: "02:00 PM - 04:00 PM",
      location: "VIRTUAL ROOM 4"
    },
    {
      title: "Introduction to DBMS",
      group: "CS-2024-B (Freshmen)",
      date: "Oct 27, 2023",
      time: "09:00 AM - 10:30 AM",
      location: "LECTURE HALL A"
    }
  ]);

  // Form State
  const [lectureName, setLectureName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [lectureDate, setLectureDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('LECTURE HALL A');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lectureName || !selectedGroup || !lectureDate || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const newLecture: ScheduledLecture = {
      title: lectureName,
      group: selectedGroup,
      date: new Date(lectureDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      time: `${startTime} - ${endTime}`,
      location: location.toUpperCase()
    };

    setUpcomingLectures([newLecture, ...upcomingLectures]);
    
    // Clear form
    setLectureName('');
    setSelectedGroup('');
    setLectureDate('');
    setStartTime('');
    setEndTime('');
    
    alert("Lecture scheduled successfully!");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      
      {/* Schedule Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#1B3B6F] mb-2">Schedule a Lecture</h1>
          <p className="text-gray-400 font-serif italic">Plan your upcoming academic sessions</p>
        </div>

        <form onSubmit={handleSchedule} className="space-y-6 max-w-3xl mx-auto">
          {/* New Lecture Name Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lecture Name</label>
            <div className="relative">
                <input 
                    type="text" 
                    required
                    value={lectureName}
                    onChange={(e) => setLectureName(e.target.value)}
                    placeholder="Enter lecture name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1B3B6F] focus:ring-4 focus:ring-[#1B3B6F]/5 outline-none text-gray-700 transition-all"
                />
                <BookOpen className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Group</label>
            <div className="relative">
                <select 
                    required
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#1B3B6F] outline-none appearance-none text-gray-700 transition-all"
                >
                    <option value="">Choose a group...</option>
                    <option>CS-2024-A (Sophomores)</option>
                    <option>CS-2024-B (Freshmen)</option>
                    <option>CS-Elective-Cloud</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lecture Date</label>
            <div className="relative">
                <input 
                    type="date" 
                    required
                    value={lectureDate}
                    onChange={(e) => setLectureDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1B3B6F] outline-none text-gray-700 transition-all"
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Start Time</label>
                <div className="relative">
                    <input 
                      type="time" 
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1B3B6F] outline-none text-gray-700 transition-all" 
                    />
                    <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">End Time</label>
                <div className="relative">
                    <input 
                      type="time" 
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1B3B6F] outline-none text-gray-700 transition-all" 
                    />
                    <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-6">
             <button type="submit" className="btn-elevated px-10 py-3 bg-[#2C4C88] text-white font-bold rounded-lg shadow-lg shadow-blue-900/10 transition-all">
                Schedule Lecture
             </button>
             <button 
                type="button" 
                onClick={() => {
                  setLectureName('');
                  setSelectedGroup('');
                  setLectureDate('');
                  setStartTime('');
                  setEndTime('');
                }}
                className="btn-elevated px-10 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
             >
                Cancel
             </button>
          </div>
        </form>
      </div>

      {/* Upcoming Lectures List */}
      <div className="space-y-6">
        <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2 text-[#1B3B6F] font-bold">
                <Calendar className="w-5 h-5" />
                <h3 className="text-xl font-serif">Upcoming Scheduled Lectures</h3>
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next 7 Days</span>
        </div>

        <div className="space-y-4">
            {upcomingLectures.map((lecture, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition-shadow group">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-blue-50 text-[#1B3B6F] rounded-lg group-hover:bg-[#1B3B6F] group-hover:text-white transition-colors">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-lg text-gray-900 leading-none mb-1">{lecture.title}</h4>
                            <p className="text-sm text-gray-500 font-serif italic">Group: {lecture.group} • {lecture.date}</p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-6">
                        <div className="text-right">
                            <p className="font-bold text-[#1B3B6F]">{lecture.time}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                                <MapPin className="w-3 h-3" /> {lecture.location}
                            </p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-[#1B3B6F] hover:bg-blue-50 rounded-full transition-colors">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default FacultySchedule;
