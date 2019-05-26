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

repository.forEach(function(item) {
  var waterClass = item.types.includes("water") ? "water" : "";
  var heightInfo = "(height:" + item.height + ")";
  var heightText =
    item.height > 5 ? heightInfo + " - Wow, that's big!" : heightInfo;
  document.write(
    "<li class=" + waterClass + ">" + item.name + heightText + "</li>",
  );
});
