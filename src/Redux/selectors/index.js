const searchSpaceboxSelector = state => (
  Object.values(state.spacebox.all).filter(spacebox => (
    spacebox.title.toUpperCase().includes(state.spaceboxToSearch.toUpperCase())
  ))
);

export default searchSpaceboxSelector;
