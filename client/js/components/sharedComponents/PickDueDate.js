import React, { Fragment, lazy, Suspense } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = lazy(() => import("react-datepicker"));

import { Button, Divider } from "semantic-ui-react";

const Container = styled.div`
  padding: 15px 10px;
  width: 300px;
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px;
`;

const PickDueDate = ({
  startDate,
  setStartDate,
  handleAddClick,
  handleRemoveClick,
}) => {
  return (
    <Fragment>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </Container>
      <Divider />
      <ButtonWrapper>
        <Button
          content="Add"
          compact
          positive
          onClick={() => handleAddClick()}
        />
        <Button
          content="Remove"
          compact
          negative
          floated="right"
          onClick={() => handleRemoveClick()}
        />
      </ButtonWrapper>
    </Fragment>
  );
};

export default PickDueDate;
