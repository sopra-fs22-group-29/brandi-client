import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { handleError } from "helpers/api";
import { getUser, logout } from "helpers/authentification";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "styles/views/UserProfile.scss";
import Header from "./Header";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

const FormField = (props) => {
  return (
    <div className="userProfile field">
      <label className="userProfile label">{props.label}</label>
      <input
        disabled={props.edit}
        className={
          props.edit
            ? "userProfile input-disabled"
            : "userProfile input-enabled"
        }
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  edit: PropTypes.bool,
};

const UserProfile = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUser(userId);

        setUsername(response.data.username);
        setPassword(response.data.password);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the user! See the console for details."
        );
      }
    }

    fetchData();
  });
  const doLogout = async () => {
    try {
      await logout(() => {
        history.push("/welcome");
      });
    } catch (error) {
      alert(`Something went wrong during logout: \n${handleError(error)}`);
    }
  };

  const goHome = () => {
    try {
      history.push("/game");
    } catch (error) {
      alert(
        `Something went wrong while redirecting to Home Page: \n${handleError(
          error
        )}`
      );
    }
  };
  return (
    <div>
      <Header height="40px" />
      <IoHomeOutline className="game icons" onClick={() => goHome()} />
      <IoLogOutOutline className="game icons-2" onClick={() => doLogout()} />
      <BaseContainer className="userProfile container">
        {edit ? (
          <AiOutlineEdit
            className="userProfile icons-edit"
            onClick={() => setEdit(false)}
          />
        ) : (
          <AiOutlineClose
            className="userProfile icons-edit"
            onClick={() => setEdit(true)}
          />
        )}
        <BiUser className="userProfile icons-user" />
        <p className="userProfile container-text">Profile</p>
        <div className="userProfile container-fields">
          <FormField
            edit={edit}
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
        </div>
        {edit ? (
          ""
        ) : (
          <div className="userProfile button-container">
            <Button className="userProfile button">Save</Button>{" "}
            <Button
              className="userProfile button"
              style={{ backgroundColor: "#F07668" }}
            >
              Delete
            </Button>
          </div>
        )}
      </BaseContainer>
    </div>
  );
};

export default UserProfile;
