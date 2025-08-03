import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

const account = new Account(client);



const SignUp = () => {
    const { register,user } = useAuth();
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnText, setBtnText] = useState('Sign Up');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    console.log(user);

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    const handleSignUp = async () => {
        if (!Email.trim()) {
            setError('Email is required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setBtnText('Try Again');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            setIsLoading(true);
            setBtnText('Creating Account...');

            await register(Email, password);
            navigate('/');

        } catch (err) {
            setError('Signup failed. Please try again.');
            setBtnText('Sign Up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl shadow-purple-900/30 border border-white/20 transform transition-all duration-700 hover:scale-[1.02]"
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(192, 132, 252, 0.4)'
                    }}
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
                        <p className="text-white/70">Register your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                value={Email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-white placeholder-transparent peer"
                                placeholder=" "
                            />
                            <label className="absolute left-5 -top-2.5 px-1 text-xs text-purple-300 bg-gradient-to-b from-indigo-900/80 to-transparent transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-300 peer-focus:bg-gradient-to-b">
                                Email
                            </label>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100"></div>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-white placeholder-transparent peer"
                                placeholder=" "
                                required
                            />
                            <label className="absolute left-5 -top-2.5 px-1 text-xs text-purple-300 bg-gradient-to-b from-indigo-900/80 to-transparent transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-300 peer-focus:bg-gradient-to-b">
                                Password
                            </label>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100"></div>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-white placeholder-transparent peer"
                                placeholder=" "
                                required
                            />
                            <label className="absolute left-5 -top-2.5 px-1 text-xs text-purple-300 bg-gradient-to-b from-indigo-900/80 to-transparent transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-300 peer-focus:bg-gradient-to-b">
                                Confirm Password
                            </label>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100"></div>
                        </div>

                        <button
                            onClick={handleSignUp}
                            disabled={isLoading}
                            className={`w-full py-3.5 px-6 rounded-lg text-white font-medium text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 ${isLoading
                                ? 'bg-purple-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/30'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {btnText}
                                </>
                            ) : (
                                btnText
                            )}
                        </button>
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SignUp;