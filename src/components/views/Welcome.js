import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import { handleError } from "helpers/api";
import "styles/views/Welcome.scss";

const Welcome = () => {
  const history = useHistory();
  const login = () => {
    try {
      history.push("/login");
    } catch (error) {
      alert(
        `Something went wrong when redirecting to Login Page: \n${handleError(
          error
        )}`
      );
    }
  };
  const register = () => {
    try {
      history.push("/register");
    } catch (error) {
      alert(
        `Something went wrong when redirecting to Registration Page: \n${handleError(
          error
        )}`
      );
    }
  };
  return (
    <div className="top">
      <div className="welcome container-title">
        <p className="welcome title">Welcome to Brändi Dog !</p>
      </div>
      <BaseContainer className="welcome container">
        <p className="welcome container-text">Start playing !</p>
        {/* <BaseContainer className="welcome button-container"> */}
        <div className="welcome button-container">
          <Button className="welcome button" onClick={() => login()}>
            Login
          </Button>
          <Button className="welcome button" onClick={() => register()}>
            Register
          </Button>
        </div>
        {/* </BaseContainer> */}
      </BaseContainer>
    </div>
  );
};

export default Welcome;
