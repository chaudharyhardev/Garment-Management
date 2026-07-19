import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function CustomerHistory(){


const {id}=useParams();

const [history,setHistory]=useState([]);



useEffect(()=>{

fetchHistory();

},[]);



const fetchHistory=async()=>{


const res = await axios.get(
`/customers/${id}/history`
);


setHistory(res.data);


};



const total = history.reduce(
(sum,item)=>sum+item.final_amount,
0
);



return(

<Layout>


<h1 className="text-3xl font-bold mb-6">

Customer Purchase History

</h1>



<div className="bg-white p-6 rounded shadow">


<table className="w-full">


<thead>

<tr className="border-b">

<th>Invoice</th>

<th>Amount</th>

<th>Payment</th>

<th>Date</th>

</tr>

</thead>


<tbody>


{
history.map(item=>(

<tr
key={item.id}
className="border-b"
>

<td>
{item.invoice_no}
</td>


<td>
Rs {item.final_amount}
</td>


<td>
{item.payment_method}
</td>


<td>
{item.created_at}
</td>


</tr>


))
}


</tbody>


</table>



<h2 className="text-xl font-bold mt-5">

Total Purchase:

Rs {total}

</h2>


</div>


</Layout>

)

}


export default CustomerHistory;