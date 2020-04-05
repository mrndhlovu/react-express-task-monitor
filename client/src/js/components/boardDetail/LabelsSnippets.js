import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 5px;
  width: 90%;
`;

const Label = styled.div`
  background-color: ${props => props.color};
  width: 33px;
  height: 7px;
  margin: 3px;
  border-radius: 20px;
`;

const LabelsSnippets = ({ labels = [], hasLabel = false }) => {
  return (
    hasLabel && (
      <Container>
        {labels.map((label, index) => (
          <Label key={index} color={label} />
        ))}
      </Container>
    )
  );
};

export default LabelsSnippets;
