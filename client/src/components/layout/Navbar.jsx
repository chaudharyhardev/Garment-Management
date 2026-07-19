import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h2 className="text-xl font-semibold">
                GIOMS Dashboard
            </h2>

            <div className="flex items-center gap-4">

                <div className="text-gray-700 font-medium">

                    {user ? `${user.name} (${user.role})` : "Guest"}

                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;