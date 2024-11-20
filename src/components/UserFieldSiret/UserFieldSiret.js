// src/components/UserFieldSiret/UserFieldSiret.js
import { injectIntl } from 'react-intl';

import React from 'react';
import { bool, string } from 'prop-types';
import  FieldTextInput  from '../FieldTextInput/FieldTextInput';
import { formatSiret, validateSiret } from '../../util/siretUtils'; // Vous devrez créer ces fonctions

const UserFieldSiret = props => {
  const {
    name,
    disabled,
    required,
    rootClassName,
    className,
    formName,
    userTypeConfig,
    intl,
  } = props;
 console.log("20: userTypeConfig.userType",userTypeConfig.userType);
  const siretLabel = intl.formatMessage({ id: 'UserFieldSiret.siretLabel' });
  const siretPlaceholder = intl.formatMessage({ id: 'UserFieldSiret.siretPlaceholder' });
  const siretRequiredMessage = intl.formatMessage({ id: 'UserFieldSiret.siretRequired' });
  const siretInvalidMessage = intl.formatMessage({ id: 'UserFieldSiret.siretInvalid' });

  const validate = value => {
    return validateSiret(value, siretRequiredMessage, siretInvalidMessage);
  };

  if(userTypeConfig.userType !== "provider"){
    return null;
  }

  return (

    <FieldTextInput
      name={name}
      disabled={disabled}
      className={className}
      rootClassName={rootClassName}
      id={`${formName}.siret`}
      label={siretLabel}
      placeholder={siretPlaceholder}
      format={formatSiret}
      validate={validate}
      autoComplete="off"
    />
  );
};

UserFieldSiret.defaultProps = {
  disabled: false,
  required: false,
  rootClassName: null,
  className: null,
};

UserFieldSiret.propTypes = {
  disabled: bool,
  required: bool,
  rootClassName: string,
  className: string,
  formName: string.isRequired,
};

export default UserFieldSiret;

