import defaults from 'lodash/defaults';
import each from 'lodash/each';
// import find from 'lodash/find';
// import moment from 'moment';
import sortBy from 'lodash/sortBy';
import t from './translation';
import {
  USER_CAN_OWN_QUEST_CATEGORIES,
  QUEST_GENERIC,
  QUEST_SERIES,
  QUEST_MASTERCLASSER,
  QUEST_SEASONAL,
  QUEST_PETS,
  QUEST_POTIONS,
  QUEST_TIME_TRAVEL,
  QUEST_WORLD,
} from './constants';

const userCanOwnQuestCategories = USER_CAN_OWN_QUEST_CATEGORIES;
const questGeneric = QUEST_GENERIC;
const questSeries = QUEST_SERIES;
const questMasterclasser = QUEST_MASTERCLASSER;
const questSeasonal = QUEST_SEASONAL;
const questPets = QUEST_PETS;
const questPotions = QUEST_POTIONS;
const questTimeTravel = QUEST_TIME_TRAVEL;
const questWorld = QUEST_WORLD;

// need to reconstruct a flat list from these by --
// check for a lodash object tht will combine multiple objects into one obects
// I've added an additional ayer to the tree that the api and the rest of the
// code in this file are not expecting hence api.quests not being found

const quests = [
  questGeneric,
  questSeries,
  questMasterclasser,
  questSeasonal,
  questPets,
  questPotions,
  questTimeTravel,
  questWorld,
];
console.log(quests);
each(quests, (v, key) => {
  defaults(v, {
    key,
    canBuy () {
      return true;
    },
  });

  const b = v.boss;

  if (b) {
    defaults(b, {
      str: 1,
      def: 1,
    });
    if (b.rage) {
      defaults(b.rage, {
        title: t('rage'),
        description: t('bossRageDescription'),
      });
    }
  }
});

const questsByLevel = sortBy(quests, quest => quest.lvl || 0);

export {
  quests,
  questsByLevel,
  userCanOwnQuestCategories,
};
