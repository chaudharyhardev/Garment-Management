const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://shimmering-rolypoly-d448bf.netlify.app"
    ]
}));

app.use(express.json());



const garmentRoutes =
require("./routes/garmentRoutes");
const productRoutes =
require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const salesRoutes = require("./routes/salesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const deliveryStaffRoutes = require("./routes/deliveryStaffRoutes");


app.use(
"/api/garments",
garmentRoutes
);
app.use(
"/api/products",
productRoutes
);
app.use(
    "/api/customers",
    customerRoutes
);
app.use(
    "/api/sales",
    salesRoutes
);
app.use(
"/uploads",
express.static("uploads")
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{

res.json({
message:"GIOMS Backend Running 🚀"
});

});
app.use("/api/users", userRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use(
"/api/deliveries",
deliveryRoutes
);
app.use(
    "/api/delivery-staff",
    deliveryStaffRoutes
);

module.exports=app;