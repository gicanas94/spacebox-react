import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import Button from '../Button';
import { device } from '../../styles';
import Hr from '../Hr';

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  @media ${device.tablet} {
    justify-content: center;
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

  nextStep = values => (
    this.setState(prevState => ({
      page: prevState.page + 1,
      values,
    }))
  )

  previousStep = () => (
    this.setState(prevState => ({
      page: prevState.page - 1,
    }))
  )

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
        render={({ isSubmitting }) => (
          <Form>
            {activePage}

            <Hr margin="25px 0" />

            <StyledButtonsWrapper>
              {page > 0 && (
                <Button
                  color="abalone"
                  onClick={this.previousStep}
                  margin="0 25px 0 0"
                  rounded
                  styleType="unbordered"
                  type="button"
                >
                  {'Back'}
                </Button>
              )}

              {page === 0 && withStartPage && (
                <Button rounded styleType="bordered" type="submit">
                  {'Start'}
                </Button>
              )}

              {((!isLastPage && !withStartPage)
                || (withStartPage && page > 0)) && (
                <Button rounded styleType="bordered" type="submit">
                  {'Next'}
                </Button>
              )}

              {isLastPage && (
                <Button
                  disabled={isSubmitting}
                  rounded
                  styleType="bordered"
                  type="submit"
                >
                  {'Finish'}
                </Button>
              )}
            </StyledButtonsWrapper>
          </Form>
        )}
      />
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
