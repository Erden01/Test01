const handleSortChange = (event, data, container) => {
  const sortBy = event.target.dataset.sort;
  if (sortBy) {
    const sortedData = sortProducts(data, sortBy);
    displayList(sortedData, container);
  }
};

function sortProducts(data, sortBy) {
  const sortedData = [...data];

  const compareFunctions = {
    "price-asc": (a, b) => parseFloat(a.price) - parseFloat(b.price),
    "price-desc": (a, b) => parseFloat(b.price) - parseFloat(a.price),
    code: (a, b) => a.code.localeCompare(b.code),
    title: (a, b) => a.title.localeCompare(b.title),
  };

  sortedData.sort(compareFunctions[sortBy] || compareFunctions["title"]);
  return sortedData;
}

function updateSelectedSortOption(selectedOption) {
  document.querySelectorAll(".sorting_option li").forEach((option) => {
    option.classList.remove("selected");
  });
  selectedOption.classList.add("selected");
}
