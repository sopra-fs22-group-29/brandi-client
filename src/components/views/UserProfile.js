import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { handleError } from "helpers/api";
import {
  getUser,
  logout,
  updateUser,
  userAuthData,
} from "helpers/authentification";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "styles/views/UserProfile.scss";
import Header from "./Header";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useParams } from "react-router-dom";

const FormField = (props) => {
  return (
    <div className="userProfile field">
      <label className="userProfile label">{props.label}</label>
      <input
        type={props.type}
        disabled={props.disabled}
        className={
          props.disabled
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
const FormFieldPassword = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        disabled={props.disabled}
        type={props.passwordShown ? "text" : "password"}
        className="login input"
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
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
FormFieldPassword.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  passwordShown: PropTypes.bool,
  disabled: PropTypes.bool,
};

const UserProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [edit, setEdit] = useState(false);
  const [passwordContent, setPasswordContent] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const authData = userAuthData();
  const [password, setPassword] = useState(
    window.atob(authData).split(":").pop()
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUser(userId);
        setUsername(response.data.username);
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
  const handleUpdate = async () => {
    try {
      if (updateUsername === "") {
        await updateUser(username, password, id, authData);
      } else {
        await updateUser(updateUsername, password, id, authData);
      }
      window.location.reload();
    } catch (error) {
      alert(
        `Something went wrong while updating the user: \n${handleError(error)}`
      );
    }
  };

  const doEdit = () => {
    setEdit(true);
    setPassword(window.atob(authData).split(":").pop());
    setPasswordContent(true);
    setUpdateUsername(username);
  };

  const closeEdit = () => {
    setEdit(false);
    setPassword(window.atob(authData).split(":").pop());
    setPasswordContent(false);
  };

  let content = (
    <div>
      <p className="userProfile container-text">Profile</p>
      <div className="userProfile container-fields">
        <FormField disabled={true} label="Username" value={username} />
        <FormFieldPassword
          disabled={true}
          label="Password"
          value={password}
          passwordShown={passwordContent}
        />
      </div>
    </div>
  );
  if (edit === true) {
    content = (
      <div>
        <p className="userProfile container-text">Edit Profile</p>
        <div className="userProfile container-fields">
          <FormField
            disabled={false}
            label="Username"
            value={updateUsername}
            onChange={(un) => setUpdateUsername(un)}
          />
          <FormFieldPassword
            disabled={false}
            label="Password"
            value={password}
            passwordShown={passwordContent}
            onChange={(pw) => setPassword(pw)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header height="40px" />
      <IoHomeOutline className="game icons" onClick={() => goHome()} />
      <IoLogOutOutline className="game icons-2" onClick={() => doLogout()} />
      <BaseContainer className="userProfile container">
        {edit ? (
          <AiOutlineClose
            className="userProfile icons-edit"
            onClick={() => closeEdit()}
          />
        ) : (
          <AiOutlineEdit
            className="userProfile icons-edit"
            onClick={() => doEdit()}
          />
        )}
        <BiUser className="userProfile icons-user" />
        {content}
        {edit ? (
          <div className="userProfile button-container">
            <Button
              className="userProfile button"
              onClick={() => handleUpdate()}
            >
              Save
            </Button>{" "}
            {/* <Button
              className="userProfile button"
              style={{ backgroundColor: "#F07668" }}
            >
              Delete
            </Button> */}
          </div>
        ) : (
          ""
        )}
      </BaseContainer>
    </div>
  );
};

export default UserProfile;
