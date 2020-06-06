import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import Button from '../Button';
import { device } from '../../styles';
import Hr from '../Hr';

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  button {
    width: 100%;

    ${({ page }) =>
      page > 0 &&
      `
      &:last-of-type {
        margin-bottom: 25px;
      }
    `}
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      margin-bottom: 0 !important;
      width: fit-content;
    }
  }

  @media ${device.tablet} {
    justify-content: center;

    button:first-of-type {
      margin-right: 25px;
    }
  }
`;

class Wizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  handleSubmit = (values, actions) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === Children.count(children) - 1;

    if (isLastPage) {
      onSubmit(values, actions);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
      this.nextStep(values);
    }
  };

  nextStep = (values) =>
    this.setState((prevState) => ({
      page: prevState.page + 1,
      values,
    }));

  previousStep = () =>
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));

  render() {
    const { children, validationSchema, withStartPage } = this.props;
    const { page, values } = this.state;
    const activePage = Children.toArray(children)[page];
    const isLastPage = page === Children.count(children) - 1;

    return (
      <Formik
        enableReinitialize={false}
        initialValues={values}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema[page]}
      >
        {({ isSubmitting }) => (
          <Form>
            {activePage}

            <Hr margin="25px 0" />

            <StyledButtonsWrapper page={page}>
              {page > 0 && (
                <Button
                  color="abalone"
                  onClick={this.previousStep}
                  styleType="unbordered"
                  type="button"
                >
                  components.wizard.buttons.previousStep
                </Button>
              )}

              {page === 0 && withStartPage && (
                <Button styleType="bordered" type="submit">
                  components.wizard.buttons.start
                </Button>
              )}

              {((!isLastPage && !withStartPage) ||
                (withStartPage && page > 0)) && (
                <Button styleType="bordered" type="submit">
                  components.wizard.buttons.nextStep
                </Button>
              )}

              {isLastPage && (
                <Button
                  disabled={isSubmitting}
                  styleType="bordered"
                  type="submit"
                >
                  components.wizard.buttons.finish
                </Button>
              )}
            </StyledButtonsWrapper>
          </Form>
        )}
      </Formik>
    );
  }
}

Wizard.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  withStartPage: PropTypes.bool,
};

Wizard.defaultProps = {
  withStartPage: false,
};

export default Wizard;
