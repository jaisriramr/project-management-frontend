import "./index.scss";
import HeroImage from "../../assets/hero-images/hero-image.png";
import Logo from "../../assets/logo.svg";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const userService = container.resolve(AuthService);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isValid, setIsValid] = useState<any>(null);

  async function handleLogin() {
    if (!user.email || !user.password) {
      message.error("Please Check Your Credentials");
    } else {
      const loading = message.loading("Loading...", 0);

      userService
        .loginUser(user)
        .then((response) => {
          localStorage.setItem("access_token", response);
          navigate("/dashboard");
          loading();
        })
        .catch((err) => {
          loading();
          console.log(err?.response?.data?.message);
          message.error(err?.response?.data?.message);
        });
    }
  }

  const handleEmailChange = (event: any) => {
    const inputEmail = event.target.value;
    setUser({ ...user, email: inputEmail });

    // Validate email using regex
    if (emailRegex.test(inputEmail)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

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
          <h2>Welcome Back</h2>
          <p>Please Enter your login details</p>
          <div className="auth-container__form-group">
            <label>Email</label>
            <Input
              className="auth-container__form-input"
              placeholder="Enter your email ID"
              type="text"
              value={user.email}
              onChange={handleEmailChange}
            />
            {!isValid && isValid !== null && (
              <p className="auth-invalid">Invalid Email</p>
            )}
          </div>
          <div className="auth-container__form-group">
            <label>Password</label>
            <Input
              className="auth-container__form-input"
              placeholder="Enter your Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <Link to="/forgot-password" className="auth-fp">
            Forgot Password?
          </Link>
          <Button
            className="auth-container__form-btn"
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <p>
            Don't have an Account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
