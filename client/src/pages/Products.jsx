import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "../components/layout/Layout";

function Products() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [garments, setGarments] = useState([]);
  const [search,setSearch] = useState("");
  const [categoryFilter,setCategoryFilter] = useState("");

const [sizeFilter,setSizeFilter] = useState("");

const [colorFilter,setColorFilter] = useState("");

const [shopFilter,setShopFilter] = useState("");
const [stockFilter,setStockFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    size: "",
    color: "",
    cost_price: "",
    selling_price: "",
    stock: "",
    shop_id: "",
    image: null,
  });

  // =========================
  // Fetch Products
  // =========================
  const fetchProducts = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // Fetch Garments
  // =========================
  const fetchGarments = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/garments");
      setGarments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchGarments();
  }, []);

 const filteredProducts = products.filter((product)=>{

    const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.color.toLowerCase().includes(search.toLowerCase()) ||
        product.size.toLowerCase().includes(search.toLowerCase());


    const categoryMatch =
        categoryFilter === "" ||
        product.category === categoryFilter;


    const sizeMatch =
        sizeFilter === "" ||
        product.size === sizeFilter;


    const colorMatch =
        colorFilter === "" ||
        product.color === colorFilter;


    const shopMatch =
        shopFilter === "" ||
        product.shop_id.toString() === shopFilter;

    const stockMatch =
    stockFilter === "" ||

    (stockFilter === "low" && product.stock <= 5);


  return (
    searchMatch &&
    categoryMatch &&
    sizeMatch &&
    colorMatch &&
    shopMatch &&
    stockMatch
);

});
const getStockStatus = (stock) => {

    if (stock <= 5) {

        return "🔴 Low Stock";

    } 
    else if (stock <= 15) {

        return "🟡 Medium";

    } 
    else {

        return "🟢 Available";

    }

};

  // =========================
  // Handle Text Input
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Handle Image
  // =========================
  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };
  const editProduct = (product) => {

    setEditId(product.id);

    setForm({

        name: product.name,
        category: product.category,
        size: product.size,
        color: product.color,
        cost_price: product.cost_price,
        selling_price: product.selling_price,
        stock: product.stock,
        shop_id: product.shop_id,
        image: product.image

    });

};
const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );


        alert("Product deleted successfully");


        fetchProducts();


    } catch(err) {

        console.log(err);

        alert("Failed to delete product");

    }

};
  // =========================
  // Add Product
  // =========================
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("category", form.category);
      data.append("size", form.size);
      data.append("color", form.color);
      data.append("cost_price", form.cost_price);
      data.append("selling_price", form.selling_price);
      data.append("stock", form.stock);
      data.append("shop_id", form.shop_id);

      if (form.image) {
        data.append("image", form.image);
      }

     if (editId) {

    await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${editId}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    alert("Product Updated Successfully");

} else {

    await axios.post(
        "${import.meta.env.VITE_API_URL}/api/products",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    alert("Product Added Successfully");

}

      alert("Product Added Successfully");

      setForm({
        name: "",
        category: "",
        size: "",
        color: "",
        cost_price: "",
        selling_price: "",
        stock: "",
        shop_id: "",
        image: null,
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Failed to add product.");
    }
  };



  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <form onSubmit={addProduct}>

          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
            required
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Size */}
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={form.size}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Color */}
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Cost Price */}
          <input
            type="number"
            name="cost_price"
            placeholder="Cost Price"
            value={form.cost_price}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Selling Price */}
          <input
            type="number"
            name="selling_price"
            placeholder="Selling Price"
            value={form.selling_price}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Stock */}
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Product Image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-3 rounded w-full mb-3"
          />

          {/* Supplier */}
          <select
            name="shop_id"
            value={form.shop_id}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
            required
          >
            <option value="">
              Select Garment Shop
            </option>

            {garments.map((shop) => (
              <option
                key={shop.id}
                value={shop.id}
              >
                {shop.shop_name}
              </option>
            ))}

          </select>

       <button
    type="submit"
    className={`w-full py-3 rounded text-white ${
        editId
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {editId ? "Update Product" : "Add Product"}
</button>

        </form>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Product List
        </h2>
        <input

type="text"

placeholder="Search product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 w-full mb-5 rounded"

/>
<select

value={categoryFilter}

onChange={(e)=>setCategoryFilter(e.target.value)}

className="border p-3 w-full mb-5 rounded"

>

<option value="">
All Categories
</option>


<option value="T-Shirt">
T-Shirt
</option>


<option value="Jeans">
Jeans
</option>


<option value="Hoodie">
Hoodie
</option>


<option value="Shoes">
Shoes
</option>


</select>
<select

value={sizeFilter}

onChange={(e)=>setSizeFilter(e.target.value)}

className="border p-3 w-full mb-5 rounded"

>

<option value="">
All Sizes
</option>


<option value="S">
S
</option>


<option value="M">
M
</option>


<option value="L">
L
</option>


<option value="XL">
XL
</option>


<option value="XXL">
XXL
</option>


</select>
<select

value={colorFilter}

onChange={(e)=>setColorFilter(e.target.value)}

className="border p-3 w-full mb-5 rounded"

>

<option value="">
All Colors
</option>


<option value="Black">
Black
</option>


<option value="White">
White
</option>


<option value="Blue">
Blue
</option>


<option value="Red">
Red
</option>


<option value="Green">
Green
</option>


<option value="Yellow">
Yellow
</option>


</select>
<select

value={shopFilter}

onChange={(e)=>setShopFilter(e.target.value)}

className="border p-3 w-full mb-5 rounded"

>
  

<option value="">
All Suppliers
</option>


{
garments.map((shop)=>(

<option

key={shop.id}

value={shop.id}

>

{shop.shop_name}

</option>

))

}


</select>
<select

value={stockFilter}

onChange={(e)=>setStockFilter(e.target.value)}

className="border p-3 w-full mb-5 rounded"

>

<option value="">
All Stock
</option>


<option value="low">
Low Stock Only
</option>


</select>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 border">Image</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock Status</th>
              <th className="p-3 border">Supplier</th>
              <th className="p-3 border">Action</th>

            </tr>

          </thead>

          <tbody>


            {products.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-b">

                  <td className="p-3 border text-center">
                    {product.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="p-3 border">
                    {product.name}
                  </td>

                  <td className="p-3 border">
                    {product.category}
                  </td>

                  <td className="p-3 border">
                    Rs. {product.selling_price}
                  </td>

                 <td className="p-3">

    <div>
        {product.stock}
    </div>


    <div className="text-sm font-semibold">

        {getStockStatus(product.stock)}

    </div>

</td>

                  <td className="p-3 border">
                    {product.shop_name}
                  </td>
                  <td className="p-3">

    <button
        onClick={() => editProduct(product)}
        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
    >
        Edit
    </button>


    <button
        onClick={() => deleteProduct(product.id)}
        className="bg-red-600 text-white px-3 py-1 rounded"
    >
        Delete
    </button>

</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Products;