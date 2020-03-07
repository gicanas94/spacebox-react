import { connect } from 'react-redux';
import { Normalize } from 'styled-normalize';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../../styles/GlobalStyle';

const ConnectedIntlProvider = ({ appTheme, children }) => (
  <ThemeProvider theme={appTheme}>
    <Normalize />
    <GlobalStyle theme={appTheme} />
    {children}
  </ThemeProvider>
);

ConnectedIntlProvider.propTypes = {
  appTheme: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({ appTheme: state.appTheme });

export default connect(mapStateToProps)(ConnectedIntlProvider);
