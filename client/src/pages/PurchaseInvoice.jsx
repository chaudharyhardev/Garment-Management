import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function PurchaseInvoice(){

    const {id}=useParams();

    const [purchase,setPurchase]=useState({});
    const [items,setItems]=useState([]);



    useEffect(()=>{

        fetchDetails();

    },[]);



    const fetchDetails=async()=>{

        try{

            const res = await axios.get(
                `/purchases/${id}`
            );

            setPurchase(res.data.purchase);
            setItems(res.data.items);

        }
        catch(err){

            console.log(err);

        }

    };

const printInvoice = () => {
    window.print();
};

return(

<Layout>
<div className="invoice-print">

<h1 className="text-3xl font-bold mb-6">
Purchase Invoice
</h1>
<div className="bg-gray-100 p-5 rounded-lg mb-6">

<h2 className="text-2xl font-bold">
{purchase.shop_name}
</h2>


<p>
Owner: {purchase.owner_name}
</p>


<p>
Phone: {purchase.phone}
</p>


<p>
Address: {purchase.address}
</p>


<p>
Invoice No: {purchase.purchase_no}
</p>


<p>
Date: {purchase.created_at}
</p>


</div>
<button

onClick={printInvoice}

className="print:hidden bg-blue-600 text-white px-5 py-2 rounded mb-5"

>

Print Invoice

</button>


<div className="bg-white shadow rounded-xl p-6">


<table className="w-full">


<thead>

<tr className="border-b">


<th className="p-3 text-left">
Product
</th>


<th className="p-3">
Quantity
</th>


<th className="p-3">
Cost Price
</th>


<th className="p-3">
Subtotal
</th>


</tr>

</thead>



<tbody>


{
items.map(item=>(

<tr
key={item.id}
className="border-b"
>


<td className="p-3">
{item.product_name}
</td>


<td className="p-3 text-center">
{item.quantity}
</td>


<td className="p-3 text-center">
Rs {item.cost_price}
</td>


<td className="p-3 text-center">
Rs {item.subtotal}
</td>


</tr>


))

}


</tbody>


</table>


</div>

</div>
</Layout>

)


}


export default PurchaseInvoice;