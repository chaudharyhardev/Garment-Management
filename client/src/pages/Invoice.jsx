import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Invoice(){


const {id}=useParams();


const [invoice,setInvoice]=useState(null);



const fetchInvoice=async()=>{


const res = await axios.get(

`http://localhost:5000/api/sales/invoice/${id}`

);


setInvoice(res.data);


};



useEffect(()=>{

fetchInvoice();

},[]);



if(!invoice){

return <h2>Loading...</h2>

}

const printInvoice = ()=>{

window.print();

};

return(

<Layout>

<div className="invoice-print bg-white p-8 shadow rounded-xl">

<div className="bg-white p-8 shadow rounded-xl">
<button

onClick={printInvoice}

className="bg-blue-600 text-white px-5 py-2 rounded mb-5 print:hidden"

>

Print Invoice

</button>


<h1 className="text-3xl font-bold text-center">

GIOMS GARMENTS

</h1>


<p className="text-center">

Garment Inventory & Billing System

</p>


<p className="text-center">

Kathmandu, Nepal

</p>


<p className="text-center">

Phone: 98XXXXXXXX

</p>


<hr className="my-4"/>



<div>

<h2>

Invoice No:

{invoice.sale.invoice_no}

</h2>


<p>

Customer:

{invoice.sale.customer_name}

</p>


<p>

Phone:

{invoice.sale.customer_phone}

</p>
<p>

Address:

{invoice.sale.customer_address}

</p>


</div>



<table className="w-full mt-6 border">


<thead>

<tr className="border-b bg-gray-100">

<th className="border p-3">
Product
</th>

<th className="border p-3">
Qty
</th>

<th className="border p-3">
Price
</th>

<th className="border p-3">
Subtotal
</th>

</tr>

</thead>



<tbody>


{

invoice.items.map(item=>(


<tr key={item.id}>


<td className="border p-3">
{item.product_name}
</td>


<td className="border p-3">
{item.quantity}
</td>


<td className="border p-3">
Rs {item.price}
</td>


<td className="border p-3">
Rs {item.subtotal}
</td>


</tr>


))


}


</tbody>


</table>



<div className="mt-6 text-right">


<p>

Total:

Rs {invoice.sale.total_amount}

</p>


<p>

Discount:

Rs {invoice.sale.discount}

</p>


<h2 className="text-xl font-bold">

Final:

Rs {invoice.sale.final_amount}

</h2>


<p>

Payment:

{invoice.sale.payment_method}

</p>


</div>



</div>

</div>
</Layout>

);


}


export default Invoice;