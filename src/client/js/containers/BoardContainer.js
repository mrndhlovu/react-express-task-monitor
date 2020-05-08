import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardContext, MainContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite,
  requestUserUpdate,
} from "../apis/apiRequests";

import { getActivity, emptyFunction, resetForm } from "../utils/appUtils";
import Board from "../components/boardDetail/Board";
import BoardHeader from "../components/boardDetail/BoardHeader";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";
import { useAuth } from "../utils/hookUtils";

const StyledContainer = styled.div`
  height: 100vh;
  background-color: ${(props) => props.bgColor};
`;

const ContentDiv = styled.div`
  display: grid;
  height: ${(props) => (props.mobile ? "92vh" : "96vh")};
  left: 0;
  position: relative;
  top: 0%;
  width: 100%;
`;

const BoardContainer = ({ match, history }) => {
  const { id } = match.params;
  const { device, getNavData } = useContext(MainContext);
  const { auth, user } = useAuth();

  const [board, setBoard] = useState(null);
  const [invite, setInvite] = useState(null);
  const [inviteDone, setInviteDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [starred, setStarred] = useState(false);
  const [unStarred, setUnStarred] = useState(false);
  const [updatedField, setUpdatedField] = useState(null);

  const [showMobileMenu, setShowMobileMenu] = useState();

  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const handleBoardUpdate = useMemo(
    () => (changes, fieldId = "lists", activity, callback, newId) => {
      if (!changes) return setBoard(null);
      saveBoardChanges(changes);
      setUpdatedField({ fieldId, activity, callback, newId });
    },
    []
  );

  const saveBoardChanges = (changes) => setBoard(changes);

  const changeBoardAccessLevel = (option) => {
    const newBoard = {
      ...board,
      accessLevel: { ...PERMISSIONS, [option]: true },
    };

    handleBoardUpdate(newBoard, "accessLevel", "changeAccess");
  };

  const handleDeleteBoard = useCallback(() => {
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id), 1);
    requestBoardDelete(id);
    const updateUser = async () => {
      await requestUserUpdate({ starred: user.starred }).then(() => {
        try {
          history.push("/");
        } catch (error) {
          alert(error.message);
        }
      });
    };
    updateUser();
  }, [history, id, user]);

  const handleSelectedColor = (color) => {
    const newBoard = {
      ...board,
      styleProperties: { ...board.styleProperties, color },
    };

    handleBoardUpdate(newBoard, "styleProperties", "color");
  };

  const handleBoardStarClick = () => {
    if (user.starred.includes(id)) {
      user.starred.splice(user.starred.indexOf(id), 1);
      setUnStarred(true);
    } else {
      user.starred.push(id);
      setStarred(true);
    }
  };

  useEffect(() => {
    if (!starred && !unStarred) return emptyFunction();

    const updateUser = async () => {
      await requestUserUpdate({ starred: user.starred });
      return () => {
        setStarred(false);
        setUnStarred(false);
      };
    };

    updateUser();
  }, [starred, user, unStarred]);

  useEffect(() => {
    if (!invite) return emptyFunction();
    setLoading(true);
    const inviteUser = async () => {
      await requestUserInvite(id, invite)
        .then(() => {
          setInviteDone(true);
          setLoading(false);
          setInvite(null);
          resetForm("invite-input");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = (email) => setInvite(email);

  useEffect(() => {
    if (!updatedField) return emptyFunction();
    const serverUpdate = async () => {
      const { fieldId, activity, newId, callback } = updatedField;

      const { fname } = auth.data.data;
      const userAction = getActivity(fname, activity);
      activity &&
        board.activities.push({ activity: userAction, createdAt: Date.now() });
      const update = {
        [fieldId]: board[fieldId],
        activities: board.activities,
      };

      await requestBoardUpdate(newId ? newId : id, update).then((res) => {
        getNavData(res.data.styleProperties.color);
        if (callback) callback();
      });
    };

    serverUpdate();
    setUpdatedField(null);
  }, [id, updatedField, board, auth, getNavData]);

  useEffect(() => {
    if (board) return emptyFunction();
    const fetchData = async () =>
      await requestBoardDetail(id)
        .then((res) => {
          getNavData(res.data.styleProperties.color);
          return setBoard(res.data);
        })
        .catch(() => history.push("/"));

    auth.authenticated && fetchData();
  }, [board, updatedField, id, history, getNavData, auth]);

  return !board ? (
    <UILoadingSpinner />
  ) : (
    <BoardContext.Provider
      value={{
        board,
        auth,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleBoardUpdate,
        handleSelectedColor,
        handleDeleteBoard,
        handleInviteClick,
        handleShowMenuClick,
        id,
        inviteDone,
        loading,
        saveBoardChanges,
        showSideBar,
        showMobileMenu,
        setShowMobileMenu,
      }}
    >
      <StyledContainer bgColor={board.styleProperties.color}>
        <ContentDiv mobile={device.mobile}>
          {!device.mobile && <BoardHeader user={user} />}

          <Board />
        </ContentDiv>
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
