import 'antd/dist/antd.css'

import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'

import AppLayout from './AppLayout'
import { pop } from './confetti'

const Home = () => {
  return (
    <AppLayout>
      <Typography.Title>Welcome</Typography.Title>
      <p>
        Why pay for premium when you could just... <strong>not</strong> do that?
      </p>

      <div style={{ textAlign: "center" }}>
        <Link to="/new">
          <Button type="primary" size="large">
            Create a Game
          </Button>
        </Link>
      </div>

      <h2>Tech stack</h2>
      <ul>
        <li>
          <a target="_blank" href="https://github.com/ZakRabe" rel="noreferrer">
            ❤️
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://firebase.google.com/docs/database"
            rel="noreferrer"
          >
            firebase v9
          </a>
        </li>
        <li>
          <a target="_blank" href="https://ant.design/" rel="noreferrer">
            ant design v4
          </a>
        </li>

        <li onClick={pop}>
          {/* eslint-disable-next-line */}
          <a href="javascript:;">canvas-confetti v1</a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://reactrouter.com/en/main"
            rel="noreferrer"
          >
            react-router v6
          </a>
        </li>
        <li>
          <a target="_blank" href="https://reactjs.org/" rel="noreferrer">
            react v17
          </a>
        </li>
      </ul>
      <p>
        <a
          target="_blank"
          href="https://github.com/ZakRabe/persefoni-poker"
          rel="noreferrer"
        >
          <img src="/github.png" alt="Github" style={{ marginRight: 10 }} />
          Source
        </a>
      </p>
    </AppLayout>
  );
};

export default Home;
