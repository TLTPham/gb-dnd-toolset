const dieRegex = (die) => {
  return /^[1-9]d([1-9]|[1-9][0-9]|1[0-9][0-9])( .+)?/.test(die);
}
const diceConcat = /[+-]/g
const isNumber = (input) => {
  return /^\d+( .+)?/g.test(input)
}
const statLookUp = {
  dnd: {
    abilityScores: [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ],
    skills: [ 'athletics', 'acrobatics', 'sleightOfHand', 'stealth', 'arcana', 'history', 'investigation', 'nature', 'religion', 'animalHandling', 'insight', 'medicine', 'perception', 'survival', 'deception', 'intimidation', 'performance', 'persuasion' ],

    damageType: [ 'acid', 'bludgeoning', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'piercing', 'poison', 'psychic', 'radiant', 'slashing', 'thunder' ],
  }
}

const validateCommand = (text, gameType, character) => {
  let command = text.split(' ')[0];
  let commandValues = text.replace(command, '').trim();
  //Switch statement to handle different commands
  switch (command) {
    case '!r':
      let formattedDice = [];
      let args = commandValues.split(diceConcat);
      let posNeg = commandValues.match(diceConcat)
      if(posNeg && posNeg.length !== args.length) {
        posNeg = [ '+' ].concat(posNeg);
      } else{
        posNeg = ['+']
      }
      for (let i in args) {
        let cleanArg = args[i].trim();

        if (dieRegex(cleanArg)) {// check if die
          let quantity = parseInt(cleanArg.split('d')[0]);
          let dieSize = parseInt(cleanArg.split('d')[1].split('+')[0]);
          let type = cleanArg.split(/ (.*)/)[1];

          formattedDice.push([ posNeg[i], quantity, dieSize, ...type ? [ type ] : [] ]);
        } else if (statLookUp[gameType].abilityScores.includes(cleanArg)) {// check if stat mod
          let abilityScore = cleanArg;
          let modifier = character ? character.stats.abilityScores[abilityScore].modifier() : 2;

          formattedDice.push([ posNeg[i], modifier, abilityScore ]);
        } else if (statLookUp[gameType].skills.includes(cleanArg)) {// check if skill mod
          let skill = cleanArg;
          let modifier = character ? character.stats.skills[skill].modifier() : 2;

          formattedDice.push([ posNeg[i], modifier, skill ]);
        } else if (isNumber(cleanArg)) {// check if flat modifier
          let number = parseInt(cleanArg);
          let type = cleanArg.replace(number+'', '').trim();
          formattedDice.push([ posNeg[i], number, ...type ? [ type ] : []]);
        }
      }
      return {
        command: 'roll command',
        dice: formattedDice
      };

    default:
      return {
        command: 'invalid command',
      }
  }
}

module.exports = {
  validateCommand,
  statLookUp
};