import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Navigate } from "react-router-dom";


function Users(){

  const user = JSON.parse(localStorage.getItem("user"));

if(user?.role !== "admin"){

    return <Navigate to="/dashboard" />;

}

    const [users,setUsers] = useState([]);

    const [form,setForm] = useState({

        name:"",
        email:"",
        password:"",
        role:"staff"

    });


    const fetchUsers = async()=>{

        try{

            const res = await axios.get("/users");

            setUsers(res.data);

        }
        catch(err){

            console.log(err);

        }

    };


    useEffect(()=>{

        fetchUsers();

    },[]);



    const createUser = async()=>{

        try{

            await axios.post("/users",form);

            alert("User Created");

            setForm({

                name:"",
                email:"",
                password:"",
                role:"staff"

            });


            fetchUsers();


        }
        catch(err){

            alert(
                err.response?.data?.message ||
                "Failed"
            );

        }

    };



    const deleteUser = async(id)=>{

        try{

            await axios.delete(`/users/${id}`);

            alert("User Deleted");

            fetchUsers();

        }
        catch(err){

            alert("Delete Failed");

        }

    };



return(

<div>

<h1 className="text-3xl font-bold mb-6">
User Management
</h1>



<div className="bg-white p-6 rounded-xl shadow mb-6">


<input

className="border p-3 w-full mb-3"

placeholder="Name"

value={form.name}

onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}

/>


<input

className="border p-3 w-full mb-3"

placeholder="Email"

value={form.email}

onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}

/>


<input

className="border p-3 w-full mb-3"

placeholder="Password"

type="password"

value={form.password}

onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}

/>



<select

className="border p-3 w-full mb-3"

value={form.role}

onChange={(e)=>
setForm({
...form,
role:e.target.value
})
}

>

<option value="staff">
Staff
</option>

<option value="admin">
Admin
</option>


</select>



<button

onClick={createUser}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Add User

</button>


</div>



<div className="bg-white rounded-xl shadow p-6">


<table className="w-full">


<thead>

<tr className="border-b">

<th className="p-3">
Name
</th>

<th className="p-3">
Email
</th>

<th className="p-3">
Role
</th>

<th className="p-3">
Action
</th>

</tr>

</thead>



<tbody>


{
users.map(user=>(

<tr
key={user.id}
className="border-b"
>


<td className="p-3">
{user.name}
</td>


<td className="p-3">
{user.email}
</td>


<td className="p-3">
{user.role}
</td>


<td className="p-3">

<button

onClick={()=>deleteUser(user.id)}

className="bg-red-500 text-white px-3 py-1 rounded"

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


</div>

)

}


export default Users;