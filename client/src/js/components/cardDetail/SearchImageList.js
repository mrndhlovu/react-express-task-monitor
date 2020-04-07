import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Image, Dropdown } from "semantic-ui-react";

import UIContainer from "../sharedComponents/UIContainer";
import { emptyFunction } from "../../utils/appUtils";
import { requestCardCoverUpdate } from "../../apis/apiRequests";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const displayStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 50%)",
  height: "333px",
  width: "300px",
  overflowY: "auto",
  padding: 0
};

const ImageWrapper = styled(Dropdown.Item)`
  background-color: #eee;
  margin: 4px;
  border-radius: 3px !important;
  cursor: pointer;
`;

const SearchImageList = ({
  activeCard,
  data,
  id,
  listPosition,
  saveCardChanges,
  saveBoardChanges
}) => {
  const [images, setImages] = useState(null);
  const [lazyLoad, setLazyLoad] = useState(true);
  const [newCover, setNewCover] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setImages(data);
    }, 2000);
    return () => {
      setLazyLoad(false);
      setImages(null);
    };
  }, [data]);

  useEffect(() => {
    if (!newCover) return emptyFunction();

    const body = {
      cardId: activeCard.position,
      listId: listPosition,
      cardCover: newCover
    };
    const attachCardCover = async () => {
      let newCard = { ...activeCard, cardCover: newCover };

      await requestCardCoverUpdate(body, id).then(res => {
        saveCardChanges(newCard);
        saveBoardChanges(res.data);

        try {
        } catch (error) {
          alert(error.message);
        }
      });
    };
    attachCardCover();
    return () => setNewCover(null);
  }, [
    activeCard,
    listPosition,
    newCover,
    id,
    saveCardChanges,
    saveBoardChanges
  ]);

  return (
    <UIContainer display={displayStyles} className="image-container">
      {lazyLoad & !images ? (
        <UILoadingSpinner inverted={false} />
      ) : (
        images.map(image => (
          <ImageWrapper
            key={image.id}
            onClick={() => setNewCover(image.userImageURL)}
            image={<Image src={image.userImageURL} />}
          />
        ))
      )}
    </UIContainer>
  );
};

export default SearchImageList;
