import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function Dashboard(){

const [stats, setStats] = useState({

    totalProducts:0,

    totalCustomers:0,

    totalSales:0,

    lowStock:0

});

const [recentSales, setRecentSales] = useState([]);

const [lowStockProducts, setLowStockProducts] = useState([]);

const [monthlySales, setMonthlySales] = useState([]);

const [topProducts, setTopProducts] = useState([]);



const fetchDashboardStats = async()=>{

    try{

        const res = await axios.get(

            "${import.meta.env.VITE_API_URL}/api/dashboard/stats"

        );

        setStats(res.data);

    }

    catch(err){

        console.log(err);

    }

};

const fetchRecentSales = async () => {

    try {

        const res = await axios.get(
            "${import.meta.env.VITE_API_URL}/api/dashboard/recent-sales"
        );

        setRecentSales(res.data);

    } catch (err) {

        console.log(err);

    }

};

const fetchLowStockProducts = async () => {

    try {

        const res = await axios.get(
            "${import.meta.env.VITE_API_URL}/api/dashboard/low-stock"
        );

        setLowStockProducts(res.data);

    } catch (err) {

        console.log(err);

    }

};

const fetchMonthlySales = async () => {

    try {

        const res = await axios.get(
            "${import.meta.env.VITE_API_URL}/api/dashboard/monthly-sales"
        );

        setMonthlySales(res.data);

    } catch (err) {

        console.log(err);

    }

};

const fetchTopProducts = async () => {

    try {

        const res = await axios.get(
            "${import.meta.env.VITE_API_URL}/api/dashboard/top-products"
        );

        setTopProducts(res.data);

    } catch (err) {

        console.log(err);

    }

};


useEffect(() => {

    fetchDashboardStats();
    fetchRecentSales();
    fetchLowStockProducts();
    fetchMonthlySales();
    fetchTopProducts();

}, []);
return(

<Layout>


<h1 className="text-3xl font-bold mb-6">
GIOMS Dashboard
</h1>


<div className="grid grid-cols-3 gap-6">


<div className="bg-white shadow p-6 rounded-xl">
<h2 className="text-gray-500">
Products
</h2>

<p className="text-3xl font-bold">
{stats.totalProducts}
</p>

</div>


<div className="bg-white shadow p-6 rounded-xl">
<h2 className="text-gray-500">
Customers
</h2>

<p className="text-3xl font-bold">
{stats.totalCustomers}
</p>

</div>



<div className="bg-white shadow p-6 rounded-xl">
<h2 className="text-gray-500">
Total Sales
</h2>

<p className="text-3xl font-bold">
Rs {stats.totalSales}
</p>

</div>

<div className="bg-white shadow p-6 rounded-xl">

<h2 className="text-gray-500">

Low Stock

</h2>

<p className="text-3xl font-bold text-red-600">

{stats.lowStock}

</p>

</div>

</div>


<div className="bg-white shadow rounded-xl p-6 mt-8">

    <h2 className="text-2xl font-bold mb-4">
        Recent Sales
    </h2>

    <table className="w-full border-collapse">

        <thead>

            <tr className="border-b">

                <th className="text-left p-3">Invoice</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Payment</th>
                <th className="text-left p-3">Date</th>

            </tr>

        </thead>

        <tbody>

            {recentSales.map((sale) => (

                <tr key={sale.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">
                        {sale.invoice_no}
                    </td>

                    <td className="p-3">
                        {sale.customer_name}
                    </td>

                    <td className="p-3">
                        Rs {sale.final_amount}
                    </td>

                    <td className="p-3">
                        {sale.payment_method}
                    </td>

                    <td className="p-3">
                        {new Date(sale.created_at).toLocaleDateString()}
                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

<div className="bg-white shadow rounded-xl p-6 mt-8">

    <h2 className="text-2xl font-bold mb-4">
        Low Stock Products
    </h2>

    <table className="w-full border-collapse">

        <thead>

            <tr className="border-b">

                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Selling Price</th>
                <th className="text-left p-3">Status</th>

            </tr>

        </thead>

        <tbody>

            {lowStockProducts.map((product) => (

                <tr key={product.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">
                        {product.name}
                    </td>

                    <td className="p-3">
                        {product.stock}
                    </td>

                    <td className="p-3">
                        Rs {product.selling_price}
                    </td>

                    <td className="p-3">

                        {product.stock <= 2 ? (

                            <span className="text-red-600 font-bold">
                                🔴 Critical
                            </span>

                        ) : (

                            <span className="text-yellow-600 font-bold">
                                🟡 Low
                            </span>

                        )}

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

<div className="bg-white shadow rounded-xl p-6 mt-8">

    <h2 className="text-2xl font-bold mb-4">
        Monthly Sales
    </h2>

    <ResponsiveContainer width="100%" height={300}>

        <LineChart data={monthlySales}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#2563eb"
                strokeWidth={3}
            />

        </LineChart>

    </ResponsiveContainer>

</div>

<div className="bg-white shadow rounded-xl p-6 mt-8">

    <h2 className="text-2xl font-bold mb-4">
        Top Selling Products
    </h2>

    <table className="w-full border-collapse">

        <thead>

            <tr className="border-b">

                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Sold Qty</th>
                <th className="text-left p-3">Revenue</th>

            </tr>

        </thead>

        <tbody>

            {topProducts.map((product) => (

                <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50"
                >

                    <td className="p-3">
                        {product.name}
                    </td>

                    <td className="p-3">
                        {product.soldQuantity}
                    </td>

                    <td className="p-3">
                        Rs {product.revenue}
                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

</Layout>

)

}


export default Dashboard;