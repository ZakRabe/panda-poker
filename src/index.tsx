import "./styles.css";
import "antd/dist/antd.min.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserContext from "./App/UserContext";
import { useUser } from "./hooks/useUser";
import Game from "./pages/Game/Game";
import Home from "./pages/Home";
import New from "./pages/New";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:gameId",
    element: <Game />,
  },
  {
    path: "/new",
    element: <New />,
  },
]);

const Root = () => {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById("root")
);
