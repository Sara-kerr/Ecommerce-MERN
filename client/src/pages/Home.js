
import { Link } from "react-router-dom";
import "../css/Home.css";

function Home() {
  return (
    <div className="home">
    <div className="home-content">
      <h1>Welcome to Our Shop! <span role="img" aria-label="shopping">🛍️</span></h1>
      <p>
        Your one-stop destination for the <span style={{ color: '#ff6347' }}>best quality clothing</span> and accessories. <span role="img" aria-label="clothes">👗👚</span> 
        We offer a wide range of products that cater to all your fashion needs. Explore our categories and find the perfect items to suit your style.
      </p>
      <Link to="/shop" className="start-shopping-button">Start Shopping Now <span role="img" aria-label="arrow">➡️</span></Link>
    </div>
  </div>
  );
}

export default Home;
