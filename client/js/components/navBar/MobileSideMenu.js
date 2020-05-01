import React from "react";
import styled from "styled-components";

import HomeSideMenu from "../home/HomeSideMenu";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIDivider from "../sharedComponents/UIDivider";

const wrapperStyle = {
  background: "#026aa7",
  padding: " 20px 10px",
  height: "20%",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};

const style = {
  position: "relative,",
  width: "62vw",
  height: "100vh",
  padding: 0,
};

const Span = styled.span`
  font-size: 20px;
  text-align: left;
  padding: 10px 0;
`;

const MobileSideMenu = ({ visible, setVisible, user, history }) => {
  return (
    <SideBarWrapper
      direction="left"
      icon="labeled"
      handleClose={setVisible}
      open={visible}
      style={style}
      hasHeader={false}
      onHide={setVisible}
    >
      <UIWrapper display={wrapperStyle}>
        <NavUserAvatar
          callback={() => setVisible()}
          pointing="left"
          userName={user.fname}
          history={history}
        />
        <Span>{user.fname}</Span>
        <small>{user.email}</small>
      </UIWrapper>
      <HomeSideMenu />
      <UIDivider margin="0" />
    </SideBarWrapper>
  );
};

export default MobileSideMenu;
