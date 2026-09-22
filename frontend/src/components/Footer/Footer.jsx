import { Link} from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="hotel-footer">
    <div className="footer-container">

  
        <div className="footer-section footer-brand">
            <h2> Hotel Management</h2>

            <p>
                Experience comfortable stays, easy bookings, and
                exceptional hotel services — all in one place.
            </p>

            <div className="footer-contact">
                <p> Tamil Nadu, India</p>
                <p> +91 93855 24502</p>
                <p> princejoshva0397@gmail.com</p>
            </div>
        </div>


        <div className="footer-section">
            <h3>Quick Links</h3>
        <ul>
               <li> <Link to="/">Home</Link></li>
               <li> <Link to="/add-hotel">Add Hotel</Link></li>
               <li> <Link to="/">Hotel</Link></li>
        </ul>
            
        </div>

        <div className="footer-section">
            <h3>Our Services</h3>

            <ul>
                <li>Room Booking</li>
                <li>Online Reservations</li>
                <li>24/7 Customer Support</li>
            </ul>
        </div>


        <div className="footer-section vision-section">

            <div className="vision-box">
                <h3>🎯 Our Vision</h3>
                <p>
                    To make every hotel stay comfortable, convenient,
                    and memorable through smart management and quality service.
                </p>
            </div>

            <div className="mission-box">
                <h3>🚀 Our Mission</h3>
                <p>
                    To simplify hotel booking and management while delivering
                    reliable services and an excellent experience for every guest.
                </p>
            </div>

        </div>

    </div>

    <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Hotel Management. All rights reserved.
        </p>
      </div>

</footer>
  );
};
export default Footer;