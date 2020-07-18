import React from "react";
import PropTypes from "prop-types";

import { Image, Dropdown } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";
import UISmall from "../sharedComponents/UISmall";
import { useCardDetailContext } from "../../utils/hookUtils";

const SearchImageList = ({ images }) => {
  const { handleMakeCover } = useCardDetailContext();

  return (
    <UIWrapper className="images-container">
      {!images ? (
        <UILoadingSpinner />
      ) : (
        images.map((image) => (
          <Dropdown.Item
            className="search-images-wrap"
            key={image.id}
            content={
              <UISmall
                className="image-owner"
                content={`Image by:  
              ${(
                <a
                  className="image-owner"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={image.user.links.html}
                >
                  {image.user.first_name}
                </a>
              )}`}
              />
            }
            image={
              <Image
                onClick={() => handleMakeCover(image.urls.full)}
                className="search-image"
                src={image.urls.small}
              />
            }
          />
        ))
      )}
    </UIWrapper>
  );
};

SearchImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({ full: PropTypes.string.isRequired }),
      user: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        links: PropTypes.shape({ html: PropTypes.string.isRequired }),
      }),
    })
  ).isRequired,
};

export default SearchImageList;
