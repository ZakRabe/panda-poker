import { Button, Layout, Typography } from "antd";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";

import EditUser from "./EditUser";
import UserContext from "./UserContext";

const AppLayout: FC<{ className?: string }> = ({ children, className }) => {
  const { name, img } = useContext(UserContext);
  const [isProfileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <Layout className={className}>
        <Layout.Header>
          <div className="header-brand">
            <a href="/" className="logo">
              <img alt="logo" src="/logo.png" />
            </a>
            <Typography.Title className="title">panda-poker</Typography.Title>
          </div>

          <div className="header-buttons">
            <Link to="/new">
              <Button type="primary" size="large" className="createGame-button">
                Create a Game
              </Button>
            </Link>
            <Button className="profile" onClick={() => setProfileOpen(true)}>
              {!!img && (
                <img className="avatar" src={img} alt={`${name} avatar`} />
              )}
              {name && <span>{name}</span>}
              {!img && !name && "🚀"}
            </Button>
          </div>
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>

      <EditUser
        open={isProfileOpen}
        onCancel={() => setProfileOpen(false)}
        onOk={() => setProfileOpen(false)}
      />
    </>
  );
};

export default AppLayout;
