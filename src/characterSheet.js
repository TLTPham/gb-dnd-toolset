class CharacterSheet {
  constructor(abilityScores, skills, level, proficiencyBonus) {
    this.stats = {
      level,
      health: 0,
      abilityScores: false,
      skills: false,
      proficiencyBonus: proficiencyBonus || 2,
    };

    (abilityScores) && this.#createAbilityScores(abilityScores);
    (skills) && this.#createSkills(skills);

  }

  #createAbilityScores(abilityScoreNames) {
    let tempScore = {};
    Object.entries(abilityScoreNames).forEach(([ key, value ]) => {
      tempScore[key] = {
        displayName: key.charAt(0).toUpperCase() + key.slice(1),
        score: value,
      };
      tempScore[key].modifier = () => {
        return Math.floor((tempScore[key].score - 10) / 2);
      };
    });
    this.stats.abilityScores = tempScore;
  }

  #createSkills(skills) {
    let tempSkills = {};
    Object.entries(skills).forEach(([ key, value ]) => {
      let displayName = value.displayName || key;
      tempSkills[key] = value;
      tempSkills[key].displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      tempSkills[key].modifier = () => {
        let modifier = this.stats.abilityScores[value.abilityScore].modifier();
        let proficiency = (this.stats.skills[key].proficiency) ? this.stats.proficiencyBonus : 0;
        let expertise = (this.stats.skills[key].expertise) ? 2 : 1;
        // console.log(`${key} -> StatMod:${modifier} + ProficientMod:${proficiency} * IsExpert:${expertise}`);
        return modifier + proficiency * expertise;
      };
    });
    this.stats.skills = tempSkills;
  }
}
function dndTemplate(abilityScores, skills, level) {
  let outputAbilityScores = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  }
  let outputSkills = {
    athletics: {
      displayName: 'athletics',
      abilityScore: 'strength',
      proficiency: false,
      expertise: false,
    },
    acrobatics: {
      displayName: 'acrobatics',
      abilityScore: 'dexterity',
      proficiency: false,
      expertise: false,
    },
    sleightOfHand: {
      displayName: 'sleight of Hand',
      abilityScore: 'dexterity',
      proficiency: false,
      expertise: false,
    },
    stealth: {
      displayName: 'stealth',
      abilityScore: 'dexterity',
      proficiency: false,
      expertise: false,
    },
    arcana: {
      displayName: 'arcana',
      abilityScore: 'intelligence',
      proficiency: false,
      expertise: false,
    },
    history: {
      displayName: 'history',
      abilityScore: 'intelligence',
      proficiency: false,
      expertise: false,
    },
    investigation: {
      displayName: 'investigation',
      abilityScore: 'intelligence',
      proficiency: false,
      expertise: false,
    },
    nature: {
      displayName: 'nature',
      abilityScore: 'intelligence',
      proficiency: false,
      expertise: false,
    },
    religion: {
      displayName: 'religion',
      abilityScore: 'intelligence',
      proficiency: false,
      expertise: false,
    },
    animalHandling: {
      displayName: 'animal Handling',
      abilityScore: 'wisdom',
      proficiency: false,
      expertise: false,
    },
    insight: {
      displayName: 'insight',
      abilityScore: 'wisdom',
      proficiency: false,
      expertise: false,
    },
    medicine: {
      displayName: 'medicine',
      abilityScore: 'wisdom',
      proficiency: false,
      expertise: false,
    },
    perception: {
      displayName: 'perception',
      abilityScore: 'wisdom',
      proficiency: false,
      expertise: false,
    },
    survival: {
      displayName: 'survival',
      abilityScore: 'wisdom',
      proficiency: false,
      expertise: false,
    },
    deception: {
      displayName: 'deception',
      abilityScore: 'charisma',
      proficiency: false,
      expertise: false,
    },
    intimidation: {
      displayName: 'intimidation',
      abilityScore: 'charisma',
      proficiency: false,
      expertise: false,
    },
    performance: {
      displayName: 'performance',
      abilityScore: 'charisma',
      proficiency: false,
      expertise: false,
    },
    persuasion: {
      displayName: 'persuasion',
      abilityScore: 'charisma',
      proficiency: false,
      expertise: false,
    },
  }
  let outputLevel = level || 1;
  let outputProficiencyBonus = 1 + Math.ceil(outputLevel / 4);
  if (abilityScores) {
    Object.entries(abilityScores).forEach(([ key, value ]) => {
      outputAbilityScores[key] = value
    });
  }
  if (skills) {
    Object.entries(skills).forEach(([ skillName, skill ]) => {
      Object.entries(skill).forEach(([ skillKey, skillValue ]) => {
        outputSkills[skillName][skillKey] = skillValue
      })
    });
  }
  return new CharacterSheet(outputAbilityScores, outputSkills, outputLevel, outputProficiencyBonus)
}

const createCharacter = {
  dnd: dndTemplate,
}


module.exports = {
  CharacterSheet,
  createCharacter
};