import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./ManageListings.css";

export default function ManageListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("/admin/listings").then((res) => {
      setListings(res.data);
    });
  }, []);

  const handleHide = async (id) => {
    try {
      await axios.put(`/admin/listings/${id}/hide`);
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      console.error("Error hiding listing:", err);
    }
  };

  return (
    <div className="manage-listings-container">
      <h2 className="page-title">Manage Listings</h2>
      <table className="listing-table">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Rent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>{listing.category}</td>
              <td>{listing.location}</td>
              <td>
                <span
                    className={
                    listing.status === "rented"
                        ? "status-rented"
                        : listing.status === "available"
                        ? "status-available"
                        : "status-default"
                    }
                >
                    {listing.status}
                </span>
                </td>

              <td>KES {listing.rent}</td>
              <td>
                {listing.status !== "removed" ? (
                  <button
                    className="hide-btn"
                    onClick={() => handleHide(listing.id)}
                  >
                    Hide
                  </button>
                ) : (
                  "Hidden"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
