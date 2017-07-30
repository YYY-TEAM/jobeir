// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CompanyFormAbout from './CompanyFormAbout';
import CompanyFormContact from './CompanyFormContact';
import CompanyFormLocation from './CompanyFormLocation';
import CompanyFormPerks from './CompanyFormPerks';

class CompanyForm extends Component {
  nextPage = (path: string) => {
    browserHistory.push(path);
  };

  prevPage = (path: string) => {
    browserHistory.push(path);
  };

  render() {
    const { pathname } = this.props;
    const about: string = '/create/company/about';
    const contact: string = '/create/company/contact';
    const location: string = '/create/company/location';
    const perks: string = '/create/company/perks';

    return (
      <div>
        {pathname === about &&
          <CompanyFormAbout nextPage={() => this.nextPage(contact)} />}
        {pathname === contact &&
          <CompanyFormContact
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(perks)}
          />}
        {pathname === perks &&
          <CompanyFormPerks
            prevPage={() => this.prevPage(contact)}
            nextPage={() => this.nextPage(location)}
          />}
        {pathname === location &&
          <CompanyFormLocation prevPage={() => this.prevPage(perks)} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(CompanyForm);
