import React, { Fragment } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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
