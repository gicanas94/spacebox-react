import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { capitalizeEachStringWord } from '../../utils';

const StyledSpan = styled.span`
  font-size: ${({ fontSize }) => fontSize};
`;

const Emoji = ({
  fontSize,
  label,
  emoji,
}) => {
  const intl = useIntl();
  const finalLabel = capitalizeEachStringWord(
    intl.formatMessage({ id: label }),
  );

  return (
    <StyledSpan
      aria-label={finalLabel}
      role="img"
      fontSize={fontSize}
      title={finalLabel}
    >
      {emoji}
    </StyledSpan>
  );
};

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  fontSize: '0.91em',
};

export default Emoji;
