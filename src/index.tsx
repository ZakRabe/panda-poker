import './styles.css'

import { get, onValue, ref, set } from '@firebase/database'
import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import database from './firebase'
import Game from './Game/Game'
import Home from './Home'
import New from './New'
import { User, UserDto } from './types'
import UserContext from './UserContext'

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

// TODO: Store list of user data in one place and expose through context
const Root = () => {
  const [user, setUser] = useState<User>({
    id: window.localStorage.getItem("userId") ?? "",
    name: "",
    img: "",
  });

  const [isNewUser] = useState(!user.id);

  // check for existing userId in localStorage
  useEffect(() => {
    if (!isNewUser) {
      return;
    }
    window.localStorage.setItem("userId", uuid());
    const newUserId = window.localStorage.getItem("userId")!;
    setUser((prev) => ({ ...prev, id: newUserId }));
  }, [isNewUser]);

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const path = `users/${user.id}`;
    const userRef = ref(database, path);
    //check for the user in the database
    get(userRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          // create a user if one doesn't exist
          set(userRef, {
            name: "",
            img: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // watch the database user for changes
    return onValue(userRef, (snapshot) => {
      const dto: UserDto = snapshot.val();
      setUser({ id: user.id, ...dto });
    });
  }, [user.id]);

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
