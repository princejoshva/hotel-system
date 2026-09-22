import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div>
      <h2>{hotel.title}</h2>

      {hotel.image && (
        <img
          src={`http://localhost:5000${hotel.image}`}
          alt={hotel.title}
          style={{
            width: "400px",
            height: "250px",
            objectFit: "cover",
            display: "block",
            marginBottom: "20px"
          }}
        />
      )}

      <Link to={`/hotels/${hotel.id}`}>View Details</Link>
    </div>
  );
};

export default HotelCard;
