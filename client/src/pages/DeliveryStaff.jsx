import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";

function DeliveryStaff() {

const [staff, setStaff] = useState([]);
const [editId, setEditId] = useState(null);

const [form, setForm] = useState({

name: "",
phone: "",
address: "",
delivery_area: "",
vehicle_type: "",
status: "Active"

});

// ==========================
// Fetch Staff
// ==========================

const fetchStaff = async () => {

const res = await axios.get(
"http://localhost:5000/api/delivery-staff"
);

setStaff(res.data);

};

useEffect(() => {

fetchStaff();

}, []);

// ==========================
// Input Change
// ==========================

const handleChange = (e) => {

setForm({

...form,
[e.target.name]: e.target.value

});

};

// ==========================
// Save
// ==========================

const saveStaff = async (e) => {

e.preventDefault();

try{

if(editId){

await axios.put(

`http://localhost:5000/api/delivery-staff/${editId}`,

form

);

alert("Delivery Staff Updated");

setEditId(null);

}else{

await axios.post(

"http://localhost:5000/api/delivery-staff",

form

);

alert("Delivery Staff Added");

}

setForm({

name:"",
phone:"",
address:"",
delivery_area:"",
vehicle_type:"",
status:"Active"

});

fetchStaff();

}catch(err){

console.log(err);

}

};

// ==========================
// Edit
// ==========================

const editStaff = (item)=>{

setEditId(item.id);

setForm({

name:item.name,
phone:item.phone,
address:item.address,
delivery_area:item.delivery_area,
vehicle_type:item.vehicle_type,
status:item.status

});

};

// ==========================
// Delete
// ==========================

const deleteStaff = async(id)=>{

if(!window.confirm("Delete this staff member?")) return;

await axios.delete(

`http://localhost:5000/api/delivery-staff/${id}`

);

fetchStaff();

};

return(

<Layout>

<h1 className="text-3xl font-bold mb-6">

🛵 Delivery Staff

</h1>

<form

onSubmit={saveStaff}

className="bg-white p-6 rounded-xl shadow mb-8"

>

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Staff Name"
className="border p-3 w-full mb-3 rounded"
/>

<input
name="phone"
value={form.phone}
onChange={handleChange}
placeholder="Phone"
className="border p-3 w-full mb-3 rounded"
/>

<input
name="address"
value={form.address}
onChange={handleChange}
placeholder="Address"
className="border p-3 w-full mb-3 rounded"
/>

<input
name="delivery_area"
value={form.delivery_area}
onChange={handleChange}
placeholder="Delivery Area"
className="border p-3 w-full mb-3 rounded"
/>

<input
name="vehicle_type"
value={form.vehicle_type}
onChange={handleChange}
placeholder="Vehicle Type"
className="border p-3 w-full mb-3 rounded"
/>

<select

name="status"

value={form.status}

onChange={handleChange}

className="border p-3 w-full mb-3 rounded"

>

<option>Active</option>
<option>Inactive</option>
<option>On Leave</option>

</select>

<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

{editId ? "Update Staff" : "Add Staff"}

</button>

</form>

<div className="bg-white p-6 rounded-xl shadow">

<table className="w-full">

<thead>

<tr className="border-b">

<th>Name</th>
<th>Phone</th>
<th>Area</th>
<th>Vehicle</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

staff.map(item=>(

<tr key={item.id} className="border-b">

<td>{item.name}</td>

<td>{item.phone}</td>

<td>{item.delivery_area}</td>

<td>{item.vehicle_type}</td>

<td>{item.status}</td>

<td>

<button

onClick={()=>editStaff(item)}

className="bg-yellow-500 text-white px-3 py-2 rounded mr-2"

>

Edit

</button>

<button

onClick={()=>deleteStaff(item.id)}

className="bg-red-600 text-white px-3 py-2 rounded"

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

export default DeliveryStaff;