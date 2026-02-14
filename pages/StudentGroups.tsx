
import React, { useState, useEffect } from 'react';
import { Plus, Search, Users, Network, Terminal, Cpu, BookOpen, X, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Group {
  group_id: number;
  group_name: string;
  faculty_name: string;
  total_students: number;
  icon?: any; // For UI mapping
}

const StudentGroups: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  // Notification State
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Fetch Groups on Mount
  useEffect(() => {
    fetchGroups();
  }, []);

  // Search Filter Effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
        setFilteredGroups(groups);
    } else {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = groups.filter(group => 
            group.group_name.toLowerCase().includes(lowerQuery) || 
            group.faculty_name.toLowerCase().includes(lowerQuery)
        );
        setFilteredGroups(filtered);
    }
  }, [searchQuery, groups]);

  const getMockGroups = (): Group[] => [
    {
      group_id: 1,
      group_name: "Data Structures",
      faculty_name: "Prof. Amitabh Sharma",
      total_students: 128
    },
    {
      group_id: 2,
      group_name: "Algorithms",
      faculty_name: "Dr. Sarah Jenkins",
      total_students: 94
    },
    {
      group_id: 3,
      group_name: "Computer Networks",
      faculty_name: "Prof. Rajesh Kumar",
      total_students: 110
    },
    {
      group_id: 4,
      group_name: "Operating Systems",
      faculty_name: "Dr. Emily Watson",
      total_students: 76
    }
  ];

  const fetchGroups = async () => {
    setLoading(true);
    try {
        const response = await fetch('/api/student/enrolled-groups/1');
        if (response.ok) {
            const data = await response.json();
            setGroups(data);
            setFilteredGroups(data);
        } else {
            console.warn("Backend unavailable, using mock data.");
            const mocks = getMockGroups();
            setGroups(mocks); 
            setFilteredGroups(mocks);
        }
    } catch (error) {
        console.warn("Fetch error, defaulting to mock data:", error);
        const mocks = getMockGroups();
        setGroups(mocks); 
        setFilteredGroups(mocks);
    } finally {
        setLoading(false);
    }
  };

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;

    setIsJoining(true);
    setNotification(null);

    try {
        const response = await fetch('/api/groups/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_id: 1, // Hardcoded for demo
                class_code: joinCode
            })
        });

        const data = await response.json();

        if (response.ok) {
            setNotification({ type: 'success', message: 'Successfully joined the class!' });
            setShowJoinModal(false);
            setJoinCode('');
            fetchGroups(); // Refresh list
        } else {
            setNotification({ type: 'error', message: data.message || 'Failed to join class. Check the code.' });
        }
    } catch (error) {
        if (joinCode === 'JIG-TEST') {
            setNotification({ type: 'success', message: 'Successfully joined (Demo Mode)!' });
            setShowJoinModal(false);
            setJoinCode('');
            fetchGroups();
        } else {
            setNotification({ type: 'error', message: 'Network error. Please try again or use JIG-TEST.' });
        }
    } finally {
        setIsJoining(false);
        setTimeout(() => setNotification(null), 3000);
    }
  };

  const getIcon = (index: number) => {
      const icons = [Network, Terminal, Users, Cpu, BookOpen];
      const IconComp = icons[index % icons.length];
      return <IconComp className="w-6 h-6" />;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-8 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2 animate-in slide-in-from-right duration-300 ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Enrolled Classes</h1>
          <p className="text-gray-500 font-serif italic">Manage your academic circles and collaborative spaces.</p>
        </div>
        <button 
            onClick={() => { setShowJoinModal(true); setNotification(null); }}
            className="btn-elevated px-6 py-3 bg-[#2C4C88] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/10"
        >
          <Plus className="w-5 h-5" />
          Join New Class
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 w-full md:w-96 transition-all focus-within:ring-4 focus-within:ring-[#1B3B6F]/5 focus-within:border-[#1B3B6F]/20">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by class name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent font-medium"
        />
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader className="w-8 h-8 animate-spin mb-4 text-[#1B3B6F]" />
            <p className="font-serif italic">Loading your classes...</p>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto italic">
                {searchQuery ? `No matches found for "${searchQuery}".` : "You haven't joined any classes yet."}
            </p>
            {!searchQuery && (
                <button 
                    onClick={() => setShowJoinModal(true)}
                    className="text-[#1B3B6F] font-bold hover:underline"
                >
                    Join a Class Now
                </button>
            )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredGroups.map((group, idx) => (
            <div key={group.group_id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-blue-50 text-[#1B3B6F] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1B3B6F] group-hover:text-white transition-colors">
                    {getIcon(idx)}
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-1 line-clamp-1" title={group.group_name}>{group.group_name}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-1">{group.faculty_name}</p>
                <div className="mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
                        <Users className="w-4 h-4" />
                        {group.total_students} Students
                    </div>
                    <button 
                        onClick={() => navigate(`/student/group/${group.group_id}`)}
                        className="btn-elevated w-full py-3 bg-[#2C4C88] text-white rounded-xl text-sm font-bold shadow-md"
                    >
                        View Class Details
                    </button>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="modal-elevated bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-serif font-bold text-gray-900">Join New Class</h2>
                    <button 
                        onClick={() => setShowJoinModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleJoinClass} className="p-8 space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unique Class Code</label>
                        <input 
                            type="text" 
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            placeholder="e.g. JIG-8820-B"
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none text-gray-700 bg-gray-50 focus:bg-white transition-colors uppercase font-mono tracking-widest text-center text-xl font-bold focus:ring-4 focus:ring-[#1B3B6F]/5"
                            autoFocus
                        />
                        <p className="mt-4 text-xs text-gray-400 italic text-center">Enter the unique code provided by your professor.</p>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={() => setShowJoinModal(false)}
                            className="flex-1 px-4 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isJoining || !joinCode}
                            className="btn-elevated flex-1 px-4 py-4 bg-[#2C4C88] text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isJoining ? 'Joining...' : 'Enroll Now'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="absolute inset-0 -z-10" onClick={() => setShowJoinModal(false)}></div>
        </div>
      )}

    </div>
  );
};

export default StudentGroups;
