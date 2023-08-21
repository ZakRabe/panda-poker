import { ref, set } from "@firebase/database";
import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";

import AppLayout from "./AppLayout";
import database from "./firebase";

// TODO: move styles to CSS
const New = () => {
  useEffect(() => {
    document.title = "New Game";
  }, []);
  const navigate = useNavigate();
  const [name, setName] = useState("New panda-poker Game");

  const onCreate = () => {
    const newGameId = uuid().substr(0, 8);
    const gameRef = ref(database, `games/${newGameId}`);
    set(gameRef, { players: {}, name, bonks: {} }).then(() =>
      navigate(`/${newGameId}`)
    );
  };
  return (
    <AppLayout>
      <div className="create-game">
        <Typography.Title>Create a new game</Typography.Title>

        <label htmlFor="name">Name</label>
        <Input
          name="name"
          id="name"
          value={name}
          onChange={({ target: { value } }) => {
            setName(value);
          }}
        />

        <Button size="large" type="primary" onClick={onCreate}>
          Create
        </Button>
      </div>
    </AppLayout>
  );
};

export default New;
