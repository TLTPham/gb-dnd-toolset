const { validateCommand } = require('../src/validateCommand');

console.clear();
let diceResults = [
  [['+', 2, 20 ]],
  [['+', 2, 20 ], ['+', 1, 4 ]],
  [['+', 2, 20 ], ['+', 1, 4 ], ['-', 1, 6, 'magical fire' ]],
  [['+', 2, 20 ], ['+', 2, 4 ], ['-', 3, 6 ], ['+', 1, 8 ]],
  [['+', 2, 20 ], ['+', 4, 4 ], ['+', 2, 6, 'force cold' ], ['+', 2, 8 ], ['-', 4, 10 ], ['+', 2, 'strength' ]],
];

const diceCommands = [
  '!r 2d20',
  '!r 2d20 + 1d4',
  '!r 2d20 + 1d4 - 1d6 magical fire',
  '!r 2d20 + 2d4 - 3d6 + 1d8',
  '!r 2d20 + 4d4 + 2d6 force cold + 2d8 - 4d10 + strength'
];

for(let i = 0; i < diceCommands.length; i++){
  test(`${diceCommands[i]} should return the correct object and dice array`, () => {
    let die = validateCommand(diceCommands[i], 'dnd');
    console.log(die)
    return expect(die).toStrictEqual({
      command: 'roll command',
      dice: diceResults[i]
    });
  });
}