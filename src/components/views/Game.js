import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { logout } from "helpers/authentification";
import { Link } from "react-router-dom";

const Games = ({ game }) => (
  <div>
    <p className="player name">
      {game.name}
      <Link to={game.link}>
        <Button className="game rejoin">Rejoin</Button>
      </Link>
    </p>
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
        placeholder="Game name"
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
  const [gameName, setGameName] = useState(null);
  const [gameLink, setGameLink] = useState(null);
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);

  const doLogout = async () => {
    try {
      await logout(() => {
        history.push("/welcome");
      });
    } catch (error) {
      alert(`Something went wrong during logout: \n${handleError(error)}`);
    }
  };

  const createLink = () => {
    //needs to be implemented
    setCreated(true);
    const link = "www.bg.com/game/" + gameName;
    setGameLink(link);
  };

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  // useEffect(() => {
  // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  //   async function fetchData() {
  //     try {
  //       const response = await api.get("/users");

  //       // delays continuous execution of an async operation for 1 second.
  //       // This is just a fake async call, so that the spinner can be displayed
  //       // feel free to remove it :)
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Get the returned users and update the state.
  //       setUsers(response.data);

  //       // This is just some data for you to see what is available.
  //       // Feel free to remove it.
  //       console.log("request to:", response.request.responseURL);
  //       console.log("status code:", response.status);
  //       console.log("status text:", response.statusText);
  //       console.log("requested data:", response.data);

  //       // See here to get more data.
  //       console.log(response);
  //     } catch (error) {
  //       console.error(
  //         `Something went wrong while fetching the users: \n${handleError(
  //           error
  //         )}`
  //       );
  //       console.error("Details:", error);
  //       alert(
  //         "Something went wrong while fetching the users! See the console for details."
  //       );
  //     }
  //   }

  //   fetchData();
  // }, []);

  let content = (
    <BaseContainer className="create container">
      <p className="welcome container-text">Create a new Game Link</p>
      <p>Enter a game name to create a link !</p>
      <FormFiled
        value={gameName}
        onChange={(gn) => setGameName(gn)}
        disabled={created}
      />
      <Button
        className="login button"
        disabled={!gameName}
        onClick={() => createLink()}
      >
        Create
      </Button>
    </BaseContainer>
  );

  if (created) {
    content = (
      <BaseContainer className="create container">
        <p className="welcome container-text">Game Link Created !</p>
        <p>Share your Link with your Friends !</p>
        <FormFiled value={gameLink} disabled={created} />
        <Button className="login button" onClick={() => copyLink(gameLink)}>
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button className="login button">Join</Button>
      </BaseContainer>
    );
  }

  return (
    <div>
      <BaseContainer className="game container">
        <p className="welcome container-text">Halted Games</p>
        <p className="game test">
          {games.map((game) => (
            <Games game={game} key={game.name} />
          ))}
        </p>
      </BaseContainer>
      {content}
    </div>
  );
};

export default Game;
