import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Details from './pages/Details';
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import Login from './pages/Login';
import LandlordRegister from './pages/LandlordRegister';
import LandlordAgreement from './pages/LandlordAgreement';
import LandlordPayment from './pages/LandlordPayment';
import AddProperty from './pages/AddProperty';
import MyListings from './pages/MyListings';
import Requests from './pages/Requests';
import AdminLayout from './components/AdminLayout';
import Landlords from './pages/Landlords';
import LoginGeneral from './pages/LoginGeneral';
import UserDashboard from './pages/UserDashboard';
import Tenants from './pages/Tenants';
import ManageListings from "./pages/ManageListings";
import Finance from './pages/Finance';




function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/general-login" element={<LoginGeneral />} />
        <Route path="/landlord-payments" element={<LandlordPayment />} />

        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<Details />} />
        <Route path="/register" element={<LandlordRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landlord-agreement" element={<LandlordAgreement />} />
        <Route path="/landlord-payment" element={<LandlordPayment />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/my-listings" element={<MyListings />} />

        {/* Protected Landlord Dashboard */}
        <Route
          path="/landlord-dashboard"
          element={
            <ProtectedRoute>
              <LandlordDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin layout with nested routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="landlords" element={<Landlords />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="manage-listings" element={<ManageListings />} />
          <Route path="finance" element={<Finance />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
