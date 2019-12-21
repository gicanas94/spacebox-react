import React from 'react';
import Box from '../../components/Box';
import RichTextEditor from '../../components/RichTextEditor';

const TestPage = () => (
  <Box size="medium">
    <h1>Test page</h1>

    <RichTextEditor label="Content" name="content" rounded />
  </Box>
);

export default TestPage;
