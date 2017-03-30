import React from 'react';
import MaskedInput from 'react-text-mask';
import InputWrapper from '../components/InputWrapper';

export const Phone = props => {
  return (
    <InputWrapper {...props}>
      <MaskedInput
        {...props.input}
        type="tel"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        guide={false}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    </InputWrapper>
  );
};
