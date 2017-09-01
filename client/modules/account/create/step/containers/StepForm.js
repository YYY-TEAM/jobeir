// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CompanyOnboarding from '../../company/components/CompanyOnboarding';
import FadeIn from '../../../../../styles/components/FadeIn';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
class StepForm extends Component {
  state: {
    asyncComponent: ''
  };

  constructor(props) {
    super(props);
    this.state = { asyncComponent: '' };
  }

  componentDidMount() {
    this.importUtil(this.props.params.create);
  }

  componentWillUpdate(nextProps) {
    const { params } = this.props;
    if (nextProps.params.create !== params.create) {
      this.importUtil(nextProps.params.create);
    }
  }

  importUtil(create: string) {
    const fileName: string = create === 'job' ? 'JobForm' : 'CompanyForm';

    /**
     * Using System.import here because babel dynamic-import is not working and
     * this solution is creating the solutions 
     */
    System.import(
      `../../../../user-input/forms/form/${create}/${fileName}.js`
    ).then(response => {
      if (response.default) {
        this.setState({ asyncComponent: response.default });
      }
    });
  }

  render() {
    const { params } = this.props;
    const isCompany: boolean = params.create === 'company';
    const AsyncComponent = this.state.asyncComponent;

    return (
      <StepFormContainer>
        {isCompany && params.step === 'onboarding' && <CompanyOnboarding />}
        {AsyncComponent &&
          <FadeIn>
            <AsyncComponent params={params} />
          </FadeIn>}
      </StepFormContainer>
    );
  }
}

export default StepForm;

const StepFormContainer = styled.div`width: 52.5%;`;
