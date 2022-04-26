import { GameGuard } from "components/routing/routeProtectors/GameGuard";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import GameRouter from "components/routing/routers/GameRouter";
import Login from "components/views/Login";
import BasicBoard from "components/views/BasicBoard";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Welcome from "components/views/Welcome";
import Register from "components/views/Register";
import GameInitial from "components/views/GameInitial";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game" />
          </GameGuard>
        </Route>
        <Route exact path="/welcome">
          <LoginGuard>
            <Welcome />
          </LoginGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Register />
          </LoginGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/board/:lobbyUuid">
          <GameInitial />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;
