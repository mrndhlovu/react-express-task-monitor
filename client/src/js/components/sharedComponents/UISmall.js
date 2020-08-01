import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSmall = styled.small`
  cursor: pointer;
  bottom: ${({ bottom }) => bottom};
  margin: ${({ margin }) => margin};
  left: ${({ left }) => left};

  &:hover {
    text-decoration: underline;
  }
`;

const UISmall = ({
  content,
  handleClick,
  bottom = "10%",
  left = "13%",
  margin,
  dataTestId,
  className,
  link,
  linkText,
}) => {
  return (
    <StyledSmall
      className={className}
      data-test-id={dataTestId}
      bottom={bottom}
      left={left}
      onClick={handleClick}
      margin={margin}
    >
      {link ? (
        <>
          {content}{" "}
          <a
            className="image-owner"
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            {linkText}
          </a>
        </>
      ) : (
        content
      )}
    </StyledSmall>
  );
};

UISmall.propTypes = {
  bottom: PropTypes.string,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func,
  left: PropTypes.string,
  margin: PropTypes.string,
};

export default UISmall;
