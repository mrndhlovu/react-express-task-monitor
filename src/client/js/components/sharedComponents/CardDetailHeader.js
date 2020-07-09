import React from "react";

import { Header } from "semantic-ui-react";
import {
  AlignLeft,
  Paperclip,
  Clock,
  List,
  CheckSquare,
  Tag,
  CreditCard,
} from "react-feather";

const CardDetailHeader = ({ description, section }) => {
  const getSectionIcon = () => {
    switch (section ? section : description) {
      case "Activities":
        return <List size={25} />;
      case "Attachments":
        return <Paperclip size={20} />;
      case "Description":
        return <AlignLeft size={20} />;
      case "Due Date":
        return <Clock size={20} />;
      case "Checklist":
        return <CheckSquare size={20} />;
      case "Labels":
        return <Tag size={20} />;
      case "Header":
        return <CreditCard size={20} />;
      default:
        return;
    }
  };

  return (
    <Header
      icon={<div className="card-icon-container">{getSectionIcon()}</div>}
      content={description}
      as="h5"
      className="card-header-title"
    />
  );
};

export default CardDetailHeader;
