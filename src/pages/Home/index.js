import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet, spaceboxesSet } from '../../Redux/actions';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import searchSpaceboxSelector from '../../Redux/selectors';
import Spacebox from '../../components/Spacebox';
import { withFirebase } from '../../Firebase';

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptop} {
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const HomePage = ({
  allSpaceboxes,
  alertSetAction,
  authUser,
  firebase,
  history,
  isLoading,
  loadingSetAction,
  spaceboxesSetAction,
  spaceboxToSearch,
}) => {
  const [componentIsMounted, setComponentIsMounted] = useState(true);

  const [
    getAllVisibleSpaceboxesFailed,
    setGetAllVisibleSpaceboxesFailed,
  ] = useState(false);

  const handleEditSpaceboxClick = spaceboxSlug => (
    history.push(`${ROUTES.EDIT_SPACEBOX_BASE}/${spaceboxSlug}`)
  );

  useEffect(() => {
    loadingSetAction(true);

    firebase.getAllVisibleSpaceboxes().onSnapshot((documents) => {
      const spaceboxes = [];
      documents.forEach(document => spaceboxes.push(document.data()));

      if (componentIsMounted) {
        spaceboxesSetAction(spaceboxes);
        loadingSetAction(false);
      }
    }, (error) => {
      alertSetAction({
        message: error.message,
        type: 'danger',
      });

      setGetAllVisibleSpaceboxesFailed(true);
      loadingSetAction(false);
    });

    return () => {
      setComponentIsMounted(false);

      const unsubscribe = firebase.db.collection('spaceboxes').onSnapshot(
        () => {},
      );

      unsubscribe();
    };
  }, []);

  return (
    <StyledWrapper>
      {spaceboxToSearch === ''
        ? <HelmetTitle title={{ id: 'pages.home.title.home' }} />
        : <HelmetTitle title={{ id: 'pages.home.title.search' }} />
      }

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
        <Spacebox
          informative
          order={allSpaceboxes ? allSpaceboxes.length + 1 : 1}
          title="pages.home.informativeSpaceboxTitles.loading"
        />
      )}

      {getAllVisibleSpaceboxesFailed && (
        <Spacebox
          informative
          order={1}
          title="pages.home.informativeSpaceboxTitles.error"
        />
      )}

      {allSpaceboxes
        && !isLoading
        && allSpaceboxes.map((spacebox, index) => (
          spacebox.visible && (
            <Spacebox
              authUserIsTheOwner={
                authUser && authUser.uid === spacebox.uid
              }
              bgColor={spacebox.bgColor}
              category={spacebox.category}
              color={spacebox.color}
              description={spacebox.description}
              onEditSpaceboxClickHandler={
                () => handleEditSpaceboxClick(spacebox.slug)
              }
              key={spacebox.slug}
              likes={spacebox.likes}
              link={[`${ROUTES.SPACE_BASE}/${spacebox.slug}`, spacebox]}
              order={
                authUser && authUser.uid === spacebox.uid
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
};

HomePage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  allSpaceboxes: PropTypes.arrayOf(PropTypes.object),
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
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
  withRouter,
)(HomePage);
