import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import {
  fetchHotels,
  deleteHotel,
  clearSuccess
} from "../../store/hotelSlice";

import SearchFilter from "../../components/SearchFilter/SearchFilter";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import Toast from "../../components/Toast/Toast";

import "./HotelListPage.css";

function HotelListPage() {
  const dispatch = useDispatch();

  const {
    hotels = [],
    loading = false,
    error = null,
    success = false,
    total = 0,
    deletedSuccess,
    AddSuccess
  } = useSelector((state) => state.hotels);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);

  const limit = 6;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(
      fetchHotels({
        search,
        minPrice,
        maxPrice,
        page,
        limit
      }),
    );
  }, [dispatch, search, minPrice, maxPrice, page]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteHotel(id)).unwrap();

      dispatch(
        fetchHotels({
          search,
          minPrice,
          maxPrice,
          page,
          limit
        })
      );
    } catch (err) {
      console.error("Delete hotel error:", err);
    }
  };

  return (
    <div className="hotel-list-page">

      <Helmet>
        <title>Hotels | Hotel Management</title>

        <meta
          name="description"
          content="Browse, search and manage hotels."
        />
      </Helmet>

      <div className="hotel-list-container">

        <div className="page-header">
          <div>
            <h1>Hotel Management</h1>
            <p>Book Your Dream Palace</p>
          </div>

        </div>

        <SearchFilter
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={handleSearchChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onClear={handleClearFilters}
        />

        {success && (
          <Toast
            message="Hotel Edited successfully"
            type="success"
            onClose={() => dispatch(clearSuccess())}
          />
        )}

        { deletedSuccess && (
          <Toast
          message="Hotel Deleted Successfully"
          type="delete"
          onClose={()=>dispatch(clearSuccess())}
          />
        )
          
        }
        { AddSuccess && (
          <Toast
          message="Hotel Added Successfully"
          type="success"
          onClose={()=>dispatch(clearSuccess())}
          />
        )
          
        }

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <Loading message="Loading hotels..." />
        ) : hotels.length === 0 ? (

          <div className="no-hotels">
            <h2>No hotels found</h2>
            <p>
              Sorry, try another title or price range.
            </p>
          </div>

        ) : (

          <>
            <div className="hotel-grid">

              {hotels.map((hotel) => (
                <div
                  className="hotel-card"
                  key={hotel.id}
                >

                  <div className="hotel-image-wrapper">
                    <img
                      src={`http://localhost:5000${hotel.image}`}
                      alt={hotel.title}
                      className="hotel-image"
                    />
                  </div>

                  <div className="hotel-card-content">

                    <h2>{hotel.title}</h2>

                    <p className="hotel-description">
                      {hotel.description}
                    </p>

                    <p className="hotel-price">
                      ₹
                      {Number(hotel.price).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <div className="hotel-actions">

                      <Link
                        to={`/hotel/${hotel.id}`}
                        className="details-btn"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(hotel.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>

        )}

      </div>
    </div>
  );
}

export default HotelListPage;