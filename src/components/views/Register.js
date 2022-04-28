import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { handleError } from "helpers/api";
import { register } from "helpers/authentification";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "styles/views/Login.scss";
import "styles/views/Welcome.scss";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

const FormFieldPassword = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        type={props.passwordShown ? "text" : "password"}
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <Button className="eye" onClick={props.togglePassword}>
        {props.buttonDescription}
      </Button>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
FormFieldPassword.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  passwordShown: PropTypes.bool,
  togglePassword: PropTypes.func,
};

const Register = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [description, setDescription] = useState(true);

  const doRegistration = async () => {
    try {
      // Login successfull --> navigate to the route /game in the GameRouter
      await register(username, password, () => {
        history.push("/game");
      });
    } catch (error) {
      alert(
        `Something went wrong during the registration: \n${handleError(error)}`
      );
    }
  };

  const goBack = () => {
    try {
      history.push("/welcome");
    } catch (error) {
      alert(
        `Something went wrong when redirecting to Welcome Page: \n${handleError(
          error
        )}`
      );
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setDescription(!description);
  };

  return (
    <div className="top">
      <div className="welcome container-title">
        <p className="welcome title">Welcome to Brändi Dog !</p>
      </div>
      <BaseContainer className="login container">
        <p className="welcome container-text">Registration</p>
        <div className="login container-fields">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormFieldPassword
            label="Password"
            value={password}
            togglePassword={() => togglePassword()}
            passwordShown={passwordShown}
            onChange={(pw) => setPassword(pw)}
            buttonDescription={description ? <BsEyeSlash /> : <BsEye />}
          />
        </div>
        <div className="login button-container">
          <Button
            className="login button"
            disabled={!username || !password}
            onClick={() => doRegistration()}
          >
            Register
          </Button>
          <Button className="login button back" onClick={() => goBack()}>
            Back
          </Button>
        </div>
      </BaseContainer>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
