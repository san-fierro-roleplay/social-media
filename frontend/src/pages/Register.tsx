import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        display_name: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        gender: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "username" || name === "email") {
            newValue = value.toLowerCase();
        }
        setForm({ ...form, [name]: newValue });
    };

    const handleGenderSelect = (gender: string) => {
        setForm({ ...form, gender });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/register', form);
            localStorage.setItem("token", response.data.token);
            navigate('/');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            setMessage(errorMessage);
        }
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        { name: "January", value: "01" },
        { name: "February", value: "02" },
        { name: "March", value: "03" },
        { name: "April", value: "04" },
        { name: "May", value: "05" },
        { name: "June", value: "06" },
        { name: "July", value: "07" },
        { name: "August", value: "08" },
        { name: "September", value: "09" },
        { name: "October", value: "10" },
        { name: "November", value: "11" },
        { name: "December", value: "12" }
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="flex flex-col items-center mb-8">
                <span className="text-5xl font-extrabold text-blue-600 font-sans mb-2">MyFierro</span>
                <span className="text-xl text-gray-700 font-medium">Create a new account to connect with friends on MyFierro.</span>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-blue-200"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create New Account</h2>
                {message && (
                    <p className="text-center text-sm text-red-600 mb-4">{message}</p>
                )}
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Email address"
                        required
                        style={{ textTransform: 'lowercase' }}
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Username"
                        required
                        style={{ textTransform: 'lowercase' }}
                    />
                    <input
                        type="text"
                        name="display_name"
                        value={form.display_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
                        placeholder="Display Name"
                        required
                    />
                    <div className="flex gap-2">
                        <select
                            name="birth_day"
                            value={form.birth_day}
                            onChange={handleChange}
                            className="flex-1 border p-2 rounded bg-blue-50 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Day</option>
                            {days.map(day => (
                                <option key={day} value={String(day).padStart(2, '0')}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <select
                            name="birth_month"
                            value={form.birth_month}
                            onChange={handleChange}
                            className="flex-1 border p-2 rounded bg-blue-50 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Month</option>
                            {months.map(month => (
                                <option key={month.value} value={month.value}>
                                    {month.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name="birth_year"
                            value={form.birth_year}
                            onChange={handleChange}
                            className="flex-1 border p-2 rounded bg-blue-50 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        {["Male", "Female", "Others"].map((g) => (
                            <button
                                type="button"
                                key={g}
                                className={`flex-1 border p-2 rounded ${form.gender === g ? "bg-blue-600 text-white" : "bg-blue-50"} border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                onClick={() => handleGenderSelect(g)}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded text-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="text-center text-sm mt-6">
                    <span className="text-gray-700">Already have an account?</span>{' '}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Log in to MyFierro
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;