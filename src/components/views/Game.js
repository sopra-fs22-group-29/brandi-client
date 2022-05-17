import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { createLobby, joinLobby } from "helpers/allGame";
import { handleError } from "helpers/api";
import { logout } from "helpers/authentification";
import { connect } from "helpers/webSocket";
import PropTypes from "prop-types";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import "styles/views/Game.scss";
import "styles/views/Welcome.scss";
import Header from "./Header";

const Games = ({ game }) => (
  <div className="game halted-container">
    <p className="game name">{game.name}</p>
    <Link to={game.link}>
      <Button className="game rejoin">Rejoin</Button>
    </Link>
  </div>
);

Games.propTypes = {
  game: PropTypes.object,
};

const FormFiled = (props) => {
  return (
    <div className="login field">
      <input
        className="login input"
        placeholder="Code..."
        disabled={props.disabled}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormFiled.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const mockData = [
  {
    name: "SuperGame",
    link: "/game/SuperGame",
    id: 1,
  },
  {
    name: "UZHCrew",
    link: "/game/UZHCrew",
    id: 2,
  },
  {
    name: "CoolTeam",
    link: "/game/CoolTeam",
    id: 3,
  },
];

const Game = () => {
  const history = useHistory();

  const [games, setGames] = useState(mockData);
  const [enterCode, setEnterCode] = useState("");
  const [createCode, setCreateCode] = useState("");
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const doLogout = async () => {
    try {
      await logout(() => {
        history.push("/welcome");
      });
    } catch (error) {
      alert(`Something went wrong during logout: \n${handleError(error)}`);
    }
  };

  const doLobby = async () => {
    try {
      const response = await createLobby(user.id);
      setCreated(true);
      const data = response.data;
      setCreateCode(data);
    } catch (error) {
      alert(
        `Something went wrong while creating a lobby: \n${handleError(error)}`
      );
    }
  };

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const enterLobby = async (lobbyId) => {
    try {
      await joinLobby(lobbyId, user.id, () => {
        history.push("/board/" + lobbyId);
      });
    } catch (error) {
      alert(
        `Something went wrong while joining the lobby: \n${handleError(error)}`
      );
    }
  };

  const connectToWebsocket = async (lobbyId) => {
    try {
      await connect(lobbyId);
    } catch (error) {
      alert(
        `Something went wrong while connection to the lobby-websocket: \n${handleError(
          error
        )}`
      );
    }
  };

  const userProfile = () => {
    try {
      history.push("/users/" + user.id);
    } catch (error) {
      alert(
        `Something went wrong while redirecting to Profile Page: \n${handleError(
          error
        )}`
      );
    }
  };

  let content = (
    <BaseContainer className="create container">
      <p className="welcome container-text">Create a new Game Code</p>
      <p>Click the button to get a game code !</p>
      <Button className="login button" onClick={() => doLobby()}>
        Get Code !
      </Button>
      <p className="welcome container-text">Join a Game</p>
      <p>Enter a game code !</p>
      <FormFiled
        value={enterCode}
        onChange={(gn) => setEnterCode(gn)}
        disabled={created}
      />
      <Button
        className="login button"
        disabled={!enterCode}
        onClick={() => {
          // connectToWebsocket(enterCode);
          enterLobby(enterCode);
        }}
      >
        Join
      </Button>
    </BaseContainer>
  );
  if (created) {
    content = (
      <BaseContainer className="create container">
        <p className="welcome container-text">Game Code Created !</p>
        <p>Share your Code with your Friends !</p>
        <FormFiled value={createCode} disabled={created} />
        <div className="game button-container">
          <Button className="login button" onClick={() => copyLink(createCode)}>
            {copied ? "Copied !" : "Copy"}
          </Button>
          <Button
            className="login button"
            onClick={() => {
              // connectToWebsocket(createCode);
              enterLobby(createCode);
            }}
          >
            Join
          </Button>
        </div>
        <p className="welcome container-text">Join a Game</p>
        <p>Enter a game code !</p>
        <FormFiled
          value={enterCode}
          onChange={(gn) => setEnterCode(gn)}
          disabled={false}
        />
        <Button
          className="login button"
          disabled={!enterCode}
          onClick={() => {
            // connectToWebsocket(enterCode);
            enterLobby(enterCode);
          }}
        >
          Join
        </Button>
      </BaseContainer>
    );
  }

  return (
    <div>
      <Header height="40px" />
      <BiUser className="game icons" onClick={() => userProfile()} />
      <IoLogOutOutline className="game icons-2" onClick={() => doLogout()} />
      <div className="top">
        <BaseContainer className="game container">
          <p className="welcome container-text">Halted Games</p>
          <div className="game test">
            {games.map((game) => (
              <Games game={game} key={game.name} />
            ))}
          </div>
        </BaseContainer>
        {content}
      </div>
    </div>
  );
};

export default Game;
