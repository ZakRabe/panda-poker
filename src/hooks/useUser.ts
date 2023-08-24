import { get, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import database from "../firebase";
import { User, UserDto } from "../types";

export const useUser = () => {
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

    const userRef = ref(database, `users/${user.id}`);
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
      .catch(console.error);
    // watch the database user for changes
    return onValue(userRef, (snapshot) => {
      const dto: UserDto = snapshot.val();
      setUser({ id: user.id, ...dto });
    });
  }, [user.id]);

  return user;
};
