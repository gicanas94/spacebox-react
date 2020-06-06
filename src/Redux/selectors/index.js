const searchSpaceboxSelector = (state) =>
  state.homepageSpaceboxes.all.filter((spacebox) =>
    spacebox.title.toUpperCase().includes(state.spaceboxToSearch.toUpperCase()),
  );

export default searchSpaceboxSelector;
