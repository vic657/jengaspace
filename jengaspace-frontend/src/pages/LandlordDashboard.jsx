import { useEffect, useState } from 'react';
import axios from '../axios';

function LandlordDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/landlord/status');
        setStatus(res.data.status);
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
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-orange-500">Registration Pending</h2>
        <p className="mt-2">Your account is awaiting admin approval. You’ll be notified once approved.</p>
      </div>
    );
  }

  if (status === 'not_found') {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>No landlord registration found for your account.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to your Dashboard</h1>
      {/* Full dashboard content for approved landlords */}
      <p className="text-gray-700">You are now approved. Start managing your properties.</p>
    </div>
  );
}

export default LandlordDashboard;
