import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { alertSet, homepageSpaceboxesSet } from '../../Redux/actions';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import searchSpaceboxSelector from '../../Redux/selectors';
import { shuffleArray } from '../../utils';
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
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StyledSpaceboxLink = styled(Link)`
  order: ${({ order }) => order};
  overflow: hidden;
  text-decoration: none !important;
`;

const HomePage = ({
  allSpaceboxes,
  alertSetAction,
  authUser,
  firebase,
  homepageSpaceboxesSetAction,
  spaceboxToSearch,
}) => {
  const history = useHistory();
  const intl = useIntl();
  const [componentIsMounted, setComponentIsMounted] = useState(true);
  const [gettingSpaceboxes, setGettingSpaceboxes] = useState(false);

  const [
    getAllVisibleSpaceboxesFailed,
    setGetAllVisibleSpaceboxesFailed,
  ] = useState(false);

  const handleEditSpaceboxClick = spaceboxSlug => (
    history.push(`${ROUTES.EDIT_SPACEBOX_BASE}/${spaceboxSlug}`)
  );

  useEffect(() => {
    setGettingSpaceboxes(true);

    firebase.allVisibleSpaceboxes().onSnapshot((documents) => {
      const spaceboxes = [];

      documents.forEach(document => spaceboxes.push(document.data()));

      if (componentIsMounted) {
        homepageSpaceboxesSetAction(shuffleArray(spaceboxes));
        setGettingSpaceboxes(false);
      }
    }, (error) => {
      alertSetAction({
        message: error.message,
        type: 'danger',
      });

      setGetAllVisibleSpaceboxesFailed(true);
      setGettingSpaceboxes(false);
    });

    return () => {
      setComponentIsMounted(false);

      const listener = firebase.db.collection('spaceboxes').onSnapshot(
        () => {},
      );

      listener();
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
              ? 'pages.home.informativeSpaceboxTitles.noResults'
              : [
                'pages.home.informativeSpaceboxTitles.resultsCount',
                { count: intl.formatNumber(allSpaceboxes.length) },
              ]
          }
        />
      )}

      {gettingSpaceboxes && (
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
        && !gettingSpaceboxes
        && allSpaceboxes.map((spacebox, index) => (
          spacebox.visible && (
            <StyledSpaceboxLink
              key={spacebox.slug}
              order={
                authUser && authUser.uid === spacebox.uid
                  ? 2
                  : index + 10
              }
              to={{
                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}`,
                state: { spacebox },
              }}
            >
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
                likes={spacebox.likes}
                title={spacebox.title}
              />
            </StyledSpaceboxLink>
          )
        ))
      }
    </StyledWrapper>
  );
};

HomePage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  allSpaceboxes: PropTypes.arrayOf(PropTypes.object),
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  homepageSpaceboxesSetAction: PropTypes.func.isRequired,
  spaceboxToSearch: PropTypes.string,
};

HomePage.defaultProps = {
  allSpaceboxes: [],
  spaceboxToSearch: '',
};

const mapStateToProps = state => ({
  allSpaceboxes: state.homepageSpaceboxes.all && searchSpaceboxSelector(state),
  authUser: state.authUser,
  spaceboxToSearch: state.spaceboxToSearch,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  homepageSpaceboxesSetAction: homepageSpaceboxesSet,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(HomePage);
