import BaseContainer from "components/ui/BaseContainer";
import { handleError } from "helpers/api";
import { IoHomeOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import "styles/views/Rules.scss";
import { AiOutlineClose } from "react-icons/ai";

const Rules = () => {
  const history = useHistory();
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
  const doClose = () => {
    window.close();
  };
  return (
    <div>
      <Header height="40px" />
      {history.location.state === undefined ? (
        <AiOutlineClose className="game icons-2" onClick={() => doClose()} />
      ) : (
        <IoHomeOutline className="game icons-2" onClick={() => goHome()} />
      )}

      <BaseContainer className="rules container">
        <p className="welcome container-text">Game Rules</p>
        <p className="rules heading">General</p>
        <p className="rules text">
          Brändi Dog is a board game played by 4 people. Each person gets
          assigned 4 marbles of one color (blue, red, yellow, or green). You
          must get your own marbles out of the home base and to the finish. The
          marbles are moved by playing cards (see bellow for value of cards). At
          the 1st round each player gets 6 cards, 2nd round 5 cards, 3rd round 4
          cards, 4th round 3 cards, and 5th round 2 cards. Then start again with
          6 cards, 5, 4, 3, 2, 6, 5 etc.{" "}
        </p>
        <p className="rules heading">Go to the start</p>
        <p className="rules text">
          In order to move a marble around the board you have to get it first
          out of your home base to the start position. To do so you can use the
          card Ace, King or Joker. Marbles which are played from the home base
          at the start position block access for all marbles (even your own).
          This marble is also protected and cannot be sent home.
        </p>
        <p className="rules heading"> Sending Home</p>
        <p className="rules text">
          If two marbles land on the same filed, the one that was there first is
          sent back to the home base. If a marble lands on the starting field
          again on the way to the finish, it no longer blocks the entrance and
          can be swapped or sent home. Marbles that are already at the finish
          cannot be sent back to the home base. <br />
          If a marble is overtaken by a Seven, then it is sent back to the home
          base.
        </p>
        <p className="rules heading">Overtaking</p>
        <p className="rules text">
          Marbles which are played out of the home base at the start position
          cannot be overtaken. Otherwise, overtaking is allowed.
        </p>
        <p className="rules heading">Exchanging</p>
        <p className="rules text">
          With Jack, your own marble must be exchanged with a marble from the
          other players, even if this is a disadvantage. Marbles that land on a
          player's start position for the first time, that are at the finish, or
          are still in the home base, cannot be exchanged. If only your own
          marbles are in play and the player cannot make any other moves, then
          the Jack can be played at the end without effect.
        </p>
        <p className="rules heading">Every card must be played</p>
        <p className="rules text">
          Even disadvantageous moves have to be made.
        </p>
        <p className="rules heading">Approaching the finish</p>
        <p className="rules text">
          In order to end up at the finish, a player's start must have been
          touched at least twice, whether going backwards or forwards.
          Leapfrogging and moving backwards to the finish are not allowed. It is
          filled from the inside to the outside. If you land directly again on
          the start you have to take an extra round.
        </p>
        <p className="rules heading">Card values</p>
        <table
          style={{
            width: "85%",
            borderCollapse: "collapse",
          }}
        >
          <tr className="rules table">
            <td>Ace</td>
            <td>Start</td>
            <td>1 Space</td>
            <td>11 Spaces</td>
          </tr>
          <tr className="rules table">
            <td>King</td>
            <td>Start</td>
            <td>13 Spaces</td>
          </tr>
          <tr className="rules table">
            <td>Queen</td>
            <td>12 Spaces</td>
          </tr>
          <tr className="rules table">
            <td>Four</td>
            <td colSpan={3}>4 spaces forwards or backwards</td>
          </tr>
          <tr className="rules table">
            <td>Jack</td>
            <td colSpan={3}>
              A marble must be exchanged with a marble belonging to the opponent
              or partner.
            </td>
          </tr>
          <tr className="rules table">
            <td>Seven</td>
            <td colSpan={3}>
              Can be split across the individual marbles in any forward moves.
              All 7 points have to be moved though. All marbles that are
              overtaken by the 7 have to go back to the home base.
            </td>
          </tr>
          <tr className="rules table">
            <td style={{ width: "190px" }}>All other number cards</td>
            <td colSpan={3}>
              Go forwards the number of spaces indicated by the face value of
              the card.
            </td>
          </tr>
          <tr className="rules table">
            <td>Joker</td>
            <td colSpan={3}>Use however you wish</td>
          </tr>
        </table>
      </BaseContainer>
    </div>
  );
};

export default Rules;
