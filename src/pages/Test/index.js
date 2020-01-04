import React from 'react';

import Box from '../../components/Box';
import Hr from '../../components/Hr';
// import RichTextEditor from '../../components/RichTextEditor';
import UserProfileImage from '../../components/UserProfileImage';

const TestPage = () => (
  <Box size="medium">
    <h1>Test page</h1>
    {/* <RichTextEditor label="Content" name="content" rounded /> */}
    <Hr margin="25px 0" />
    <UserProfileImage authUserIsTheOwner rounded size="300px" />
  </Box>
);

export default TestPage;
