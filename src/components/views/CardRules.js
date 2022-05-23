import BaseContainer from "components/ui/BaseContainer";

const CardRules = () => {
  return (
    <div>
      <BaseContainer className="rules container">
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
export default CardRules;
