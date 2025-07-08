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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landlord-agreement" element={<LandlordAgreement />} />
        <Route path="/landlord-payment" element={<LandlordPayment />} />
        <Route path="/register" element={<LandlordRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<Details />} />

        {/* protected routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlord-dashboard"
          element={
            <ProtectedRoute>
              <LandlordDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
