import _ from 'lodash';

const searchSpaceboxSelector = state => (
  _.filter(state.spacebox.all, spacebox => (
    spacebox.title.toUpperCase().includes(state.spaceboxToSearch.toUpperCase())
  ))
);

export default searchSpaceboxSelector;
