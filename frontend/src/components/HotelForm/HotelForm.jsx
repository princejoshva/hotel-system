import React, { useEffect, useState } from "react";
import "./HotelForm.css";

function HotelForm({
  initialData = null,
  isEdit = false,
  onSubmit,
  loading = false
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
        price: initialData.price || ""
      });

      if (initialData.image) {
        setPreview(`http://localhost:5000${initialData.image}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));

      setErrors({
        ...errors,
        image: ""
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 2) {
      newErrors.title = "Title must contain at least 2 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "Description must contain at least 10 characters";
    }

    if (formData.latitude === "") {
      newErrors.latitude = "Latitude is required";
    } else if (
      Number(formData.latitude) < -90 ||
      Number(formData.latitude) > 90
    ) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (formData.longitude === "") {
      newErrors.longitude = "Longitude is required";
    } else if (
      Number(formData.longitude) < -180 ||
      Number(formData.longitude) > 180
    ) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (formData.price === "") {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (!isEdit && !image) {
      newErrors.image = "Hotel image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("price", formData.price);

    if (image) {
      data.append("image", image);
    }

    onSubmit(data);
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Hotel Image</label>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageChange}
        />

        {errors.image && (
          <p className="error-message">{errors.image}</p>
        )}

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Hotel preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter hotel title"
        />

        {errors.title && (
          <p className="error-message">{errors.title}</p>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter hotel description"
          rows="5"
        />

        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>

      <div className="form-group">
        <label>Latitude</label>

        <input
          type="number"
          step="any"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Example: 13.0827"
        />

        {errors.latitude && (
          <p className="error-message">{errors.latitude}</p>
        )}
      </div>

      <div className="form-group">
        <label>Longitude</label>

        <input
          type="number"
          step="any"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Example: 80.2707"
        />

        {errors.longitude && (
          <p className="error-message">{errors.longitude}</p>
        )}
      </div>

      <div className="form-group">
        <label>Price</label>

        <input
          type="number"
          min="0"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />

        {errors.price && (
          <p className="error-message">{errors.price}</p>
        )}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Hotel"
          : "Add Hotel"}
      </button>

    </form>
  );
}

export default HotelForm;
