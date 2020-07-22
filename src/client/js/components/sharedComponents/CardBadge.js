import React from "react";
import PropTypes from "prop-types";

import { Label } from "semantic-ui-react";

const CardBadge = ({
  as = "div",
  icon,
  content,
  hasBadge = false,
  color,
  className,
}) => {
  const Icon = icon;

  return (
    hasBadge && (
      <Label color={color} as={as} className={`${className} badge-icon`}>
        <span>
          <Icon />
        </span>
        <span className="badge-content">{content}</span>
      </Label>
    )
  );
};

CardBadge.propTypes = {
  as: PropTypes.string,
  icon: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasBadge: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default CardBadge;
