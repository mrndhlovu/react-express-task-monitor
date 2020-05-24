import React from "react";
import styled from "styled-components";
import HomeSideMenu from "../home/HomeSideMenu";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";
import { useAuth } from "../../utils/hookUtils";

const wrapperStyle = {
  background: "#026aa7",
  padding: " 20px 10px",
  height: "20%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};

const style = {
  position: "relative,",
  width: "66vw",
  height: "100vh",
  padding: 0,
};

const Span = styled.span`
  font-size: 20px;
  text-align: left;
  padding: 10px 0;
`;

const MobileSideMenu = ({ visible, setVisible, history }) => {
  const { fname, email } = useAuth().user;

  return (
    <SideBarWrapper
      direction="left"
      icon="labeled"
      handleClose={() => setVisible(false)}
      open={visible}
      style={style}
      hasHeader={false}
      onHide={() => setVisible(false)}
      className="mobile-side-menu"
    >
      <UIWrapper display={wrapperStyle}>
        <NavUserAvatar
          callback={() => setVisible(false)}
          pointing="left"
          userName={fname}
          history={history}
        />
        <Span>{fname}</Span>
        <small>{email}</small>
      </UIWrapper>
      <HomeSideMenu history={history} callback={() => setVisible(false)} />
      <UIDivider margin="0" />
    </SideBarWrapper>
  );
};

export default MobileSideMenu;
