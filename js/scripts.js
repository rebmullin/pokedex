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
  var bigText = repository[i].height > 5 ? " - Wow, that's big!" : "";
  document.write(
    "<li>" +
      repository[i].name +
      " height:" +
      repository[i].height +
      bigText +
      "</li>",
  );
}
