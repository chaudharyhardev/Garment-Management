import {useEffect,useState} from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Deliveries(){


const [deliveries,setDeliveries]=useState([]);
const [staff, setStaff] = useState([]);



const fetchDeliveries=async()=>{

const res=await axios.get(
"${import.meta.env.VITE_API_URL}/api/deliveries"
);

setDeliveries(res.data);

};
const fetchStaff = async () => {

    const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/delivery-staff"
    );

    setStaff(res.data);

};



useEffect(() => {

    fetchDeliveries();
    fetchStaff();

}, []);



const updateStatus=async(id,status)=>{


await axios.put(

`${import.meta.env.VITE_API_URL}/api/deliveries/${id}/status`,

{
status
}

);


fetchDeliveries();


};

const updatePerson = async(id, delivery_person)=>{

    if(!delivery_person) return;

    await axios.put(

        `${import.meta.env.VITE_API_URL}/api/deliveries/${id}/person`,

        {
            delivery_person
        }

    );

    fetchDeliveries();

};

return(

<Layout>


<h1 className="text-3xl font-bold mb-6">

🚚 Deliveries

</h1>


<div className="bg-white p-6 rounded-xl shadow">


<table className="w-full">


<thead>

<tr className="border-b">

<th>
Invoice
</th>

<th>
Customer
</th>

<th>
Phone
</th>

<th>
Address
</th>

<th>
Delivery Person
</th>

<th>
Status
</th>

<th>
Action
</th>

</tr>

</thead>


<tbody>


{

deliveries.map(delivery=>(


<tr key={delivery.id} className="border-b">


<td>
{delivery.invoice_no}
</td>


<td>
{delivery.customer_name}
</td>


<td>
{delivery.phone}
</td>


<td>
{delivery.delivery_address}
</td>

<td>

{delivery.delivery_person || "Not Assigned"}

</td>
<td>
{delivery.status}
</td>


<td>

<select

value={delivery.status}

onChange={(e)=>
updateStatus(
delivery.id,
e.target.value
)
}

className="border p-2 rounded mb-2"

>

<option>Pending</option>
<option>Confirmed</option>
<option>Packed</option>
<option>Out for Delivery</option>
<option>Delivered</option>

</select>

<br />

<select

value={delivery.delivery_person || ""}

onChange={(e)=>
updatePerson(
delivery.id,
e.target.value
)
}

className="border p-2 rounded"

>

<option value="">
Select Staff
</option>

{

staff.map(person=>(

<option
key={person.id}
value={person.name}
>

{person.name}

</option>

))

}

</select>

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


export default Deliveries;