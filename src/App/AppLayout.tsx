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
          <a href="/" className="logo">
            <img alt="logo" src="/logo.png" />
          </a>
          <Typography.Title className="title">panda-poker</Typography.Title>
          <div className="new-game">
            <Link to="/new">
              <Button type="primary" size="large">
                Create a Game
              </Button>
            </Link>
          </div>
          <Button className="profile" onClick={() => setProfileOpen(true)}>
            {!!img && (
              <img className="avatar" src={img} alt={`${name} avatar`} />
            )}
            {name && <span>{name}</span>}
            {!img && !name && "🚀"}
          </Button>
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
