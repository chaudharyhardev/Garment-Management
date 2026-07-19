import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Customers(){


const [customers,setCustomers]=useState([]);
const [editId,setEditId]=useState(null);


const [form,setForm]=useState({

name:"",
phone:"",
address:""

});



// Get Customers

const fetchCustomers=async()=>{

const res = await axios.get(
"/customers"
);

setCustomers(res.data);

};



useEffect(()=>{

fetchCustomers();

},[]);




// Input change

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const editCustomer = (customer) => {

    setEditId(customer.id);


    setForm({

        name: customer.name,

        phone: customer.phone,

        address: customer.address

    });

};

const deleteCustomer = async(id)=>{

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this customer?"
    );


    if(!confirmDelete){
        return;
    }


    try{

        await axios.delete(

            `/customers/${id}`

        );


        alert("Customer Deleted");


        fetchCustomers();


    }
    catch(err){

        console.log(err);

    }

};

// Add Customer

const addCustomer=async(e)=>{

e.preventDefault();


try{


if(editId){

// Update Customer

await axios.put(

`/customers/${editId}`,

form

);


alert("Customer Updated");


setEditId(null);


}

else{

// Add Customer

await axios.post(

"/customers",

form

);


alert("Customer Added");

}



setForm({

name:"",
phone:"",
address:""

});


fetchCustomers();



}
catch(err){

console.log(err);

}


};


return(

<Layout>


<h1 className="text-3xl font-bold mb-6">
Customers
</h1>



<form 
onSubmit={addCustomer}
className="bg-white p-6 rounded-xl shadow mb-8"
>


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Customer Name"

className="border p-3 w-full mb-3 rounded"

/>



<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

className="border p-3 w-full mb-3 rounded"

/>



<input

name="address"

value={form.address}

onChange={handleChange}

placeholder="Address"

className="border p-3 w-full mb-3 rounded"

/>



<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

{

editId
?
"Update Customer"
:
"Add Customer"

}

</button>


</form>





<table className="w-full bg-white shadow rounded-xl overflow-hidden">


<thead>

<tr>

<th className="p-3">
Name
</th>

<th>
Phone
</th>

<th>
Address
</th>
<th>
Action
</th>


</tr>

</thead>



<tbody>

{

customers.map(customer=>(


<tr key={customer.id}
className="border">


<td className="p-3">
{customer.name}
</td>


<td>
{customer.phone}
</td>


<td>
{customer.address}
</td>
<td className="p-3">


<button

onClick={()=>editCustomer(customer)}

className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"

>

Edit

</button>



<button

onClick={()=>deleteCustomer(customer.id)}

className="bg-red-600 text-white px-4 py-2 rounded mr-2"

>

Delete

</button>



<button

onClick={()=>
window.location.href=
`/customers/${customer.id}/history`
}

className="bg-green-600 text-white px-4 py-2 rounded"

>

History

</button>


</td>


</tr>


))

}


</tbody>


</table>


</Layout>


);


}


export default Customers;