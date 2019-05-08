import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import Post from '../../components/Post';
import LoadingSpinner from '../../components/LoadingSpinner';
import { withFirebase } from '../../Firebase';

class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      spacebox: null,
      user: null,
    };
  }

  componentDidMount() {
    const { loadingSetAction, location, match } = this.props;

    if (location.state) {
      this.setState({
        post: location.state.post,
        spacebox: location.state.spacebox,
        user: location.state.user,
      });
    } else {
      loadingSetAction(true);
      this.getSpacebox(match.params.spaceboxSlug);
    }
  }

  getSpacebox = (spaceboxSlug) => {
    const { alertSetAction, firebase, loadingSetAction } = this.props;

    firebase.spaceboxes()
      .orderByChild('slug')
      .equalTo(spaceboxSlug)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const spaceboxId = _.keys(snapshot.val())[0];
          const spacebox = snapshot.val()[spaceboxId];

          this.setState(
            { spacebox, spaceboxId },
            () => {
              this.getUser(spacebox.userId);
              this.getPost(spaceboxId);
            },
          );
        } else {
          loadingSetAction(false);
          console.log('Spacebox no existe, ir a 404');
        }
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  getUser = (userId) => {
    const { alertSetAction, firebase } = this.props;

    firebase.user(userId)
      .once('value')
      .then(snapshot => this.setState({ user: snapshot.val() }))
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  getPost = (spaceboxId) => {
    const {
      alertSetAction,
      firebase,
      loadingSetAction,
      match,
    } = this.props;

    try {
      firebase.posts()
        .orderByChild('spaceboxId')
        .equalTo(spaceboxId)
        .on('value', (snapshot) => {
          if (snapshot.val()) {
            const filteredPost = _.filter(
              snapshot.val(),
              post => post.slug === match.params.postSlug,
            )[0];

            if (filteredPost) {
              this.setState(
                { post: filteredPost },
                () => loadingSetAction(false),
              );
            } else {
              loadingSetAction(false);
              console.log('Post no existe, ir a 404');
            }
          } else {
            console.log('El Spacebox no tiene posts, ir a 404');
            loadingSetAction(false);
          }
        });
    } catch (error) {
      alertSetAction({
        text: error.message,
        type: 'danger',
      });

      loadingSetAction(false);
    }
  };

  render() {
    const { isLoading } = this.props;
    const { post } = this.state;

    return (
      <Fragment>
        {post && <Helmet title={`${post.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && post && (
          <Box color="transparent" noBorder padding="0" size="medium">
            <Post post={post} />
          </Box>
        )}
      </Fragment>
    );
  }
}

PostPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

PostPage.defaultProps = {
  authUser: null,
  isLoading: false,
};

const mapStateToProps = state => ({
  authUser: state.session.authUser,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  loadingSetAction: loadingSet,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(PostPage);
