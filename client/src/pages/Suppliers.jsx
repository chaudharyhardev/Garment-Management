import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";

function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const fetchSuppliers = async () => {

        try {

            const res = await axios.get("/suppliers");

            setSuppliers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchSuppliers();

    }, []);

    const addSupplier = async () => {

        try {

            await axios.post("/suppliers", form);

            alert("Supplier Added");

            setForm({
                name: "",
                phone: "",
                email: "",
                address: ""
            });

            fetchSuppliers();

        } catch (err) {

            alert(err.response?.data?.message || "Error");

        }

    };

    const deleteSupplier = async (id) => {

        if (!window.confirm("Delete this supplier?")) return;

        try {

            await axios.delete(`/suppliers/${id}`);

            alert("Supplier Deleted");

            fetchSuppliers();

        } catch (err) {

            alert("Delete Failed");

        }

    };

    return (

        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                Suppliers
            </h1>

            <div className="bg-white p-6 rounded-xl shadow mb-6">

                <input
                    className="border p-3 w-full mb-3 rounded"
                    placeholder="Supplier Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    className="border p-3 w-full mb-3 rounded"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                    }
                />

                <input
                    className="border p-3 w-full mb-3 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    className="border p-3 w-full mb-3 rounded"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                    }
                />

                <button
                    onClick={addSupplier}
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Add Supplier
                </button>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            suppliers.map((supplier) => (

                                <tr
                                    key={supplier.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {supplier.name}
                                    </td>

                                    <td className="p-3">
                                        {supplier.phone}
                                    </td>

                                    <td className="p-3">
                                        {supplier.email}
                                    </td>

                                    <td className="p-3">
                                        {supplier.address}
                                    </td>

                                    <td className="p-3">

                                        <button
                                            onClick={() => deleteSupplier(supplier.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

export default Suppliers;