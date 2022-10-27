import { ref, set } from '@firebase/database'
import { Button, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuid } from 'uuid'

import AppLayout from './AppLayout'
import database from './firebase'

const New = () => {
  useEffect(() => {
    document.title = "New Game";
  }, []);
  const navigate = useNavigate();
  const [name, setName] = useState("New Poker Game");

  const onCreate = () => {
    const newGameId = uuid().substr(0, 8);
    const path = `games/${newGameId}`;
    const gameRef = ref(database, path);
    set(gameRef, { players: {}, name }).then(() => navigate(`/${newGameId}`));
  };
  return (
    <AppLayout>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography.Title>New Game</Typography.Title>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="name">Game Name</label>
          <Input
            name="name"
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
            }}
          />
        </div>
        <Button
          size="large"
          type="primary"
          style={{ marginLeft: "auto" }}
          onClick={onCreate}
        >
          Create
        </Button>
      </div>
    </AppLayout>
  );
};

export default New;
