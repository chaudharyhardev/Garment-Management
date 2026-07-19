import { 
    FaBox,
    FaStore,
    FaShoppingCart,
    FaUsers,
    FaHome
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";


function Sidebar(){


  const user = JSON.parse(localStorage.getItem("user"));
return(

<div className="w-64 bg-gray-900 text-white min-h-screen p-5">


<h1 className="text-2xl font-bold mb-8">
GIOMS
</h1>


<ul className="space-y-5">


<li>
<Link to="/dashboard">

<FaHome className="inline mr-3"/>

Dashboard

</Link>
</li>



<li>

<Link to="/garments">

<FaStore className="inline mr-3"/>

Garment Shops

</Link>

</li>



<li>

<Link to="/products">

<FaBox className="inline mr-3"/>

Products

</Link>

</li>
<li>

<Link to="/customers">

<FaUsers className="inline mr-3"/>

Customers

</Link>

</li>

<li>

<Link to="/purchases">

<FaShoppingBasket className="inline mr-3"/>

Purchases

</Link>

</li>
<li>

<Link to="/purchase-history">

<FaShoppingBasket className="inline mr-3"/>

Purchase History

</Link>

</li>


<li>
  

<Link to="/sales">

<FaShoppingCart className="inline mr-3"/>

Sales

</Link>

</li>

<li>

<Link to="/deliveries">

<FaTruck className="inline mr-3"/>

Deliveries

</Link>

</li>
<li>

<Link to="/delivery-staff">

<FaMotorcycle className="inline mr-3"/>

Delivery Staff

</Link>

</li>

{
user?.role === "admin" && (

<li>

<Link to="/users">

<FaUsers className="inline mr-3"/>

Users

</Link>

</li>

)
}


</ul>


</div>

)

}


export default Sidebar;