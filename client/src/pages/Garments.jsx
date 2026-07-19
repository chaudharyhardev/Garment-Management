import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Garments(){

const [garments,setGarments] = useState([]);
const [editId,setEditId] = useState(null);


const [form,setForm] = useState({
    shop_name:"",
    owner_name:"",
    phone:"",
    address:""
});


// Get all shops

const fetchGarments = async()=>{

    try{

        const res = await axios.get(
            "http://localhost:5000/api/garments"
        );

        setGarments(res.data);

    }
    catch(err){

        console.log(err);

    }

};



useEffect(()=>{

    fetchGarments();

},[]);




// Input change

const handleChange=(e)=>{

setForm({
    ...form,
    [e.target.name]:e.target.value
});

};



// Add shop

const addShop=async(e)=>{

e.preventDefault();


try{

await axios.post(
"http://localhost:5000/api/garments",
form
);


alert("Shop Added");


setForm({
shop_name:"",
owner_name:"",
phone:"",
address:""
});


fetchGarments();


}
catch(err){

console.log(err);

}


};

const deleteShop = async(id)=>{

    const confirmDelete =
    window.confirm(
    "Delete this shop?"
    );


    if(!confirmDelete)
    return;


    try{


    await axios.delete(
    `http://localhost:5000/api/garments/${id}`
    );


    fetchGarments();


    }
    catch(err){

    console.log(err);

    }


};
const editShop=(shop)=>{


setEditId(shop.id);


setForm({

shop_name:shop.shop_name,

owner_name:shop.owner_name,

phone:shop.phone,

address:shop.address

});


};
const updateShop = async(e)=>{

    e.preventDefault();

    try{

        await axios.put(
        `http://localhost:5000/api/garments/${editId}`,
        form
        );


        alert("Shop Updated");


        setEditId(null);


        setForm({
            shop_name:"",
            owner_name:"",
            phone:"",
            address:""
        });


        fetchGarments();


    }
    catch(err){

        console.log(err);

    }

};


return(

<Layout>


<h1 className="text-3xl font-bold mb-6">
Garment Shops
</h1>



{/* FORM */}

<div className="bg-white p-6 rounded-xl shadow mb-8">


<form onSubmit={editId ? updateShop : addShop}>


<input
name="shop_name"
value={form.shop_name}
onChange={handleChange}
placeholder="Shop Name"
className="border p-3 w-full mb-3 rounded"
/>


<input
name="owner_name"
value={form.owner_name}
onChange={handleChange}
placeholder="Owner Name"
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



<button
className="bg-blue-600 text-white px-6 py-3 rounded">

Add Shop

</button>


</form>


</div>





{/* TABLE */}


<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">
All Garment Shops
</h2>


<table className="w-full">


<thead>

<tr className="border-b">

<th className="p-3 text-left">
Shop
</th>


<th className="p-3 text-left">
Owner
</th>


<th className="p-3 text-left">
Phone
</th>


<th className="p-3 text-left">
Address
</th>
<th className="p-3">
Action
</th>


</tr>

</thead>



<tbody>


{
garments.map((shop)=>(


<tr 
key={shop.id}
className="border-b">


<td className="p-3">
{shop.shop_name}
</td>


<td className="p-3">
{shop.owner_name}
</td>


<td className="p-3">
{shop.phone}
</td>


<td className="p-3">
{shop.address}
</td>
<td className="p-3 flex gap-2">


<button

onClick={()=>editShop(shop)}

className="bg-yellow-500 text-white px-3 py-1 rounded">

Edit

</button>



<button

onClick={()=>deleteShop(shop.id)}

className="bg-red-600 text-white px-3 py-1 rounded">

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

)

}


export default Garments;