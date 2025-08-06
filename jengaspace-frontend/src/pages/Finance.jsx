import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../finance.css';

export default function Finance() {
  const [stats, setStats] = useState({
    total_fees: 0,
    approved_landlords: 0,
    rent_income: 0,
    total_rent_income: 0,
    commission_earned: 0,
  });

  useEffect(() => {
    const fetchFinanceStats = async () => {
      try {
        const response = await axios.get('/Admin/finance-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching finance stats:', error);
      }
    };

    fetchFinanceStats();
  }, []);

  const formatCurrency = (amount) =>
    Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="finance-dashboard">
      <h2>Finance Management</h2>
      <div className="finance-sections">
        <div className="finance-card">
          <h3>Total Registration Fees Collected</h3>
          <p>KES {formatCurrency(stats.total_fees)}</p>
        </div>

        <div className="finance-card">
          <h3>Approved Landlord Payments</h3>
          <p>{stats.approved_landlords} Landlords</p>
        </div>

        <div className="finance-card">
          <h3>Total Rent Income (Before Commission)</h3>
          <p>KES {formatCurrency(stats.total_rent_income)}</p>
        </div>

        <div className="finance-card">
          <h3>Commission Earned</h3>
          <p>KES {formatCurrency(stats.commission_earned)}</p>
        </div>

        <div className="finance-card">
          <h3>Rent Income (After Commission)</h3>
          <p>KES {formatCurrency(stats.rent_income)}</p>
        </div>

        <div className="finance-card">
          <h3>Balance Overview</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
