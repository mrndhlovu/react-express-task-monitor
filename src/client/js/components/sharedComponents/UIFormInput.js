import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

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
  onBlur,
  onKeyDown,
  className = "ui-form-input",
  onClick,
}) => {
  return (
    <InputWrapper>
      <input
        className={className}
        autoFocus={autoFocus}
        data-test-id={dataTestId}
        defaultValue={defaultValue}
        onClick={onClick}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />

      <Icon {...iconProps} data-test-id="password-input-field-eye-icon" />
    </InputWrapper>
  );
};

export default UIFormInput;
