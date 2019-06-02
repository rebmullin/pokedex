const pokemonRepository = (function() {
  const repository = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return repository;
  }

  function add(item) {
    if (typeof item === "object") {
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

  function showDetails(item) {
    loadDetails(item).then(function(pokemon) {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        return item;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    filter: filter,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
