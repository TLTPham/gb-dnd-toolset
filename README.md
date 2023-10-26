# gb-dnd-toolset

## Character Sheet
Basic character sheet for our templates.  This is a work in progress.

## createCharcter
Basic Template for creating a character.  This is a work in progress.

### .dnd(stats)
This will create a CharacterSheet with basic DnD5e stats.  This is a work in progress.
You can input settings to override the default values.
ex
```javascript
createCharcter.dnd(
  {
    strength: 15,
  },
  {
    athletics: {
      proficiency: true,
    },
    sleightOfHand: {
      proficiency: true,
      expertise: true,
    }
  },
  4);
```

## validateCommand (command)
Validates a command and parse the given arguments.  This is a work in progress.

### calling a roll command:

```javascript
let result = validateCommand('!r 1d20 + strength');
```
```javascript
result = {
  command: 'roll command',
  dice: [['+', 1, 20], ['+', 2, 'strength']],
}
```