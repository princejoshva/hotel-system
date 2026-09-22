import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading/Loading";
import HotelForm from "../../components/HotelForm/HotelForm";
import "./AddHotelPage.css";
import {
  addHotel,
  updateHotel,
  clearError
} from "../../store/hotelSlice";

const AddHotelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditMode = Boolean(id);

  const { loading, error } = useSelector((state) => state.hotels);

  const [hotel, setHotel] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchHotel = async () => {
      try {
        setFetchLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/hotels/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load hotel");
        }

        const result = await response.json();
        setHotel(result.data);
      } catch (err) {
        console.error("Fetch hotel error:", err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchHotel();

    return () => {
      dispatch(clearError());
    };
  }, [id, isEditMode, dispatch]);

  const handleSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await dispatch(
          updateHotel({
            id,
            formData
          })
        ).unwrap();
      } else {
        await dispatch(addHotel(formData)).unwrap();
      }

      navigate("/");
    } catch (err) {
      console.error("Save hotel error:", err);
    }
  };

  return (
    <div className="hotel-form-page">
      <Helmet>
        <title>
          {isEditMode ? "Edit Hotel" : "Add Hotel"} | Hotel Management
        </title>

        <meta
          name="description"
          content={
            isEditMode
              ? "Edit hotel details."
              : "Add a new hotel."
          }
        />
      </Helmet>

      <div className="hotel-form-container">
        <h1>
          {isEditMode ? "Edit Hotel" : "Add Hotel"}
        </h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {fetchLoading ? (
          <Loading message="Loading hotel..." />
        ) : (
          <HotelForm
            initialData={hotel}
            isEdit={isEditMode}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddHotelPage;
