import _ from 'lodash';

const searchSpaceboxSelector = (state) => {
  const spaceboxes = state.spacebox.all;

  _.map(spaceboxes, (spacebox, index) => Object.defineProperty(
    spacebox,
    'myId',
    {
      value: index,
      enumerable: true,
    },
  ));

  return _.filter(spaceboxes, spacebox => (
    spacebox.title.toUpperCase().includes(state.spaceboxToSearch.toUpperCase())
  ));
};

export default searchSpaceboxSelector;
