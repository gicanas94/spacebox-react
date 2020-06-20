/* eslint-disable */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { alertSet } from '../../redux/actions';
import Box from '../../components/Box';
// import Button from '../../components/Button';
import { composeListOfEmojis } from '../../utils';
// import RichTextEditor from '../../components/RichTextEditor';
// import SButton from '../../components/SButton';

const TestPage = () => {
  useEffect(() => {
    composeListOfEmojis();
  }, []);

  // const testAlertComponent = () => {
  //   alertSetAction({
  //     message: {
  //       id: 'pages.test.testAlertMessage',
  //       values: {
  //         value1: 'Hola',
  //         value2: 'Chau',
  //         value3: 'Hola de nuevo',
  //       },
  //     },
  //     type: 'success',
  //   });
  // };

  return (
    <Box size="medium">
      <h1>Test page 🤖</h1>

      {/* <Button
        dontTranslateChildren
        onClick={testAlertComponent}
        size="large"
        styleType="filled"
      >
        alertSetAction
      </Button> */}

      {/* <RichTextEditor label="Content" name="content" rounded /> */}
      {/* <SButton /> */}
    </Box>
  );
};

TestPage.propTypes = { alertSetAction: PropTypes.func.isRequired };

const mapDispatchToProps = { alertSetAction: alertSet };

export default connect(null, mapDispatchToProps)(TestPage);
