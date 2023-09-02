import "./home.css";

import { Button, Card, Tag, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
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
      <Typography.Title level={1}>
        Finally enjoy sprint planning with your teammates
      </Typography.Title>

      <div className="home-content">
        <div className="features">
          <Card>
            <Paragraph>
              <Typography.Title level={3}>
                🌟 Unleash Interactive Sprint Planning!
              </Typography.Title>

              <blockquote>
                Elevate your team's sprint planning and collaboration to new
                heights!
              </blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph>
              <Typography.Title level={3}>💵 Why Pay?!</Typography.Title>
              <blockquote>
                You could just... <strong>not do that.</strong>
              </blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph>
              <Typography.Title level={3}>
                🎨 Express Yourself with Avatars & Display Names!
              </Typography.Title>
              <blockquote>No login, no hassle.</blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph>
              <Typography.Title level={3}>
                🔨 Nudge the Procrastinators with a Friendly BONK!
              </Typography.Title>
              <blockquote>
                Give a playful reminder to those AFK teammates who need a little
                push to cast their votes.
              </blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph>
              <Typography.Title level={3}>📝 Share Notes!</Typography.Title>
              <blockquote>
                Easily share links and important information with your team.
              </blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph>
              <Typography.Title level={3}>
                📊 Calculated Averages & Consensus!
              </Typography.Title>
              <blockquote>
                Get instant insights into your team's collective wisdom, making
                decision-making a breeze.
              </blockquote>
            </Paragraph>
          </Card>

          <Card>
            <Paragraph onMouseOver={pop}>
              <Typography.Title level={3}>🎉🎉🎉🎉</Typography.Title>
            </Paragraph>
          </Card>
        </div>
        <div className="screenshot">
          <img
            src="/home-example.png"
            alt="example planning session screenshot"
            width="100%"
            height="auto"
          />
        </div>
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
