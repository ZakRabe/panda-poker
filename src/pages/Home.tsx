import { Button, Tag, Typography } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../App/AppLayout";
import { pop } from "../App/confetti";

const Home = () => {
  useEffect(() => {
    document.title = "panda-poker";
  }, []);
  return (
    <AppLayout>
      <Typography.Title>Welcome</Typography.Title>
      <p>
        Why pay for premium when you could just... <strong>not</strong> do that?
      </p>

      <div className="new-game">
        <Link to="/new">
          <Button type="primary" size="large">
            Create a Game
          </Button>
        </Link>
      </div>

      <div className="recipe">
        <h2>Recipe</h2>

        <a target="_blank" href="https://github.com/ZakRabe" rel="noreferrer">
          <Tag color="magenta">❤️</Tag>
        </a>

        <a
          target="_blank"
          href="https://firebase.google.com/docs/database/web/start"
          rel="noreferrer"
        >
          <Tag color="red">🔥 firebase v9</Tag>
        </a>

        <a target="_blank" href="https://4x.ant.design/" rel="noreferrer">
          <Tag color="green">🐜 ant design v4</Tag>
        </a>

        <a
          target="_blank"
          href="https://github.com/catdad/canvas-confetti"
          rel="noreferrer"
        >
          <Tag onMouseOver={pop} color="cyan">
            🎉 canvas-confetti v1
          </Tag>
        </a>

        <a
          target="_blank"
          href="https://github.com/vasturiano/react-force-graph"
          rel="noreferrer"
        >
          <Tag color="geekblue">📈 react-force-graph v1</Tag>
        </a>

        <a
          target="_blank"
          href="https://reactrouter.com/en/6.15.0"
          rel="noreferrer"
        >
          <Tag color="blue">🚌 react-router v6</Tag>
        </a>

        <a target="_blank" href="https://reactjs.org/" rel="noreferrer">
          <Tag color="purple">♻️ react v17</Tag>
        </a>

        <a
          target="_blank"
          href="https://github.com/ZakRabe/panda-poker"
          rel="noreferrer"
        >
          <Tag color="gold">⌨️ source</Tag>
        </a>
      </div>
    </AppLayout>
  );
};

export default Home;
