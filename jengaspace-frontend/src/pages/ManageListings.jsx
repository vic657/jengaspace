import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./ManageListings.css";

export default function ManageListings() {
  const [listings, setListings] = useState([]);
  const [showHidden, setShowHidden] = useState(() => {
    const saved = localStorage.getItem("showHidden");
    return saved ? JSON.parse(saved) : false;
  });

  // 🔥 Update: Fetch listings based on `showHidden` toggle
  useEffect(() => {
    const url = showHidden
      ? "/admin/listings/hidden"
      : "/admin/listings";

    axios.get(url).then((res) => {
      setListings(res.data);
    });
  }, [showHidden]); // re-fetch when toggle changes

  useEffect(() => {
    localStorage.setItem("showHidden", JSON.stringify(showHidden));
  }, [showHidden]);
const handleUnhide = async (id) => {
  try {
    await axios.put(`/admin/listings/${id}/unhide`);
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, hidden: 0 } : listing
      )
    );
  } catch (err) {
    console.error("Error unhiding listing:", err);
  }
};

  const handleHide = async (id) => {
    try {
      await axios.put(`/admin/listings/${id}/hide`);
      setListings((prev) =>
        prev.map((listing) =>
          listing.id === id ? { ...listing, hidden: 1 } : listing
        )
      );
    } catch (err) {
      console.error("Error hiding listing:", err);
    }
  };

  return (
    <div className="manage-listings-container">
      <h2 className="page-title">Manage Listings</h2>

      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={showHidden}
          onChange={() => setShowHidden(!showHidden)}
        />{" "}
        Show Hidden Listings
      </label>

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
        {listings
          .filter((listing) => showHidden || listing.hidden !== 1)
          .map((listing) => (
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
                {listing.hidden === 1 && showHidden ? (
                  <button
                    className="unhide-btn"
                    onClick={() => handleUnhide(listing.id)}
                  >
                    Unhide
                  </button>
                ) : listing.hidden === 1 ? (
                  <span className="hidden-label">Hidden</span>
                ) : (
                  <button
                    className="hide-btn"
                    onClick={() => handleHide(listing.id)}
                  >
                    Hide
                  </button>
                )}
              </td>

            </tr>
          ))}
      </tbody>

      </table>
    </div>
  );
}
