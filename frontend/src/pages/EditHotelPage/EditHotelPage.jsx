import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import HotelForm from "../../components/HotelForm/HotelForm";
import {
  updateHotel,
  clearError
} from "../../store/hotelSlice";

import "./EditHotelPage.css";

const EditHotelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.hotels);

  const [hotel, setHotel] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setFetchLoading(true);
        setFetchError("");

        const response = await fetch(
          `http://localhost:5000/api/hotels/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }

        const result = await response.json();
        setHotel(result.data);
      } catch (err) {
        console.error("Fetch hotel error:", err);
        setFetchError("Unable to load hotel details.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchHotel();

    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateHotel({
          id,
          formData
        })
      ).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Update hotel error:", err);
    }
  };

  if (fetchLoading) {
    return (
      <div className="edit-hotel-page">
        <div className="edit-hotel-container">
          <p className="loading-text">
            Loading hotel details...
          </p>
        </div>
      </div>
    );
  }

  if (fetchError || !hotel) {
    return (
      <div className="edit-hotel-page">
        <div className="edit-hotel-container">
          <div className="error-message">
            {fetchError || "Hotel not found"}
          </div>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-hotel-page">
      <Helmet>
        <title>Edit {hotel.title} | Hotel Management</title>

        <meta
          name="description"
          content={`Edit hotel details for ${hotel.title}`}
        />
      </Helmet>

      <div className="edit-hotel-container">
        <div className="edit-hotel-header">
          <h1>Edit Hotel</h1>
          <p>Update the hotel information </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <HotelForm
          initialData={hotel}
          isEdit={true}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div className="edit-page-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelPage;
