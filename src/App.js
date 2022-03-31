import AppRouter from "components/routing/routers/AppRouter";
import Header from "components/views/Header";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
