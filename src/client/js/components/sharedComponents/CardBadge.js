import React from "react";
import PropTypes from "prop-types";

import { Label } from "semantic-ui-react";
import {
  Paperclip,
  MessageCircle,
  CheckSquare,
  Clock,
  AlignLeft,
} from "react-feather";

const CardBadge = ({
  as = "div",
  icon,
  content,
  hasBadge = false,
  color,
  className,
}) => {
  const getBadgeIcon = () => {
    switch (icon) {
      case "attachment":
        return <Paperclip size={12} />;
      case "comment":
        return <MessageCircle size={12} />;
      case "checklist":
        return <CheckSquare size={12} />;
      case "dueDate":
        return <Clock size={12} />;
      case "description":
        return <AlignLeft size={12} />;
      default:
        break;
    }
  };
  return (
    hasBadge && (
      <Label color={color} as={as} className={`${className} badge-icon`}>
        {getBadgeIcon()}
        <span className="badge-content">{content}</span>
      </Label>
    )
  );
};

CardBadge.propTypes = {
  as: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasBadge: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default CardBadge;
