import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Image, Dropdown } from "semantic-ui-react";

import UIContainer from "../sharedComponents/UIContainer";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const displayStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 50%)",
  height: "333px",
  width: "300px",
  overflowY: "auto",
  padding: 0,
  position: "relative",
  borderRadius: "3px",
};

const ImageWrapper = styled(Dropdown.Item)`
  background-color: #eee;
  margin: 4px;
  border-radius: 3px !important;
  cursor: pointer;
`;

const SearchImageList = ({ data, handleMakeCover }) => {
  const [images, setImages] = useState(null);
  const [lazyLoad, setLazyLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setImages(data), 1000);
    return () => {
      setLazyLoad(false);
      setImages(null);
    };
  }, [data]);

  return (
    <UIContainer display={displayStyles} className="image-container">
      {lazyLoad && !images ? (
        <UILoadingSpinner inverted={false} />
      ) : (
        images.map((image) => (
          <ImageWrapper
            key={image.id}
            onClick={() => handleMakeCover(image.userImageURL)}
            image={<Image src={image.userImageURL} />}
          />
        ))
      )}
    </UIContainer>
  );
};

export default SearchImageList;
