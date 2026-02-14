
import React, { useState } from 'react';
import { UserRole } from '../types';
import { BookOpen, UserCircle, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.STUDENT);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register States
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    onLogin(activeRole);
    if (activeRole === UserRole.STUDENT) {
        navigate('/student/dashboard');
    } else {
        navigate('/faculty/dashboard');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !regEmail || !institution || !regPassword) {
        alert("Please fill in all required fields.");
        return;
    }

    if (activeRole === UserRole.STUDENT && !rollNumber) {
        alert("Please enter your Student Roll Number.");
        return;
    }

    if (activeRole === UserRole.FACULTY && !facultyId) {
        alert("Please enter your Faculty ID.");
        return;
    }

    if (!agreedToTerms) {
        alert("You must agree to the Terms of Service and Privacy Policy.");
        return;
    }

    // In a real app, this would handle registration logic
    onLogin(activeRole);
    if (activeRole === UserRole.STUDENT) {
        navigate('/student/dashboard');
    } else {
        navigate('/faculty/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Marketing Section */}
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
             <BookOpen className="w-10 h-10 text-[#1B3B6F]" />
             <span className="text-3xl font-bold font-serif text-[#1B3B6F]">Jignasa</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1B3B6F] leading-tight">
            Emotion-aware classroom analytics for better learning
          </h1>
          <p className="text-xl text-gray-600 font-light font-serif italic">
            Empowering educators with real-time insights into student engagement and emotional well-being.
          </p>
        </div>

        {/* Auth Card */}
        <div className="modal-elevated bg-white p-8 rounded-2xl max-w-md w-full mx-auto relative z-10">
          
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8 shadow-inner">
            <button
              onClick={() => setActiveRole(UserRole.STUDENT)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                activeRole === UserRole.STUDENT
                  ? 'bg-white text-[#1B3B6F] shadow-md transform -translate-y-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setActiveRole(UserRole.FACULTY)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                activeRole === UserRole.FACULTY
                  ? 'bg-white text-[#1B3B6F] shadow-md transform -translate-y-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Faculty
            </button>
          </div>

          {!isRegistering ? (
            /* Login Form */
            <>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Welcome Back</h2>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] focus:ring-4 focus:ring-[#1B3B6F]/5 outline-none transition-all"
                    placeholder="name@university.edu"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs text-[#1B3B6F] font-bold hover:underline">Forgot?</a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] focus:ring-4 focus:ring-[#1B3B6F]/5 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-elevated w-full py-4 bg-[#2C4C88] text-white font-bold rounded-xl shadow-lg shadow-blue-900/10"
                >
                  Login to Portal
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account? <button onClick={() => setIsRegistering(true)} className="text-[#1B3B6F] font-bold hover:underline">Create an account</button>
              </div>
            </>
          ) : (
            /* Registration Form */
            <>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Create Account</h2>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none transition-all"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none transition-all"
                        placeholder="name@university.edu"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Institution</label>
                        <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none"
                            placeholder="University of Tech"
                            required
                        />
                    </div>

                    {activeRole === UserRole.STUDENT ? (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Roll Number</label>
                            <input
                                type="text"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none"
                                placeholder="Student Roll No"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Faculty ID</label>
                            <input
                                type="text"
                                value={facultyId}
                                onChange={(e) => setFacultyId(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none"
                                placeholder="Faculty ID"
                                required
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Create Password</label>
                    <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3B6F] outline-none"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input 
                        type="checkbox" 
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-[#1B3B6F] border-gray-300 rounded focus:ring-[#1B3B6F] mt-1"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                        I agree to the <a href="#" className="text-[#1B3B6F] font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-[#1B3B6F] font-bold hover:underline">Privacy Policy</a> regarding academic data.
                    </label>
                </div>

                <button
                  type="submit"
                  className="btn-elevated w-full py-4 bg-[#2C4C88] text-white font-bold rounded-xl shadow-lg shadow-blue-900/10"
                >
                  Create Academic Account
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account? <button onClick={() => setIsRegistering(false)} className="text-[#1B3B6F] font-bold hover:underline">Back to Login</button>
              </div>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Powered by Jignasa AI</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
