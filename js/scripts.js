const pokemonRepository = (function() {
  const repository = [
    {
      name: "Bulbassaur",
      height: 7,
      types: ["grass", "poison"],
    },
    {
      name: "Squirtle",
      height: 2,
      types: ["water"],
    },
    {
      name: "Butterfree",
      height: 2,
      types: ["bug"],
    },
  ];

  function getAll() {
    return repository;
  }

  function add(item) {
    if (
      typeof item === "object" &&
      JSON.stringify(Object.keys(item)) ===
        JSON.stringify(Object.keys(repository[0]))
    ) {
      repository.push(item);
    }
  }

  function filter(query) {
    if (!query) return;
    return repository.filter(function(item) {
      return item.name.includes(query);
    });
  }

  function addListItem(item) {
    $list = document.querySelector(".dog-list");
    const newElement = document.createElement("li");
    newElement.classList.add("dog-list__item");

    $list.appendChild(newElement);

    // let newSpan = document.createElement("span");
    const newButton = document.createElement("button");

    $newListItem = document.querySelector(".dog-list__item:last-child");
    // $newListItem.appendChild(newSpan);
    $newListItem.appendChild(newButton);

    // $newListItemSpan = document.querySelector(
    //   ".dog-list__item:last-child span",
    // );

    // const spanNode = document.createTextNode(item.name);

    // $newListItemSpan.appendChild(spanNode);

    $newListItemButton = document.querySelector(
      ".dog-list__item:last-child button",
    );

    const buttonNode = document.createTextNode("See " + item.name);

    $newListItemButton.appendChild(buttonNode);

    $newListItemButton.addEventListener("click", function() {
      showDetails(item);
    });
  }

  function showDetails(pokemon) {
    console.log("REBB pokemon", pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    filter: filter,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

const repoItems = pokemonRepository.getAll();

pokemonRepository.add({
  name: "Bulbassaur2",
  height: 10,
  types: ["water", "poison"],
});

// console.log(pokemonRepository.filter("Bulbassaur"));

repoItems.forEach(function(item) {
  pokemonRepository.addListItem(item);
});
