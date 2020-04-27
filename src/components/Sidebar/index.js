import { FormattedMessage } from 'react-intl';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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
    position: sticky;
    top: 75px;
  }

  @media ${device.laptop} {
    top: 80px;
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
  font-weight: ${({ theme }) => theme.components.sidebar.heading.fontWeight};
  margin-bottom: 15px;
`;

const StyledLi = styled.li`
  margin-bottom: 5px;

  &:last-of-type {
    margin-bottom: 0;
  }

  a {
    font-size: ${({ theme }) => theme.components.sidebar.link.fontSize};
    font-weight: ${({ theme }) => theme.components.sidebar.link.fontWeight};
    word-break: break-word;

    &.active {
      font-weight: ${({ theme }) => (
    theme.components.sidebar.activeLink.fontWeight
  )};
    }

    &.not-active {
      font-weight: inherit;
    }
  }
`;

const Sidebar = ({ content }) => {
  const location = useLocation();

  const myContent = (
    <StyledSections>
      {content.map((section) => (
        <Fragment key={section.heading}>
          <StyledHeading>
            <FormattedMessage id={section.heading} />
          </StyledHeading>

          <ul>
            {section.links.map((link) => (
              link.visible && (
                <StyledLi key={link.text}>
                  <HashLink
                    className={
                      location.pathname + location.hash === link.to
                        ? 'active'
                        : 'not-active'
                    }
                    to={link.to}
                  >
                    <FormattedMessage id={link.text} />
                  </HashLink>
                </StyledLi>
              )
            ))}
          </ul>

          {section.separator && <Hr margin="15px 0" />}
        </Fragment>
      ))}
    </StyledSections>
  );

  return (
    <>
      <StyledMobileView>
        <Box fullWidth>
          {myContent}
        </Box>
      </StyledMobileView>

      <StyledLaptopView>
        <Box fullWidth padding="15px">
          {myContent}
        </Box>
      </StyledLaptopView>
    </>
  );
};

Sidebar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;
