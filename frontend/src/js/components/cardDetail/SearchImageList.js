import React from "react";
import PropTypes from "prop-types";

import { Image, Dropdown } from "semantic-ui-react";

import UIWrapper from "../shared/UIWrapper";
import UISmall from "../shared/UISmall";

const SearchImageList = ({ images, handleMakeCover }) => {
  return (
    <UIWrapper className="images-container">
      {images.map((image) => (
        <Dropdown.Item
          className="search-images-wrap"
          key={image.id}
          content={
            <UISmall
              className="image-owner"
              link={image.user.links.html}
              linkText={image.user.first_name}
              content="Image by: "
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
      ))}
    </UIWrapper>
  );
};

SearchImageList.propTypes = {
  handleMakeCover: PropTypes.func.isRequired,
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
