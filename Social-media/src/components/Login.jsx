import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const { login, user,error } = useAuth()
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleLogin = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await login(Email, password);
            navigate('/');
        } catch {
        } finally {
            setLoading(false);
        }
    }
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
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/70">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 text-red-400 text-sm text-center bg-red-900/30 border border-red-500/40 rounded-lg p-2">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-white placeholder-transparent peer"
                                placeholder=" "
                                required
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
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-white placeholder-transparent peer"
                                placeholder=" "
                                required
                            />
                            <label className="absolute left-5 -top-2.5 px-1 text-xs text-purple-300 bg-gradient-to-b from-indigo-900/80 to-transparent transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-300 peer-focus:bg-gradient-to-b">
                                Password
                            </label>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100"></div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full cursor-pointer py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
                        >

                            {loading ? "Logging in..." : "Continue"}
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/50 text-sm">
                            Don't have an account?
                            <Link to={'/Signup'} className="text-purple-300 hover:text-white ml-1 transition-colors duration-300">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-white/50 text-sm">

                            <Link to={'/ForgetPassword'} className="text-purple-300 hover:text-white ml-1 transition-colors duration-300">
                                Forget password
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Floating particles for extra effect */}
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

export default Login;