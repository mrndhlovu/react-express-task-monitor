import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const FormInput = styled.input`
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  text-align: left;
  line-height: 1;
  padding: 10px;
  background: #fff;
  border: 1px solid #22242626;
  color: #000000de;
  border-radius: 3px;
  -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
  width: 100%;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > i {
    margin-left: -22px !important;
  }
`;

const UIFormInput = ({
  autoFocus,
  dataTestId,
  defaultValue,
  iconProps,
  id,
  name,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <InputWrapper>
      <FormInput
        autoFocus={autoFocus}
        data-test-id={dataTestId}
        defaultValue={defaultValue}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />

      <Icon {...iconProps} data-test-id="password-input-field-eye-icon" />
    </InputWrapper>
  );
};

export default UIFormInput;
