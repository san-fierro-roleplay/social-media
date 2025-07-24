import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface TokenPayload {
    id: number;
    username: string;
    display_name: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                jwtDecode<TokenPayload>(token);
                navigate("/");
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            const decoded: TokenPayload = jwtDecode(token);
            setMessage(`Welcome back, ${decoded.display_name}!`);
            setTimeout(() => navigate("/"), 1200);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Login failed. Try again.";
            setMessage(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="flex flex-col items-center mb-8">
                <span className="text-5xl font-extrabold text-blue-600 font-sans mb-2">MyFierro</span>
                <span className="text-xl text-gray-700 font-medium">Connect with friends and the world around you on MyFierro.</span>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-blue-200"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Log In to MyFierro</h2>
                {message && (
                    <p className="text-center text-sm text-red-600 mb-4">{message}</p>
                )}
                <div className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Email address"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Password"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded text-lg hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>
                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center text-sm text-blue-700">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                    </div>
                </div>
                <div className="text-center text-sm mt-6">
                    <span className="text-gray-700">Don’t have an account?</span>{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        Create new account
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;