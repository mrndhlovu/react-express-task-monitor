import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

const InputWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > i {
    margin-left: -22px !important;
  }
`;

const UIFormInput = ({
  className = "ui-form-input",
  iconProps,
  input = false,
  icon,
  ...rest
}) => {
  return (
    <InputWrapper>
      {input ? (
        <input className={className} {...rest} />
      ) : (
        <textarea className={className} {...rest} />
      )}

      {icon ? (
        icon()
      ) : (
        <Icon {...iconProps} data-test-id="password-input-field-eye-icon" />
      )}
    </InputWrapper>
  );
};

UIFormInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  defaultValue: PropTypes.string,
  iconProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default UIFormInput;
