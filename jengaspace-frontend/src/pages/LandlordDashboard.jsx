import { useEffect, useState } from 'react';
import axios from '../axios';
import LandlordSidebar from '../components/LandlordSidebar';
import '../index.css'; // Add this line if you plan to create specific tweaks



function LandlordDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/landlord/status');
        setStatus(res.data.status); // should return 'approved', 'pending', or null
      } catch (err) {
        console.error(err);
        setStatus('not_found');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking status...</div>;

  if (status === 'pending') {
    return (
      <div className="dashboard-message pending">
        <h2 className="text-2xl font-semibold">Registration Pending</h2>
        <p>Your account is awaiting admin approval. You’ll be notified once approved.</p>
      </div>
    );
  }

  if (status === 'not_found') {
    return (
      <div className="dashboard-message not-found">
        <h2 className="text-xl font-semibold">No registration found</h2>
        <p>Please register as a landlord first.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/*  Sidebar only shown when approved */}
      {status === 'approved' && <LandlordSidebar />}

      <main className="dashboard-main">
        <div className="dashboard-message approved">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to your Dashboard</h1>
          <p>You are now approved. Start managing your properties.</p>
        </div>
      </main>
    </div>
  );
}

export default LandlordDashboard;
