import React, { useState } from "react";
import styled from "styled-components";

import { Header, Icon, TextArea, Form } from "semantic-ui-react";

import ActivitiesHeader from "./ActivitiesHeader";
import CardComment from "./CardComment";
import ModalActivities from "./ModalActivities";

const IconWrapper = styled.i`
  font-size: 19px;
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const Description = styled.div`
  margin-left: 33px;
`;

const StyledTextArea = styled(TextArea)`
  background-color: #091e420a !important;
`;

const Span = styled.span`
  letter-spacing: 1px;
`;

const Container = styled.div`
  letter-spacing: 1px;
  margin: 10px;
`;

const CardModalDescription = () => {
  const [hideActivities, setHideActivities] = useState(true);

  return (
    <Container>
      <StyledHeader
        content={<Span>Description</Span>}
        icon={
          <IconWrapper>
            <Icon flipped="vertically" name="align left" />
          </IconWrapper>
        }
      />
      <Description>
        <Form>
          <StyledTextArea placeholder="Tell us more" />
        </Form>
      </Description>
      <ActivitiesHeader
        handleShowDetails={() => setHideActivities(!hideActivities)}
      />
      <CardComment />
      {!hideActivities && <ModalActivities />}
    </Container>
  );
};

export default CardModalDescription;
