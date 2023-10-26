const { CharacterSheet,createCharacter } = require('../src/characterSheet');

test('CreateCharacter should return a character sheet', () => {
  let dndTemplate = createCharacter.dnd();
  return expect(dndTemplate).toBeInstanceOf(CharacterSheet);
});