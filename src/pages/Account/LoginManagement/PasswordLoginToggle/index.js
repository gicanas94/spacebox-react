import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

class PasswordLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordOne: '',
      passwordTwo: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { onLinkHandler } = this.props;
    const { passwordOne } = this.state;

    onLinkHandler(passwordOne);

    this.setState({
      passwordOne: '',
      passwordTwo: '',
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlinkHandler,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    return isEnabled ? (
      <Button
        color="salmon"
        disabled={onlyOneLeft}
        onClick={() => onUnlinkHandler(signInMethod.id)}
        rounded
      >
        {`Unlink ${signInMethod.displayName}`}
      </Button>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <Input
          label="Password"
          name="passwordOne"
          onChange={this.handleChange}
          rounded
          type="password"
          value={passwordOne}
        />

        <Input
          label="Confirm your password"
          name="passwordTwo"
          onChange={this.handleChange}
          rounded
          type="password"
          value={passwordTwo}
        />

        <Button color="green" rounded type="submit">
          {`Link ${signInMethod.displayName}`}
        </Button>
      </form>
    );
  }
}

PasswordLoginToggle.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onLinkHandler: PropTypes.func.isRequired,
  onlyOneLeft: PropTypes.bool.isRequired,
  onUnlinkHandler: PropTypes.func.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PasswordLoginToggle;
