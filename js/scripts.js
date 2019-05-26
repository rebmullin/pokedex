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

for (var i = 0; i < repository.length; i++) {
  var waterClass = repository[i].types.includes("water") ? "water" : "";
  var heightInfo = " (height:" + repository[i].height + ")";
  var heightText =
    repository[i].height > 5 ? heightInfo + " - Wow, that's big!" : heightInfo;
  document.write(
    "<li class=" + waterClass + ">" + repository[i].name + heightText + "</li>",
  );
}
