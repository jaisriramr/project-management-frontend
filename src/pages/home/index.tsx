import "./index.scss";
import Logo from "../../assets/logo.svg";
import HeroImage from "../../assets/hero-images/hero-image.png";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import TechImage from "../../assets/hero-images/tech-image.svg";
import { useEffect } from "react";
import * as jwt from "jwt-decode";
// import useSocket from "../../services/notification.service";

export const Home = () => {
  // const { notifications } = useSocket();
  const url = window.location.href;

  const inviteMatches: any = url.match(/invitation=([^&]+)/);
  const orgMatches: any = url.match(/organization=([^&]+)/);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const decoded: any = jwt.jwtDecode(
        localStorage.getItem("access_token") || ""
      );
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      console.log(decoded, decoded.exp > currentTime);

      if (decoded.exp > currentTime) {
        navigate("/dashboard/board");
      }
    }
  }, []);

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <div className="home-navbar__links">
          <Link to={"/"}>
            <img src={Logo} alt="tasknest" />
          </Link>
          <Link className="home-navbar__link" to={"/about"}>
            About
          </Link>
        </div>
        <div className="home-navbar__auth-group">
          <Link to="/login">
            <Button size="middle">Login</Button>
          </Link>
        </div>
      </nav>
      <main className="home-container__body">
        <header className="home-container__header">
          <div className="home-container__header-hero-text">
            <h1>Multi-Tenant Microservices</h1>
            <p>
              A comprehensive project management platform that empowers multiple
              tenants to seamlessly manage their organizations and oversee
              projects with efficiency and ease.
            </p>
          </div>
          <div className="home-container__header-hero-image">
            <img src={HeroImage} alt="home-hero" />
          </div>
        </header>
        {/* <div>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div> */}
        <div className="home-container__tech">
          <div className="home-container__tech-image">
            <img src={TechImage} alt="Tech Image" />
          </div>
          <div className="home-container__tech-text">
            <h2>Technologies Used</h2>
            <p>
              Our project leverages a modern and scalable tech stack designed to
              handle high-performance requirements and ensure seamless user
              experiences. Each technology is carefully chosen to support
              scalability, reliability, and maintainability in a multi-tenant
              microservices architecture.
            </p>
          </div>
        </div>
      </main>
      <footer>Copyrights © 2024</footer>
    </div>
  );
};
