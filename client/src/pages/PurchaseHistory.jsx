import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";


function PurchaseHistory(){

    const [purchases,setPurchases] = useState([]);


    useEffect(()=>{

        fetchPurchases();

    },[]);



    const fetchPurchases = async()=>{

        try{

            const res = await axios.get("/purchases");

            setPurchases(res.data);

        }
        catch(err){

            console.log(err);

        }

    };



return(

<Layout>

<h1 className="text-3xl font-bold mb-6">
Purchase History
</h1>


<div className="bg-white shadow rounded-xl p-5">


<table className="w-full">


<thead>

<tr className="border-b">

<th className="p-3 text-left">
Invoice
</th>

<th className="p-3 text-left">
Garment Shop
</th>

<th className="p-3 text-left">
Amount
</th>

<th className="p-3 text-left">
Date
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>


{
purchases.map((p)=>(

<tr 
key={p.id}
className="border-b"
>


<td className="p-3">
{p.purchase_no}
</td>


<td className="p-3">
{p.shop_name}
</td>


<td className="p-3">
Rs {p.total_amount}
</td>


<td className="p-3">
{p.created_at}
</td>


<td>

<Link

to={`/purchase/${p.id}`}

className="text-blue-600"

>

View

</Link>

</td>


</tr>

))

}


</tbody>


</table>


</div>


</Layout>

)

}


export default PurchaseHistory;