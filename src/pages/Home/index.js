import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { alertSet, loadingSet, spaceboxesSet } from '../../Redux/actions';
import { device } from '../../styles';
import { ROUTES } from '../../constants';
import searchSpaceboxSelector from '../../Redux/selectors';
import Spacebox from '../../components/Spacebox';
import { withFirebase } from '../../Firebase';

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto;
  width: 100%;

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, auto);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(3, auto);
  }

  @media ${device.laptop} {
    grid-gap: 20px;
    grid-template-columns: repeat(4, auto);
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(5, auto);
  }
`;

class HomePage extends Component {
  componentDidMount() {
    const {
      alertSetAction,
      firebase,
      loadingSetAction,
      spaceboxesSetAction,
    } = this.props;

    loadingSetAction(true);

    try {
      firebase.spaceboxes().on('value', (snapshot) => {
        spaceboxesSetAction(snapshot.val());
        loadingSetAction(false);
      });
    } catch (error) {
      alertSetAction({
        text: error.message,
        type: 'danger',
      });

      loadingSetAction(false);
    }
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    firebase.spaceboxes().off();
  }

  render() {
    const {
      authUser,
      allSpaceboxes,
      isLoading,
      spaceboxToSearch,
    } = this.props;

    return (
      <StyledWrapper>
        <Helmet
          title={
            `${spaceboxToSearch === '' ? 'Home' : 'Search results'} - Spacebox`
          }
        />

        {spaceboxToSearch !== '' && (
          <Spacebox
            informative
            order={1}
            title={
              allSpaceboxes.length === 0
                ? 'No results'
                : `Results: ${allSpaceboxes.length}`
            }
          />
        )}

        {isLoading && (
          <Spacebox informative order={1} title="Loading..." />
        )}

        {allSpaceboxes
          && !isLoading
          && _.map(allSpaceboxes, (spacebox, index) => (
            spacebox.visible && (
              <Spacebox
                authUserIsTheOwner={
                  authUser && authUser.userId === spacebox.userId
                }
                bgColor={spacebox.bgColor}
                category={spacebox.category}
                color={spacebox.color}
                description={spacebox.description}
                key={spacebox.slug}
                likes={spacebox.likes}
                link={[`${ROUTES.SPACE_BASE}/${spacebox.slug}`, spacebox]}
                order={
                  authUser && authUser.userId === spacebox.userId
                    ? -1
                    : index + 10
                }
                title={spacebox.title}
              />
            )
          ))
        }
      </StyledWrapper>
    );
  }
}

HomePage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  allSpaceboxes: PropTypes.arrayOf(PropTypes.object),
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  spaceboxesSetAction: PropTypes.func.isRequired,
  spaceboxToSearch: PropTypes.string,
};

HomePage.defaultProps = {
  allSpaceboxes: null,
  authUser: null,
  isLoading: false,
  spaceboxToSearch: '',
};

const mapStateToProps = state => ({
  allSpaceboxes: state.spacebox.all && searchSpaceboxSelector(state),
  authUser: state.session.authUser,
  isLoading: state.isLoading,
  spaceboxToSearch: state.spaceboxToSearch,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  loadingSetAction: loadingSet,
  spaceboxesSetAction: spaceboxesSet,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(HomePage);
