import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HotelListPage from "./pages/HotelListPage/HotelListPage";
import AddHotelPage from "./pages/AddHotelPage/AddHotelPage";
import EditHotelPage from "./pages/EditHotelPage/EditHotelPage";
import HotelDetailPage from "./pages/HotelDetailPage/HotelDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/add-hotel" element={<AddHotelPage />} />
        <Route path="/edit-hotel/:id" element={<EditHotelPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
