import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";


function Sales(){


const [customers,setCustomers] = useState([]);



const [products,setProducts]=useState([]);
const [sales,setSales]=useState([]);


const [form,setForm]=useState({

customer_id:"",
product_id:"",
quantity:1,
price:0,
discount:0,
payment_method:"Cash"

});



// Fetch Customers

const fetchCustomers=async()=>{

const res=await axios.get(
"${import.meta.env.VITE_API_URL}/api/customers"
);

setCustomers(res.data);

};



// Fetch Products

const fetchProducts=async()=>{

const res=await axios.get(
"${import.meta.env.VITE_API_URL}/api/products"
);

setProducts(res.data);

};

const fetchSales=async()=>{

const res=await axios.get(

"${import.meta.env.VITE_API_URL}/api/sales"

);

setSales(res.data);

};



useEffect(()=>{

fetchCustomers();

fetchProducts();

fetchSales();

},[]);

const createSale = async()=>{


try{


const response = await axios.post(

"${import.meta.env.VITE_API_URL}/api/sales",

{

customer_id: form.customer_id,


products:[

{

product_id: form.product_id,

quantity: Number(form.quantity),

price: Number(form.price)

}

],


discount: Number(form.discount),


payment_method: form.payment_method


}

);



alert(response.data.message);



setForm({

customer_id:"",

product_id:"",

quantity:1,

price:0,

discount:0,

payment_method:"Cash"

});



fetchProducts();

fetchSales();


}

catch(err){

console.log(err);

alert("Sale Failed");

}


};

return(

<Layout>


<h1 className="text-3xl font-bold">

Sales

</h1>
<div className="bg-white p-6 rounded-xl shadow mt-6">


<select

className="border p-3 w-full mb-3 rounded"

value={form.customer_id}

onChange={(e)=>

setForm({

...form,

customer_id:e.target.value

})

}

>

<option value="">

Select Customer

</option>


{

customers.map(customer=>(


<option

key={customer.id}

value={customer.id}

>

{customer.name}

</option>


))

}


</select>



<select

className="border p-3 w-full mb-3 rounded"

value={form.product_id}

onChange={(e)=>{


const product = products.find(

p=>p.id==e.target.value

);


setForm({

...form,

product_id:e.target.value,

price:Number(product.selling_price)

});


}}

>

<option value="">

Select Product

</option>


{

products.map(product=>(


<option

key={product.id}

value={product.id}

>

{product.name} (Stock: {product.stock})

</option>


))

}


</select>



<input

type="number"

placeholder="Quantity"

value={form.quantity}

onChange={(e)=>

setForm({

...form,

quantity:e.target.value

})

}

className="border p-3 w-full mb-3 rounded"

/>



<input

type="number"

placeholder="Discount"

value={form.discount}

onChange={(e)=>

setForm({

...form,

discount:e.target.value

})

}

className="border p-3 w-full mb-3 rounded"

/>



<select

value={form.payment_method}

onChange={(e)=>

setForm({

...form,

payment_method:e.target.value

})

}

className="border p-3 w-full mb-3 rounded"

>

<option>
Cash
</option>

<option>
Card
</option>

<option>
Online
</option>


</select>

<div className="mt-4 text-xl font-bold">

Total:

Rs {
(Number(form.price) * Number(form.quantity)) - Number(form.discount)
}

</div>

<button

onClick={createSale}

className="bg-blue-600 text-white px-6 py-3 rounded mt-4"

>

Create Sale

</button>

</div>

<div className="bg-white p-6 rounded-xl shadow mt-8">


<h2 className="text-2xl font-bold mb-4">

Sales History

</h2>



<table className="w-full">


<thead>

<tr className="border-b">

<th className="p-3">
Invoice No
</th>
<th className="p-3">
Customer
</th>


<th>
Total
</th>


<th>
Discount
</th>


<th>
Final Amount
</th>


<th>
Payment
</th>


<th>
Date
</th>

<th>
Action
</th>


</tr>

</thead>



<tbody>


{

sales.map(sale=>(


<tr

key={sale.id}

className="border-b"

>

<td className="p-3">

{sale.invoice_no}

</td>

<td className="p-3">

{sale.customer_name}

</td>



<td>

Rs {sale.total_amount}

</td>



<td>

Rs {sale.discount}

</td>



<td>

Rs {sale.final_amount}

</td>



<td>

{sale.payment_method}

</td>



<td>

{sale.created_at}

</td>

<td>


<button

onClick={()=>window.location.href=`/invoice/${sale.id}`}

className="bg-green-600 text-white px-4 py-2 rounded"

>

View

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


export default Sales;