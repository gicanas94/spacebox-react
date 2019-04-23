import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import Button from '../Button';
import Hr from '../Hr';

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
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

  next = (values) => {
    const { children } = this.props;

    this.setState(state => ({
      page: Math.min(state.page + 1, children.length - 1),
      values,
    }));
  }

  previous = () => this.setState(state => ({
    page: Math.max(state.page - 1, 0),
  }));

  handleSubmit = (values, actions) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === Children.count(children) - 1;

    if (isLastPage) {
      onSubmit(values, actions);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
      this.next(values);
    }
  };

  render() {
    const { children, validationSchema } = this.props;
    const { page, values } = this.state;
    const activePage = Children.toArray(children)[page];
    const isLastPage = page === Children.count(children) - 1;

    return (
      <Formik
        enableReinitialize={false}
        initialValues={values}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema[page]}
        render={() => (
          <Form>
            {activePage}

            <Hr margin="25px 0" />

            <StyledButtonsWrapper>
              {page > 0 && (
                <Button
                  color="lava"
                  onClick={this.previous}
                  margin="0 25px 0 0"
                  noBorder
                  rounded
                  type="button"
                >
                  {'Back'}
                </Button>
              )}

              {!isLastPage && <Button rounded type="submit">Next</Button>}

              {isLastPage && <Button rounded type="submit">Finish</Button>}
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
};

export default Wizard;
