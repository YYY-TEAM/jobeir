import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { Text, SubmitButton } from '../../../inputs/input';
import { required } from '../../../validation';
import queryString from 'query-string';
import Autocomplete from '../../../autocomplete/Autocomplete';

const customStyles = {
  top: 'calc(100% + 8px)',
  left: '0'
};

const Input = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <SearchInputContainer>
      <SearchLabel htmlFor={props.input.name}>
        {props.label} {meta.error}
      </SearchLabel>
      <SearchInput
        {...props.input}
        type={props.input.type || 'text'}
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
        autoFocus={props.autoFocus}
        autoComplete={false}
      />
      {props.autocomplete &&
        <Autocomplete
          formName="search-form"
          types={['(cities)']}
          id={props.input.name}
          customStyles={customStyles}
        />}
    </SearchInputContainer>
  );
};

const Button = props => {
  return (
    <SearchButton type="submit" disabled={props.disabled}>
      {props.buttonText || 'Search'}
    </SearchButton>
  );
};

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    /**
     * This is a hack to remove the browser's autocomplete suggestions
     * for the input fields in the search bar. If there's an id and
     * title attribute the browser will be able to show the suggestion
     * which covers our own autocomplete suggestions
     */
    this.location = document.getElementById('location');
    this.title = document.getElementById('title');

    this.location.removeAttribute('name');
    this.location.removeAttribute('id');
    this.title.removeAttribute('name');
    this.title.removeAttribute('id');
  }

  componentWillUnmount() {
    // have to add them back before unmounting
    this.location.setAttribute('name', 'location');
    this.location.setAttribute('id', 'location');
    this.title.removeAttribute('name', 'title');
    this.title.removeAttribute('id', 'title');
  }

  formSubmit(data) {
    const queryData = {
      q: data.title,
      l: data.location,
      lat: data.coordinates[0],
      lng: data.coordinates[1]
    };
    const query = queryString.stringify(queryData);
    browserHistory.push(`/jobs?${query}`);
  }

  render() {
    return (
      <SearchFormContainer onSubmit={this.props.handleSubmit(this.formSubmit)}>
        <Field
          name="title"
          label="Job Title"
          component={Input}
          autoFocus={true}
        />
        <Field
          name="location"
          label="Location"
          component={Input}
          autocomplete={true}
        />
        <Field name="submitButton" component={Button} />
      </SearchFormContainer>
    );
  }
}

SearchForm = reduxForm({
  form: 'search-form'
})(SearchForm);

const mapStateToProps = state => ({
  initialValues: {
    location:
      state.location && `${state.location.city}, ${state.location.region}`,
    coordinates: state.location.ll
  }
});

export default connect(mapStateToProps)(SearchForm);

const SearchFormContainer = styled.form`
  display: flex;
  width: 100%;
  background: #fff;
  border: 1px solid #dce0e0;
  box-shadow: 0 1px 3px 0 #dce0e0;
  border-radius: 4px;
  height: 80px;
  margin-top: 30px;
`;

const SearchInput = styled.input`
  position: relative;
  top: -1px;
  border: 0;
  height: 100%;
  font-weight: 800;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  margin-top: 15px;
  font-size: 17px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 15px 15px;

  &:first-child {
    margin-right: 0;
    padding-right: 15px;
    border-right: 1px solid #dce0e0;
  }
`;

const SearchButton = styled.button`
  width: 160px;
  font-size: 18px;
  color: white;
  background-color: #5c6ac4;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px;
  margin-left: 0;
`;

const AutocompleteContainer = styled.div`position: relative;`;