import BaseContainer from "./BaseContainer";
import { Button } from "./Button";

const Dialog = () => {
  return (
    <div>
      <BaseContainer className="create container" />
      <Button className="login button">Leave Game</Button>
    </div>
  );
};

export default Dialog;
