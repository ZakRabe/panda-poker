import { Button, Layout, Typography } from "antd";
import { FC, useContext, useState } from "react";

import EditUser from "./EditUser";
import UserContext from "./UserContext";

// TODO: Move styles to CSS
const AppLayout: FC<{ className?: string }> = ({ children, className }) => {
  const { name, img } = useContext(UserContext);
  const [isProfileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <Layout className={className}>
        <Layout.Header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{ height: "calc(100% - 15px)", margin: 15, lineHeight: 1 }}
          >
            <img alt="logo" src="/logo.png" style={{ height: "100%" }} />
          </a>
          <Typography.Title style={{ margin: 0, color: "#47271a" }}>
            Panda Poker
          </Typography.Title>

          <Button
            style={{ marginLeft: "auto" }}
            onClick={() => setProfileOpen(true)}
          >
            {!!img && (
              <img
                src={img}
                alt={`${name} avatar`}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 5,
                  borderRadius: "50%",
                }}
              />
            )}
            {name}
            {!img && !name && "🚀"}
          </Button>
        </Layout.Header>
        <Layout.Content
          style={{
            padding: "0 50px",
            margin: 0,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Layout.Content>
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
