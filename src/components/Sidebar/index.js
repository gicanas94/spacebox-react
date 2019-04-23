import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Hr from '../Hr';
import { device, font } from '../../styles';

const StyledMobileView = styled.div`
  display: flex;

  @media ${device.tablet} {
    display: none;
  }
`;

const StyledLaptopView = styled.div`
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`;

const StyledSections = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;

  hr {
    width: 100px;
  }

  @media ${device.tablet} {
    overflow: hidden;

    hr {
      width: 100%;
    }
  }
`;

const StyledTitle = styled.div`
  font-weight: ${font.weight.bold};
  margin-bottom: 15px;
`;

const StyledUl = styled.ul`
  margin: 0;

  li {
    margin-bottom: 5px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  font-size: ${font.size.xs};
  font-weight: ${font.weight.regular};

  &.active {
    font-weight: ${font.weight.bold};
  }
`;

const Sidebar = ({ content }) => {
  const myContent = (
    <StyledSections>
      {content.map(section => (
        <Fragment key={section.title}>
          <StyledTitle>{section.title}</StyledTitle>

          <StyledUl>
            {section.links.map(link => (
              <li key={link.text}>
                <StyledNavLink to={link.to}>
                  {link.text}
                </StyledNavLink>
              </li>
            ))}
          </StyledUl>

          {section.separator && <Hr margin="15px 0" />}
        </Fragment>
      ))}
    </StyledSections>
  );

  return (
    <Fragment>
      <StyledMobileView>
        <Box fullWidth>
          {myContent}
        </Box>
      </StyledMobileView>

      <StyledLaptopView>
        <Box minMaxWidth={['230px', '100%']} padding="15px">
          {myContent}
        </Box>
      </StyledLaptopView>
    </Fragment>
  );
};

Sidebar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
};

Sidebar.defaultProps = {
  content: undefined,
};

export default Sidebar;
