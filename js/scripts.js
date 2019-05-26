var pokemonRepository = (function() {
  var repository = [
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

  return {
    add: add,
    getAll: getAll,
    filter: filter,
  };
})();

var repoItems = pokemonRepository.getAll();

pokemonRepository.add({
  name: "Bulbassaur2",
  height: 10,
  types: ["water", "poison"],
});

console.log(pokemonRepository.filter("Bulbassaur"));

repoItems.forEach(function(item) {
  var waterClass = item.types.includes("water") ? "water" : "";
  var heightInfo = "(height:" + item.height + ")";
  var heightText =
    item.height > 5 ? heightInfo + " - Wow, that's big!" : heightInfo;
  document.write(
    "<li class=" + waterClass + ">" + item.name + heightText + "</li>",
  );
});
