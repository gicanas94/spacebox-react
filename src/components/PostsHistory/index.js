import { FormattedDateParts, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Hr from '../Hr';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';

const StyledYearTitle = styled.div`
  font-size: ${({ theme }) => theme.components.postsHistory.yearTitle.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.postsHistory.yearTitle.fontWeight};
`;

const StyledMonthTitle = styled.div`
  font-size: ${({ theme }) =>
    theme.components.postsHistory.monthTitle.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.postsHistory.monthTitle.fontWeight};
  margin-left: 10px;
  margin-top: 5px;
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.components.postsHistory.link.fontSize};
  display: block;
  margin-left: 20px;
  margin-top: 10px;
  word-break: break-word;
`;

const PostsHistory = ({ history, intl, spaceboxSlug }) => (
  <Box
    collapsed
    collapseTitle="components.postsHistory.boxCollapseTitle"
    margin="0"
    padding="15px"
  >
    {Object.keys(history)
      .reverse()
      .map((year, index) => (
        <Fragment key={year}>
          <StyledYearTitle>{year}</StyledYearTitle>

          {Object.keys(history[year]).map((month) => (
            <Fragment key={month}>
              <StyledMonthTitle>
                <FormattedDateParts
                  month="long"
                  value={new Date(0, month).toISOString()}
                >
                  {(parts) => parts[0].value.toUpperCase()}
                </FormattedDateParts>
              </StyledMonthTitle>

              {history[year][month].map((post) => (
                <StyledLink
                  key={post.createdAt}
                  target="_blank"
                  to={`${ROUTES.SPACE_BASE}/${spaceboxSlug}/${post.slug}`}
                >
                  <span
                    data-for={(post.createdAt + 1).toString()}
                    data-tip={`${intl.formatDate(post.createdAt, {
                      day: 'numeric',
                      month: 'long',
                      weekday: 'long',
                      year: 'numeric',
                    })} - ${intl.formatTime(post.createdAt)}`}
                  >
                    {post.title}
                  </span>

                  <Tooltip
                    effect="solid"
                    delayShow={500}
                    id={(post.createdAt + 1).toString()}
                    place="right"
                  />
                </StyledLink>
              ))}
            </Fragment>
          ))}

          {Object.keys(history).length > index + 1 && <Hr margin="10px 0" />}
        </Fragment>
      ))}
  </Box>
);

PostsHistory.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  spaceboxSlug: PropTypes.string.isRequired,
};

export default injectIntl(PostsHistory);
