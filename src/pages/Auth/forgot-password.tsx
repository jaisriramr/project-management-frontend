import "./index.scss";
import HeroImage from "../../assets/hero-images/hero-image.png";
import Logo from "../../assets/logo.svg";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>();
  const userService = container.resolve(AuthService);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isValid, setIsValid] = useState<any>(null);

  const handleEmailChange = (event: any) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // Validate email using regex
    if (emailRegex.test(inputEmail)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  function handleSendLink() {
    console.log("SEND LINK");
  }

  return (
    <div className="auth-container">
      <div className="auth-container__hero">
        <h1>Multi-Tenant Microservices</h1>
        <p>
          A comprehensive project management platform that empowers multiple
          tenants to seamlessly manage their organizations and oversee projects
          with efficiency and ease.
        </p>
        <div className="auth-container__hero-image-container">
          <img src={HeroImage} alt="hero-image" />
        </div>
      </div>
      <div className="auth-container__form-container">
        <div className="auth-container__form">
          <Link to={"/"}>
            <img src={Logo} alt="Task Nest" />
          </Link>
          <h2>Forgot Password</h2>
          <p>Please Enter your email to get reset password link</p>
          <div className="auth-container__form-group">
            <label>Email</label>
            <Input
              className="auth-container__form-input"
              placeholder="Enter your email ID"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            {!isValid && isValid !== null && (
              <p className="auth-invalid">Invalid Email</p>
            )}
          </div>
          <Button
            className="auth-container__form-btn"
            type="primary"
            onClick={handleSendLink}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
