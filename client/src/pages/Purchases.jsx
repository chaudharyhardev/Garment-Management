import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Purchases(){

    const [shop,setShop] = useState("");

    const [products,setProducts] = useState([]);

    const [shops,setShops] = useState([]);

    const [items,setItems] = useState([]);


    useEffect(()=>{

    fetchShops();
    fetchProducts();

},[]);



   const fetchShops = async()=>{

    const res = await axios.get("/garments");

    setShops(res.data);

};


    const fetchProducts = async()=>{

        const res = await axios.get("/products");

        setProducts(res.data);

    };



    const addItem = ()=>{

        setItems([

            ...items,

            {
                product_id:"",
                quantity:1,
                cost_price:0
            }

        ]);

    };



    const updateItem=(index,field,value)=>{

        const updated=[...items];

        updated[index][field]=value;

        setItems(updated);

    };



    const submitPurchase = async()=>{


        try{


           await axios.post("/purchases",{

    shop_id:shop,

    products:items

});


            alert("Purchase Created");


            setItems([]);


        }catch(err){

    console.log(err.response?.data || err.message);

    alert(
        err.response?.data?.message ||
        err.message
    );

}


    };



return(

<Layout>


<h1 className="text-3xl font-bold mb-6">
Purchase Management
</h1>


<div className="bg-white p-6 rounded-xl shadow">


<label>
Garment Shop
</label>


<select

className="border p-3 w-full mb-5"

value={shop}

onChange={(e)=>setShop(e.target.value)}

>


<option>
Select Supplier
</option>


{
shops.map(s=>(

<option key={s.id} value={s.id}>

{s.shop_name}

</option>

))
}


</select>



<button

onClick={addItem}

className="bg-blue-600 text-white px-4 py-2 rounded mb-5"

>

Add Product

</button>



{
items.map((item,index)=>(


<div
key={index}
className="flex gap-3 mb-3"
>


<select

className="border p-2 flex-1"

value={item.product_id}

onChange={(e)=>
updateItem(
index,
"product_id",
Number(e.target.value)
)}

>

<option>
Select Product
</option>


{
products.map(p=>(

<option key={p.id} value={p.id}>

{p.name}

</option>

))
}


</select>



<input

className="border p-2 w-32"

type="number"

placeholder="Qty"

value={item.quantity}

onChange={(e)=>
updateItem(
index,
"quantity",
Number(e.target.value)
)}

 />



<input

className="border p-2 w-32"

type="number"

placeholder="Cost"

value={item.cost_price}

onChange={(e)=>
updateItem(
index,
"cost_price",
Number(e.target.value)
)}

 />


</div>


))

}



<button

onClick={submitPurchase}

className="bg-green-600 text-white px-5 py-2 rounded"

>

Create Purchase

</button>



</div>


</Layout>

)


}


export default Purchases;