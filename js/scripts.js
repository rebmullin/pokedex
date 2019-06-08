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
      showLoadingMessage();
      showDetails(item);
    });
  }

  function showDetails(item) {
    loadDetails(item)
      .then(function(pokemon) {
        // console.log(pokemon);
        showModal(pokemon);
      })
      .then(function() {
        // shideLoadingMessage();
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    const $modalWrapper = document.querySelector(".modal-wrapper");

    // Clear out any modal content
    $modalWrapper.innerHTML = "";
    modal = document.createElement("div");
    modal.classList.add("modal");
    $modalWrapper.appendChild(modal);

    const closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.addEventListener("click", hideModal);

    modal.appendChild(closeButton);

    // Add pokemon details to display
    const pokemonDetails = document.createElement("div");
    pokemonDetails.classList.add("pokemon");
    modal.appendChild(pokemonDetails);

    const pokemonName = document.createElement("h2");
    pokemonName.classList.add("pokemon-title");
    pokemonName.innerText = pokemon.name;
    pokemonDetails.appendChild(pokemonName);

    const pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon-image");
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.alt = pokemon.name;
    pokemonDetails.appendChild(pokemonImage);

    const pokemonHeight = document.createElement("p");
    pokemonHeight.classList.add("pokemon-height");
    pokemonHeight.innerText = "Height: " + String(pokemon.height);
    pokemonDetails.appendChild(pokemonHeight);

    $modalWrapper.classList.add("modal-wrapper--show");
  }

  // Hide modal on Esc keydown
  window.addEventListener("keydown", function(e) {
    const $modalWrapper = document.querySelector(".modal-wrapper");
    if (
      e.key === "Escape" &&
      $modalWrapper.classList.contains("modal-wrapper--show")
    ) {
      hideModal();
    }
  });

  // Hide modal on click outside of modal but on overlay
  const $modalWrapper = document.querySelector(".modal-wrapper");
  $modalWrapper.addEventListener("click", function(e) {
    const target = e.target;
    if (target === $modalWrapper) {
      hideModal();
    }
  });

  function hideModal() {
    const $modal = document.querySelector(".modal-wrapper");
    $modal.classList.remove("modal-wrapper--show");
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

  function showLoadingMessage() {
    const newElement = document.createElement("p");
    newElement.classList.add("loading");
    $body = document.querySelector("body");
    const text = document.createTextNode("Loading...");
    newElement.appendChild(text);
    $body.appendChild(newElement);
  }

  function hideLoadingMessage() {
    $loading = document.querySelector(".loading");
    $loading.parentNode.removeChild($loading);
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
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

pokemonRepository.showLoadingMessage();
pokemonRepository
  .loadList()
  .then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  })
  .then(function() {
    pokemonRepository.hideLoadingMessage();
  })
  .catch(function(e) {
    console.error(e);
  });
