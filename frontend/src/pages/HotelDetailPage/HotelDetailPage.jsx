import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HotelDetailPage.css";

function HotelDetailPage() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  // Get hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/hotels/${id}`
        );

        if (!response.ok) {
          throw new Error("Hotel not found");
        }

        const result = await response.json();

        setHotel(result.data);
      } catch (err) {
        console.error("Hotel fetch error:", err);
        setError("Unable to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);

        setLocationError(
          "Unable to get your current location. Please allow location permission."
        );
      }
    );
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="detail-message">
        <p>Loading hotel...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="detail-message">
        <p>{error}</p>
      </div>
    );
  }

  // No hotel
  if (!hotel) {
    return (
      <div className="detail-message">
        <p>Hotel not found</p>
      </div>
    );
  }

  const latitude = Number(hotel.latitude);
  const longitude = Number(hotel.longitude);

  // Google Maps API key
  const googleMapsApiKey =
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Google Maps Embed API URL
  const googleMapUrl =
    `https://www.google.com/maps/embed/v1/place` +
    `?key=${googleMapsApiKey}` +
    `&q=${latitude},${longitude}` +
    `&zoom=15`;

  return (
    <div className="hotel-detail-page">

      <Helmet>
        <title>{hotel.title} | Hotel Management</title>

        <meta
          name="description"
          content={
            hotel.description ||
            `View details and location of ${hotel.title}`
          }
        />
      </Helmet>

      <div className="hotel-detail-container">

        {/* Back Button */}
        <Link to="/" className="back-link">
          ← Back to Hotels
        </Link>

        {/* Hotel Details Card */}
        <div className="hotel-detail-card">

          {/* Hotel Image */}
          <div className="detail-image-section">

            {hotel.image ? (
              <img
                src={`http://localhost:5000${hotel.image}`}
                alt={`${hotel.title} hotel`}
                className="detail-image"
              />
            ) : (
              <div className="no-image">
                No Image Available
              </div>
            )}

          </div>

          {/* Hotel Information */}
          <div className="detail-content">

            <h1>{hotel.title}</h1>

            <p className="detail-description">
              {hotel.description}
            </p>

            <div className="price-section">
              ₹{hotel.price}
            </div>

            <div className="coordinates">

              <p>
                <strong>Latitude:</strong>{" "}
                {latitude}
              </p>

              <p>
                <strong>Longitude:</strong>{" "}
                {longitude}
              </p>

            </div>

            <Link
              to={`/edit-hotel/${hotel.id}`}
              className="edit-hotel-btn"
            >
              Edit Hotel
            </Link>

          </div>

        </div>

        {/* Google Map */}
        <div className="map-section">

          <h2>Hotel Location</h2>

          <div className="hotel-map">

            {googleMapsApiKey ? (
              <iframe
                title={`${hotel.title} location`}
                src={googleMapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="map-error">
                Google Maps API key is not configured.
              </div>
            )}

          </div>

        </div>

        {/* Current User Location */}
        <div className="location-section">

          <h2>Your Current Location</h2>

          {userLocation ? (
            <div className="user-location">

              <p>
                <strong>Latitude:</strong>{" "}
                {userLocation.latitude.toFixed(6)}
              </p>

              <p>
                <strong>Longitude:</strong>{" "}
                {userLocation.longitude.toFixed(6)}
              </p>

            </div>
          ) : (
            <p className="location-error">
              {locationError || "Getting your location..."}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default HotelDetailPage;