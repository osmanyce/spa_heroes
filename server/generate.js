let database = { heroes: []};
let listPower = [
  'Supernatural Strength',
  'Supernatural Condition',
  'Supernatural Combat',
  'Supernatural Agility',
  'Supernatural Leap',
  'Supernatural Durability',
  'Supernatural Stamina',
  'Supernatural Dexterity',
  'Supernatural Reflexes',
  'Supernatural Flexibility',
  'Supernatural Senses',
];

for (let i = 1; i<= 20; i++) {
  database.heroes.push({
    id: i,
    name: `Heroe ${i}`,
    power: listPower[Math.floor(Math.random() * 10)]
  });
}

console.log(JSON.stringify(database));
