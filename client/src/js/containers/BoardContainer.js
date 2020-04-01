import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Sidebar } from "semantic-ui-react";

import { BoardContext, MainContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite,
  requestUserUpdate
} from "../apis/apiRequests";

import { getActivity, emptyFunction, resetForm } from "../utils/appUtils";
import Board from "../components/boardDetail/Board";
import BoardHeader from "../components/boardDetail/BoardHeader";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  background-color: ${props => props.bgColor};
`;

const ContentDiv = styled.div`
  display: grid;
  left: 0;
  position: absolute;
  top: ${props => (props.mobile ? "20%" : "7%")};
  width: 100%;
`;

const BoardContainer = ({ match, history }) => {
  const { id } = match.params;
  const { device, auth } = useContext(MainContext);

  const [board, setBoard] = useState(null);
  const [invite, setInvite] = useState(null);
  const [user, setUser] = useState(auth.user);
  const [loading, setLoading] = useState(false);
  const [starred, setStarred] = useState(false);
  const [unStarred, setUnStarred] = useState(false);
  const [updatedField, setUpdatedField] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [inviteDone, setInviteDone] = useState(false);

  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const backendUpdate = useMemo(
    () => (changes, fieldId, activity) => {
      saveBoardChanges(changes);
      setUpdatedField({ fieldId, activity });
    },
    []
  );

  const saveBoardChanges = changes => setBoard(changes);

  const changeBoardAccessLevel = option => {
    const newBoard = {
      ...board,
      accessLevel: { ...PERMISSIONS, [option]: true }
    };

    backendUpdate(newBoard, "accessLevel", "changeAccess");
  };

  const handleDeleteBoard = useCallback(() => {
    requestBoardDelete(id);
    history.push("/");
  }, [history, id]);

  const handleColorPick = color => {
    const newBoard = {
      ...board,
      styleProperties: { ...board.styleProperties, color }
    };

    backendUpdate(newBoard, "styleProperties", "color");
  };

  const handleBoardStarClick = () => {
    if (user.starred.includes(id)) {
      user.starred.splice(user.starred.indexOf(id));
      setUnStarred(true);
    } else {
      user.starred.push(id);
      setStarred(true);
    }
  };

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    if (!starred && !unStarred) return emptyFunction();

    const upUserInfo = async () => {
      await requestUserUpdate({ starred: user.starred }).then(res => {
        try {
        } catch (error) {
          alert(error.message);
        }
      });
    };

    upUserInfo();

    return () => {
      setStarred(false);
      setUnStarred(false);
    };
  }, [starred, user, unStarred]);

  useEffect(() => {
    if (!invite) return emptyFunction();
    setLoading(true);
    const inviteUser = async () => {
      await requestUserInvite(id, invite)
        .then(res => {
          setInviteDone(true);
          setLoading(false);
          setInvite(null);
          resetForm("invite-input");
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = email => setInvite(email);

  useEffect(() => {
    if (!updatedField) return emptyFunction();
    const serverUpdate = async () => {
      const { fieldId, activity } = updatedField;
      const { fname } = auth.user;
      const userAction = getActivity(fname, activity);
      board.activities.push({ activity: userAction, createdAt: Date.now() });
      const update = {
        [fieldId]: board[fieldId],
        activities: board.activities
      };

      await requestBoardUpdate(id, update).then(() => {});
    };

    serverUpdate();
    setUpdatedField(null);
  }, [id, updatedField, board, auth]);

  useEffect(() => {
    if (board) return emptyFunction();
    const fetchData = async () =>
      await requestBoardDetail(id)
        .then(res => {
          return setBoard(res.data);
        })
        .catch(error => history.push("/"));

    fetchData();
    return () => {
      console.log("Un mount");
    };
  }, [board, updatedField, id, history]);

  return !board ? (
    <UILoadingSpinner />
  ) : (
    <BoardContext.Provider
      value={{
        backendUpdate,
        board,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        handleInviteClick,
        handleShowMenuClick,
        inviteDone,
        id,
        loading,
        saveBoardChanges,
        showSideBar
      }}
    >
      <Container bgColor={board.styleProperties.color}>
        <StyledContainer>
          <BoardHeader />
          <ContentDiv mobile={device.mobile}>
            <Sidebar.Pushable>
              <Board />
            </Sidebar.Pushable>
          </ContentDiv>
        </StyledContainer>
      </Container>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
