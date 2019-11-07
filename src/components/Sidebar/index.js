import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { device } from '../../styles';
import Hr from '../Hr';

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

const StyledHeading = styled.div`
  font-weight: ${({ theme }) => theme.components.Sidebar.heading.fontWeight};
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

const StyledNavLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.components.Sidebar.link.fontSize};
  font-weight: ${({ theme }) => theme.components.Sidebar.link.fontWeight};

  &.active {
    font-weight: ${({ theme }) => (
      theme.components.Sidebar.activeLink.fontWeight
    )};
  }

  &.not-active {
    font-weight: inherit;
  }
`;

const Sidebar = ({ content, location }) => {
  const myContent = (
    <StyledSections>
      {content.map(section => (
        <Fragment key={section.heading}>
          <StyledHeading>
            <FormattedMessage id={section.heading} />
          </StyledHeading>

          <StyledUl>
            {section.links.map(link => (
              <li key={link.text}>
                <StyledNavLink
                  className={location.pathname === link.to ? 'active' : 'not-active'}
                  to={link.to}
                >
                  <FormattedMessage id={link.text} />
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
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Sidebar);
