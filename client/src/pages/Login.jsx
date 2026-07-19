import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const login = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            alert(
                err.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    GIOMS Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-3 rounded mb-4"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-3 rounded mb-4"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                />

                <button
                    onClick={login}
                    className="bg-blue-600 text-white w-full p-3 rounded"
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;