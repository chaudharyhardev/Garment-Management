import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Garments from "../pages/Garments";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Sales from "../pages/Sales";
import Invoice from "../pages/Invoice";
import Users from "../pages/Users";
import ProtectedRoute from "../components/ProtectedRoute";
import Suppliers from "../pages/Suppliers";
import Purchases from "../pages/Purchases";
import PurchaseHistory from "../pages/PurchaseHistory";
import PurchaseInvoice from "../pages/PurchaseInvoice";
import CustomerHistory from "../pages/CustomerHistory";
import Deliveries from "../pages/Deliveries";
import DeliveryStaff from "../pages/DeliveryStaff";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/garments"
          element={
            <ProtectedRoute>
              <Garments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

        <Route
    path="/suppliers"
    element={
        <ProtectedRoute>
            <Suppliers />
        </ProtectedRoute>
    }/>
    <Route
    path="/purchases"
    element={
        <ProtectedRoute>
            <Purchases />
        </ProtectedRoute>
    }/>
    <Route
path="/purchase-history"
element={
<ProtectedRoute>
<PurchaseHistory />
</ProtectedRoute>
}
/>

<Route

path="/purchase/:id"

element={

<ProtectedRoute>

<PurchaseInvoice />

</ProtectedRoute>

}

/>
<Route
path="/customers/:id/history"
element={
<ProtectedRoute>
<CustomerHistory />
</ProtectedRoute>
}
/>
<Route 
path="/deliveries" 
element={
    <ProtectedRoute>
<Deliveries/>
</ProtectedRoute>
}
/>
<Route
path="/delivery-staff"
element={
   <ProtectedRoute> 
<DeliveryStaff/>
</ProtectedRoute>
}
/>



      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;