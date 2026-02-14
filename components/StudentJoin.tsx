
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Video, Calendar, WifiOff, Loader, ExternalLink, AlertCircle, LogOut, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentJoinProps {
  classId?: string;
}

const StudentJoin: React.FC<StudentJoinProps> = ({ classId }) => {
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulator, setIsSimulator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Safety Check: Don't run if no classId
    if (!classId) {
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);
    setIsSimulator(false);

    // 2. Safety Timeout: Prevent infinite loading spinner if Firestore hangs
    const safetyTimeout = setTimeout(() => {
        setLoading((prev) => {
            if (prev) {
                console.warn("Firestore connection timed out. Entering Simulator Mode.");
                setIsSimulator(true);
                return false; // Force stop loading
            }
            return prev;
        });
    }, 5000); // 5 seconds max wait for demo

    // 3. Robust Listener
    let unsubscribe: () => void;

    try {
        const classRef = doc(db, "live_classes", classId);
        
        unsubscribe = onSnapshot(classRef, (docSnapshot) => {
            clearTimeout(safetyTimeout); // Connection successful
            
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const isClassLive = data.status === 'LIVE' && !!data.meetLink;
                
                setIsLive(isClassLive);
                setMeetLink(isClassLive ? data.meetLink : null);
            } else {
                setIsLive(false);
                setMeetLink(null);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore Listen Error:", err);
            clearTimeout(safetyTimeout);
            // Instead of blocking, we offer simulator mode on error
            setIsSimulator(true);
            setLoading(false);
        });

    } catch (err) {
        console.error("Firestore Setup Error:", err);
        clearTimeout(safetyTimeout);
        setIsSimulator(true);
        setLoading(false);
        unsubscribe = () => {};
    }

    // 4. Cleanup Function
    return () => {
        clearTimeout(safetyTimeout);
        if (unsubscribe) unsubscribe();
    };
  }, [classId]);

  // Function to handle "Manual Override" for demo purposes
  const enterDemoSession = () => {
      setIsLive(true);
      setMeetLink("https://meet.google.com/new");
  };

  if (loading) {
      return (
          <div className="w-full py-6 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin text-[#1B3B6F]" />
              <p className="text-xs text-gray-500 font-medium">Syncing class status...</p>
          </div>
      );
  }

  // If in Simulator mode (e.g. Firebase error/timeout)
  if (isSimulator && !isLive) {
      return (
        <div className="w-full bg-amber-50 border border-amber-200 p-6 rounded-xl text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                 <Terminal className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-amber-800 tracking-tight">Simulator Mode</h3>
            <p className="text-xs text-amber-700 mt-1 max-w-xs">
                Classroom sync is unavailable. You can proceed with a demo session for evaluation.
            </p>
            
            <div className="mt-6 flex flex-col w-full gap-2">
                <button
                    onClick={enterDemoSession}
                    className="w-full py-3 bg-[#74B783] hover:bg-[#63a071] text-white rounded-xl font-bold shadow-sm transition-all"
                >
                    Start Demo Session
                </button>
                <button
                    onClick={() => navigate('/student/dashboard')}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-500 hover:text-gray-700 rounded-xl font-bold text-sm transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
      );
  }

  if (isLive && meetLink) {
    return (
        <div className="w-full animate-in fade-in zoom-in duration-300">
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Video className="w-24 h-24 text-green-700" />
                </div>
                
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-bold mb-4 animate-pulse">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span> LIVE NOW
                </span>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Class has started!</h3>
                <p className="text-sm text-gray-600 mb-6">The professor is waiting in the Google Meet room.</p>
                
                <a
                    href={meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-[#2C4C88] hover:bg-[#1B3B6F] text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                    <div className="p-1 bg-white rounded-full">
                        <img src="https://www.gstatic.com/meet/google_meet_primary_horizontal_2020q4_865efcdb92d67c50402b8b90740954b3.svg" className="w-4 h-4" alt="GMeet" /> 
                    </div>
                    Join Google Meet
                    <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
                <p className="text-[10px] text-gray-500 mt-3">Link opens in a new tab.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 border border-gray-100 p-6 rounded-xl text-center flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
             <Calendar className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-500 tracking-tight">Waiting for class to start...</h3>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">The join button will appear here automatically once the professor goes live.</p>
        
        <button
            onClick={() => navigate('/student/dashboard')}
            className="mt-6 w-full py-3 bg-[#2C4C88] hover:bg-[#1B3B6F] text-white rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
            <LogOut className="w-4 h-4" />
            Leave Session
        </button>
    </div>
  );
};

export default StudentJoin;
