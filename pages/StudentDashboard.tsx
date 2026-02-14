
import React, { useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  Lock, 
  Flame, 
  Target, 
  TrendingUp, 
  BarChart3,
  CheckCircle2,
  CircleDashed,
  Layers,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassSession {
  id: string;
  subject: string;
  faculty: string;
  time: string;
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED';
  room?: string;
  focusScore?: number; // 0-100
  attended?: boolean;
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const sessionsRef = useRef<HTMLDivElement>(null);

  // Theme Colors from Statistics Page
  const THEME = {
    green: '#74B783',
    blue: '#88AED0',
    gray: '#C0C0C0',
    pink: '#E8A89A',
    background: '#F0F7FF',
    cardBorder: 'border-gray-100'
  };

  // Mocked Metrics for Demo
  const metrics = {
    streak: 7,
    focusSessionsToday: 3,
    focusTrend: '+12%',
    overallAttendance: 88,
    attendanceStatus: 'Excellent',
    attendedToday: 2,
    totalToday: 3
  };

  const classes: ClassSession[] = [
    {
      id: '1',
      subject: 'Data Structures & Algorithms',
      faculty: 'Prof. Alan Smith',
      time: '09:00 AM - 10:30 AM',
      status: 'LIVE',
      room: 'Virtual Room 1',
      focusScore: 92,
      attended: true
    },
    {
      id: '2',
      subject: 'Database Management Systems',
      faculty: 'Dr. Sarah Jenkins',
      time: '11:00 AM - 12:30 PM',
      status: 'UPCOMING',
      room: 'Virtual Room 3',
      attended: false
    },
    {
      id: '3',
      subject: 'Operating Systems',
      faculty: 'Prof. Rajesh Kumar',
      time: 'Yesterday',
      status: 'COMPLETED',
      focusScore: 78,
      attended: true
    }
  ];

  const scrollToSessions = () => {
    sessionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Welcome & Header - Simplified */}
      <header className="mb-2">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">Welcome back, John.</h1>
        <p className="text-gray-500 font-serif italic text-lg">Performance analysis and engagement trends.</p>
      </header>

      {/* Primary Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Streak Widget - Pastel Green */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-green-50 rounded-xl group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" style={{ color: THEME.green }} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ color: THEME.green, backgroundColor: `${THEME.green}15` }}>Active Streak</span>
          </div>
          <h3 className="text-5xl font-serif font-bold text-gray-900">{metrics.streak} Days</h3>
          <p className="text-sm text-gray-400 font-medium font-serif italic mt-1">Learning Continuity</p>
          <div className="mt-6 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full transition-all duration-1000" style={{ backgroundColor: THEME.green, width: '70%' }}></div>
          </div>
        </div>

        {/* Focus Widget - Pastel Blue with Clickable Count */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" style={{ color: THEME.blue }} />
            </div>
            <div className="flex items-center text-xs font-bold gap-0.5" style={{ color: THEME.green }}>
              <TrendingUp className="w-4 h-4" /> {metrics.focusTrend}
            </div>
          </div>
          
          {/* Clickable Session Count Number */}
          <button 
            onClick={scrollToSessions}
            className="text-5xl font-serif font-bold text-gray-900 hover:text-[#88AED0] transition-colors cursor-pointer text-left focus:outline-none group/num"
          >
            {metrics.focusSessionsToday}
            <span className="ml-2 inline-block transition-transform group-hover/num:translate-x-1">
              <ChevronRight className="w-6 h-6 inline opacity-0 group-hover/num:opacity-100" style={{ color: THEME.blue }} />
            </span>
          </button>
          
          <p className="text-sm text-gray-400 font-medium font-serif italic mt-1">Focused Sessions Today</p>
          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-tighter font-bold">Maintained Peak Focus</p>
        </div>

        {/* Attendance Percentage Widget - Reimagined with UV Shadow Pop-Out */}
        <div 
          onClick={() => navigate('/student/statistics')}
          className="bg-white p-8 rounded-xl border border-white cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] group shadow-[0_10px_30px_-10px_rgba(116,183,131,0.3),0_5px_15px_-5px_rgba(136,174,208,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(116,183,131,0.4),0_15px_30px_-10px_rgba(136,174,208,0.3)]"
          title="Click to view detailed statistics"
        >
          <div className="relative w-24 h-24 mb-4 group-hover:scale-105 transition-transform">
             {/* UV Soft Glow Layer */}
             <div className="absolute inset-0 rounded-full bg-[#74B783]/5 animate-pulse"></div>
             <svg className="w-full h-full transform -rotate-90 relative z-10">
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-50" />
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={264} strokeDashoffset={264 - (264 * metrics.overallAttendance / 100)} style={{ color: THEME.green }} />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-900 font-serif z-20">
               {metrics.overallAttendance}%
             </div>
          </div>
          <p className="text-sm font-bold text-gray-900 uppercase tracking-widest relative z-10">Attendance</p>
          <span className="text-[10px] font-bold uppercase mt-1 relative z-10" style={{ color: THEME.blue }}>{metrics.attendanceStatus}</span>
        </div>

        {/* Today's Progress Widget - Matching Linear Stats Bar */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BarChart3 className="w-6 h-6" style={{ color: THEME.blue }} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ color: THEME.blue, backgroundColor: `${THEME.blue}15` }}>Progress</span>
          </div>
          <h3 className="text-5xl font-serif font-bold text-gray-900">{metrics.attendedToday} / {metrics.totalToday}</h3>
          <p className="text-sm text-gray-400 font-medium font-serif italic mt-1">Sessions Attended</p>
          <div className="mt-6 flex gap-1.5">
             {[...Array(metrics.totalToday)].map((_, i) => (
               <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500`} style={{ backgroundColor: i < metrics.attendedToday ? THEME.green : '#F3F4F6' }}></div>
             ))}
          </div>
        </div>

      </div>

      <div className="space-y-8">
        
        {/* Learning Sessions List - Now Full Width */}
        <div className="space-y-4" ref={sessionsRef}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-7 h-7" style={{ color: THEME.blue }} /> Learning Sessions
            </h2>
          </div>

          <div className="space-y-6">
            {classes.map((session) => (
              <div 
                key={session.id} 
                className={`
                  relative overflow-hidden bg-white rounded-xl border transition-all duration-300
                  ${session.status === 'LIVE' ? 'border-[#88AED0] ring-4 ring-[#88AED0]/5 shadow-md' : 'border-gray-100 hover:border-[#88AED0]/30'}
                `}
              >
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                  
                  {/* Status Indicator Circle */}
                  <div className="flex flex-col items-center justify-center min-w-[120px] text-center">
                    <div className={`
                      p-5 rounded-full mb-3 shadow-inner
                      ${session.status === 'LIVE' ? 'bg-blue-50 text-[#88AED0]' : session.status === 'COMPLETED' ? 'bg-green-50 text-[#74B783]' : 'bg-gray-50 text-gray-300'}
                    `}>
                      {session.status === 'LIVE' ? <Video className="w-10 h-10 animate-pulse" /> : session.status === 'COMPLETED' ? <CheckCircle2 className="w-10 h-10" /> : <CircleDashed className="w-10 h-10" />}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{session.time}</span>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 font-serif leading-none">{session.subject}</h3>
                      {session.status === 'LIVE' && (
                        <span className="px-3 py-1 bg-[#88AED0]/10 text-[#88AED0] text-[10px] font-bold uppercase rounded-full tracking-widest shadow-sm">
                          Active
                        </span>
                      )}
                      {session.status === 'COMPLETED' && (
                        <span className="px-3 py-1 bg-[#74B783]/10 text-[#74B783] text-[10px] font-bold uppercase rounded-full flex items-center gap-1">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 font-medium font-serif italic mb-4">{session.faculty}</p>
                    
                    {/* Focus Metrics Bar - Aligned with Statistics Progress Bars */}
                    {session.focusScore && (
                      <div className="flex items-center gap-4 bg-gray-50/50 w-full md:w-fit px-4 py-2 rounded-xl border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engagement:</span>
                        <div className="flex items-center gap-3">
                           <span className="text-sm font-bold text-gray-900">{session.focusScore}%</span>
                           <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${session.focusScore}%`, backgroundColor: session.focusScore > 85 ? THEME.green : THEME.blue }}></div>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions - Unified Elevated Buttons */}
                  <div className="w-full md:w-auto min-w-[180px]">
                    {session.status === 'LIVE' ? (
                      <button 
                        onClick={() => navigate(`/student/lecture/${session.id}`)}
                        className="btn-elevated w-full py-4 px-8 text-white rounded-xl font-bold shadow-lg shadow-[#88AED0]/20 flex items-center justify-center gap-3"
                        style={{ backgroundColor: THEME.blue }}
                      >
                        Join Class <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : session.status === 'COMPLETED' ? (
                      <button 
                        onClick={() => navigate('/student/statistics')}
                        className="btn-elevated w-full py-4 px-8 bg-white border border-[#74B783]/30 rounded-xl font-bold flex items-center justify-center gap-2 group"
                        style={{ color: THEME.green }}
                      >
                        Session Stats <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button disabled className="w-full py-4 px-8 bg-gray-50 text-gray-300 border border-gray-100 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
                        {session.status}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note - Positioned at the bottom for stability and flow */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-8 flex items-start gap-6 shadow-sm">
          <Lock className="w-8 h-8 mt-1 shrink-0" style={{ color: THEME.green }} />
          <div>
            <h4 className="font-bold text-gray-900 text-lg font-serif">Privacy & Focus</h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Jignasa's emotion tracking is anonymous and local. Your camera is used for analysis only; no video feed is recorded or stored on our servers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
