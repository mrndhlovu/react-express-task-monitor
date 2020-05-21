import React, { Fragment, lazy, Suspense, useState } from "react";
import styled from "styled-components";

import { Button, Message } from "semantic-ui-react";

const DatePicker = lazy(() => import("react-datepicker"));

import UIDivider from "./UIDivider";

const Container = styled.div`
  padding: 15px 10px;
  width: 300px;
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px;
`;

const PickDueDate = ({ startDate, setStartDate, handleUpdateDueDate }) => {
  const [message, setMessage] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        {message && (
          <Message
            positive
            fluid
            content="Due Date Updated"
            size="tiny"
            onDismiss={() => setMessage(false)}
          />
        )}
        <Container>
          <DatePicker
            className="ui fluid focus input"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Container>

        {!message && (
          <>
            <UIDivider />
            <ButtonWrapper>
              <Button
                content="Add"
                compact
                positive
                onClick={() => {
                  setMessage(true);
                  handleUpdateDueDate();
                }}
              />
              <Button
                content="Remove"
                compact
                negative
                floated="right"
                onClick={() => handleUpdateDueDate(true)}
              />
            </ButtonWrapper>
          </>
        )}
      </Fragment>
    </Suspense>
  );
};

export default PickDueDate;
