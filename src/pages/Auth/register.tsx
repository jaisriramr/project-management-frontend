import "./index.scss";
import HeroImage from "../../assets/hero-images/hero-image.png";
import Logo from "../../assets/logo.svg";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const userService = container.resolve(AuthService);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [isValid, setIsValid] = useState<any>(null);
  const [isValidPassword, setIsValidPassword] = useState<any>(null);

  async function handleRegister() {
    if (!user.name || !user.email || !user.password) {
      message.error("Please Check Your Credentials");
    } else {
      const loading = message.loading("Loading...", 0);

      const userData = {
        ...user,
        status: "Active",
        roles: [import.meta.env.VITE_ADMIN_ROLE],
      };

      userService
        .registerUser(userData)
        .then((response) => {
          navigate("/login");
          loading();
        })
        .catch((err) => {
          loading();

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

  const handlePasswordChange = (event: any) => {
    const inputPassword = event.target.value;
    setUser({ ...user, password: inputPassword });

    if (passwordRegex.test(inputPassword)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const checkCapitalLetter = () => {
    const capitalLetterRegex = /[A-Z]/;
    const result = capitalLetterRegex.test(user.password);
    console.log(result);
    return result;
  };

  const checkSmallLetter = () => {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(user.password);
  };

  const checkSpecialChar = () => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(user.password);
  };

  const checkCharLength = () => {
    return user.password.length === 8;
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
          <h2>Create an Account</h2>
          <p>Please Enter your details</p>
          <div className="auth-container__form-group">
            <label>Name</label>
            <Input
              className="auth-container__form-input"
              placeholder="Enter your name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
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
              onChange={handlePasswordChange}
            />
            {!isValidPassword && isValidPassword !== null && (
              <ul className="auth-container_password-error">
                <li
                  style={{
                    color: checkCapitalLetter() === true ? "green" : "red",
                  }}
                >
                  Password must contain atleast one capital Letter{" "}
                  {checkCapitalLetter() == true && "✔"}
                </li>
                <li
                  style={{
                    color: checkSmallLetter() === true ? "green" : "red",
                  }}
                >
                  Password must contain atleast one small Letter{" "}
                  {checkSmallLetter() == true && "✔"}
                </li>
                <li
                  style={{
                    color: checkSpecialChar() === true ? "green" : "red",
                  }}
                >
                  Password must contain atleast one special character{" "}
                  {checkSpecialChar() == true && "✔"}
                </li>
                <li
                  style={{
                    color: checkCharLength() === true ? "green" : "red",
                  }}
                >
                  Password must alteast contain 8 character{" "}
                  {checkCharLength() == true && "✔"}
                </li>
              </ul>
            )}
          </div>
          <Button
            className="auth-container__form-btn"
            type="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
          <p>
            Already have an Account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
