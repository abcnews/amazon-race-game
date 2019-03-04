import PERSON_1 from './assets/Person1.png';
import PERSON_1_TROLLEY from './assets/Person1Trolley.png';
import PERSON_1_TROLLEY_RUN from './assets/Person1TrolleyRun.png';
import TROLLEY_PRODUCTS from './assets/TrolleyProducts.png';
import PERSON_2 from './assets/Person2.png';
import PERSON_2_TROLLEY from './assets/Person2Trolley.png';
import PERSON_2_TROLLEY_RUN from './assets/Person2TrolleyRun.png';
import PERSON_3 from './assets/Person3.png';
import PERSON_3_TROLLEY from './assets/Person3Trolley.png';
import PERSON_3_TROLLEY_RUN from './assets/Person3TrolleyRun.png';
import PERSON_COUCH from './assets/PersonCouch.png';
import PEOPLE from './assets/People.png';
import SECURITY_PERSON from './assets/SecurityPerson.png';
import PEOPLE_TRAINING from './assets/PeopleTraining.png';
import LUNCH_PEOPLE from './assets/LunchPeople.png';
import UNION_PEOPLE from './assets/UnionPeople.png';
import TROLLEY_PEOPLE from './assets/TrolleyPeople.png';
import PERSON_NEEDS_HELP from './assets/PersonNeedsHelp.png';
import SUPERVISOR from './assets/Supervisor.png';
import AGENCY_OFFICE from './assets/AgencyOffice.png';
import BREAKROOM from './assets/Breakroom.png';
import STARTING_AREA from './assets/StartingArea.png';
import STARTING_AREA_WITHOUT_VESTS from './assets/StartingAreaWithoutVests.png';
import WAREHOUSE_ASIDE from './assets/WarehouseAside.png';
import WAREHOUSE_SHELF from './assets/WarehouseShelf.png';
import WAREHOUSE_ESTABLISHING from './assets/OutsideWarehouseEntrance.png';
import SECURITY_GATES from './assets/SecurityGates.png';
import COUCH from './assets/Couch.png';
import HOME from './assets/Home.jpg';
import PHONE from './assets/Phone.png';
import BALLOON from './assets/Balloon.png';
import SCANNER from './assets/Scanner.png';
import BIRD from './assets/Bird.png';
import DISAPPEAR from './assets/Disappear.png';

import ARMY_KNIFE from './assets/ProductArmyKnife.png';
import BENCH from './assets/ProductBench.png';
import CAMPER from './assets/ProductCamper.png';
import CHICKEN from './assets/ProductChicken.png';
import COT from './assets/ProductCot.png';
import ESPRESSO from './assets/ProductEspresso.png';
import FLAMINGO from './assets/ProductFlamingo.png';
import HEADPHONES from './assets/ProductHeadphones.png';
import HEADPHONES_WIRED from './assets/ProductHeadphonesWired.png';
import HOGWARTS_HAT from './assets/ProductHogwartsHat.png';
import LAPTOP from './assets/ProductLaptop.png';
import MONOPOLY from './assets/ProductMonopoly.png';
import NIKE_SHIRT from './assets/ProductNikeShirt.png';
import ONE_CLICK from './assets/ProductOneClick.png';
import PANS from './assets/ProductPans.png';
import PUPPY from './assets/ProductPuppy.png';
import STORMTROOPER from './assets/ProductStormtrooper.png';
import STORMTROOPER_XL from './assets/ProductStormtrooperXL.png';
import SUBTLE_ART from './assets/ProductSubtleArt.png';
import TELEVISION from './assets/ProductTelevision.png';
import HARRY_POTTER from './assets/ProductHarryPotter.png';
import SMART_WATCH from './assets/ProductSmartWatch.png';
import STRAPPY_SPORTS_BRA from './assets/ProductStrappySportsBra.png';
import HIGH_NECK_CROP from './assets/ProductHighNeckCrop.png';
import TOILET_PAPER from './assets/ProductToiletPaper.png';
import CUBBY_HOUSE from './assets/ProductCubbyHouse.png';

export const Person1 = {
  src: PERSON_1,
  width: 18,
  height: 30,
  animations: {
    idle: [0],
    idleRight: [1],
    cheer: [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2],
    loopWaving: [7, 8, 9, 10],
    idleUp: [11],
    sitting: [12],
    loopWalkingDown: [13, 13, 14, 14, 15, 15, 16, 16],
    idleDownTiny: [17],
    loopWalkingDownTiny: [18, 18, 19, 19, 20, 20, 21, 21],
    loopWalkingUpTiny: [22, 22, 23, 23, 24, 24, 25, 25],
    loopStretches: [26, 26, 26, 26, 27, 27, 27, 27]
  }
};

export const Person2 = {
  src: PERSON_2,
  width: 18,
  height: 30,
  animations: {
    idle: [0],
    idleRight: [1],
    cheer: [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2],
    loopWaving: [7, 8, 9, 10],
    idleUp: [11],
    sitting: [12],
    loopWalkingDown: [13, 13, 14, 14, 15, 15, 16, 16],
    idleDownTiny: [17],
    loopWalkingDownTiny: [18, 18, 19, 19, 20, 20, 21, 21],
    loopWalkingUpTiny: [22, 22, 23, 23, 24, 24, 25, 25],
    loopStretches: [26, 26, 26, 26, 27, 27, 27, 27]
  }
};

export const Person3 = {
  src: PERSON_3,
  width: 18,
  height: 30,
  animations: {
    idle: [0],
    idleRight: [1],
    cheer: [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2],
    loopWaving: [7, 8, 9, 10],
    idleUp: [11],
    sitting: [12],
    loopWalkingDown: [13, 13, 14, 14, 15, 15, 16, 16],
    idleDownTiny: [17],
    loopWalkingDownTiny: [18, 18, 19, 19, 20, 20, 21, 21],
    loopWalkingUpTiny: [22, 22, 23, 23, 24, 24, 25, 25],
    loopStretches: [26, 26, 26, 26, 27, 27, 27, 27]
  }
};

export const PersonCouch = {
  src: PERSON_COUCH,
  width: 23,
  height: 22,
  animations: {
    Person1: [0],
    Person2: [1],
    Person3: [2]
  }
};

export const Person1Trolley = {
  src: PERSON_1_TROLLEY,
  width: 27,
  height: 55,
  animations: {
    idle: [0],
    loopThirsty: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
    drinking: [8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 12, 12, 11, 11, 12, 12, 12, 12, 12, 12, 12, 9, 8],
    loopWalk: [14, 14, 14, 15, 15, 15, 16, 16, 16, 17, 17, 17],
    loopJog: [14, 14, 15, 15, 16, 16, 17, 17],
    loopRun: [14, 15, 16, 17],
    fullTrolley: [18],
    lookRight: [19],
    lookLeft: [20],
    overflowingTrolley: [21, 21, 21, 21, 22],
    emptyTrolley: [23, 24, 25, 26, 27, 28, 29, 30, 30, 30, 31, 32],
    handCramp: [25],
    loopHandExercise: [33, 33, 33, 34, 34, 34]
  }
};

export const Person1TrolleyRun = {
  src: PERSON_1_TROLLEY_RUN,
  width: 40,
  height: 55,
  animations: {
    idle: [0],
    loopRunRight: [0, 1, 1, 2, 3, 3],
    loopRunLeft: [4, 5, 5, 6, 7, 7],
    loopWalkRight: [8, 9, 9, 10, 11, 11],
    loopWalkLeft: [12, 13, 13, 14, 15, 15]
  }
};

export const Person2TrolleyRun = {
  src: PERSON_2_TROLLEY_RUN,
  width: 40,
  height: 55,
  animations: {
    idle: [0],
    loopRunRight: [0, 1, 1, 2, 3, 3],
    loopRunLeft: [4, 5, 5, 6, 7, 7],
    loopWalkRight: [8, 9, 9, 10, 11, 11],
    loopWalkLeft: [12, 13, 13, 14, 15, 15]
  }
};

export const Person3TrolleyRun = {
  src: PERSON_3_TROLLEY_RUN,
  width: 40,
  height: 55,
  animations: {
    idle: [0],
    loopRunRight: [0, 1, 1, 2, 3, 3],
    loopRunLeft: [4, 5, 5, 6, 7, 7],
    loopWalkRight: [8, 9, 9, 10, 11, 11],
    loopWalkLeft: [12, 13, 13, 14, 15, 15]
  }
};

export const TrolleyProducts = {
  src: TROLLEY_PRODUCTS,
  width: 40,
  height: 55,
  animations: {
    idleRight1: [0],
    idleRight2: [1],
    idleRight3: [2],
    idleRight4: [3],
    idleRight5: [4],
    idleLeft1: [5],
    idleLeft2: [6],
    idleLeft3: [7],
    idleLeft4: [8],
    idleLeft5: [9]
  }
};

export const Person2Trolley = {
  src: PERSON_2_TROLLEY,
  width: 27,
  height: 55,
  animations: {
    idle: [0],
    loopThirsty: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
    drinking: [8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 12, 12, 11, 11, 12, 12, 12, 12, 12, 12, 12, 9, 8],
    loopWalk: [14, 14, 14, 15, 15, 15, 16, 16, 16, 17, 17, 17],
    loopJog: [14, 14, 15, 15, 16, 16, 17, 17],
    loopRun: [14, 15, 16, 17],
    fullTrolley: [18],
    lookRight: [19],
    lookLeft: [20],
    overflowingTrolley: [21, 21, 21, 21, 22],
    emptyTrolley: [23, 24, 25, 26, 27, 28, 29, 30, 30, 30, 31, 32],
    handCramp: [25],
    loopHandExercise: [33, 33, 33, 34, 34, 34]
  }
};

export const Person3Trolley = {
  src: PERSON_3_TROLLEY,
  width: 27,
  height: 55,
  animations: {
    idle: [0],
    loopThirsty: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
    drinking: [8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 12, 12, 11, 11, 12, 12, 12, 12, 12, 12, 12, 9, 8],
    loopWalk: [14, 14, 14, 15, 15, 15, 16, 16, 16, 17, 17, 17],
    loopJog: [14, 14, 15, 15, 16, 16, 17, 17],
    loopRun: [14, 15, 16, 17],
    fullTrolley: [18],
    lookRight: [19],
    lookLeft: [20],
    overflowingTrolley: [21, 21, 21, 21, 22],
    emptyTrolley: [23, 24, 25, 26, 27, 28, 29, 30, 30, 30, 31, 32],
    handCramp: [25],
    loopHandExercise: [33, 33, 33, 34, 34, 34]
  }
};

export const People = {
  src: PEOPLE,
  width: 16,
  height: 30,
  animations: {
    idle1: [0],
    chant1: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    loopStretches1: [3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],

    idle2: [5],
    chant2: [6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5],
    loopStretches2: [9, 8, 8, 8, 8, 9, 9, 9],

    idle3: [10],
    chant3: [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 10],
    loopStretches3: [13, 14, 15, 16, 16, 16, 17, 18, 19, 19, 19, 19],

    idle4: [20],
    chant4: [21, 22, 22, 22, 22, 22, 22, 22, 23, 20],
    loopStretches4: [23, 23, 23, 23, 24, 24, 24, 24],

    idle5: [25],
    chant5: [26, 27, 27, 27, 27, 27, 27, 27, 27, 26, 25],
    loopStretches5: [
      28,
      28,
      28,
      28,
      28,
      29,
      30,
      31,
      32,
      32,
      32,
      32,
      32,
      32,
      32,
      31,
      30,
      29,
      28,
      28,
      28,
      28,
      28,
      28,
      28,
      28,
      28
    ],

    idle6: [33],
    chant6: [34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 34, 33],
    loopStretches6: [36, 36, 37, 37, 37, 36, 36],

    idle7: [38],
    chant7: [39, 40, 40, 40, 40, 40, 40, 40, 40, 39, 38],
    loopStretches7: [41, 41, 41, 41, 41, 41, 42, 42, 41, 41, 41, 41, 41, 41, 41, 41, 41],
    idleDown7: [43],

    loopTrainer: [
      44,
      44,
      44,
      44,
      47,
      47,
      47,
      47,
      47,
      47,
      44,
      44,
      44,
      44,
      44,
      44,
      45,
      46,
      46,
      46,
      46,
      46,
      46,
      45,
      44,
      44,
      44,
      44,
      44,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      48,
      44,
      44,
      44,
      44,
      44
    ],

    idle8: [49],
    chant8: [50, 51, 51, 51, 51, 51, 51, 51, 51, 50, 49],

    idle9: [52],
    chant9: [53, 54, 54, 54, 54, 54, 54, 54, 54, 53, 52]
  }
};

export const SecurityPerson = {
  src: SECURITY_PERSON,
  width: 18,
  height: 30,
  animations: {
    idle: [0],
    crossArms: [1, 2, 3, 4]
  }
};

export const PeopleTraining = {
  src: PEOPLE_TRAINING,
  width: 16,
  height: 30,
  animations: {
    idle1: [0],
    idle2: [1],
    idle3: [2],
    idle4: [3],
    idle5: [4],
    idle6: [5],
    idle7: [6]
  }
};

export const LunchPeople = {
  src: LUNCH_PEOPLE,
  width: 16,
  height: 30,
  animations: {
    idle1: [0],
    phone1: [1],
    phoneShare1: [2, 2, 3],
    manager1: [4],
    manager2: [5]
  }
};

export const UnionPeople = {
  src: UNION_PEOPLE,
  width: 32,
  height: 30,
  animations: {
    idle: [0]
  }
};

export const TrolleyPeople = {
  src: TROLLEY_PEOPLE,
  width: 27,
  height: 55,
  animations: {
    idle1: [0],
    idle2: [1],
    idle3: [2],
    idle4: [3],
    idle5: [4]
  }
};

export const PersonNeedsHelp = {
  src: PERSON_NEEDS_HELP,
  width: 40,
  height: 30,
  animations: {
    idle: [0]
  }
};

export const Supervisor = {
  src: SUPERVISOR,
  width: 16,
  height: 30,
  animations: {
    idle: [0],
    loopWalkUp: [1, 1, 2, 3, 3, 4],
    loopClap: [5, 6, 7, 8, 8, 7, 6]
  }
};

export const Bird = {
  src: BIRD,
  width: 10,
  height: 10,
  animations: {
    idle: [0],
    loopFlying: [1, 1, 2, 2, 3, 3]
  }
};

export const Disappear = {
  src: DISAPPEAR,
  width: 25,
  height: 25,
  animations: {
    idle: [0, 1, 2, 3, 4, 5, 5, 6]
  }
};

export const AgencyOffice = {
  src: AGENCY_OFFICE,
  width: 400,
  height: 200
};

export const WarehouseEstablishing = {
  src: WAREHOUSE_ESTABLISHING,
  width: 400,
  height: 200
};

export const Breakroom = {
  src: BREAKROOM,
  width: 400,
  height: 200
};

export const StartingArea = {
  src: STARTING_AREA,
  width: 400,
  height: 200
};

export const StartingAreaWithoutVests = {
  src: STARTING_AREA_WITHOUT_VESTS,
  width: 400,
  height: 200
};

export const WarehouseAside = {
  src: WAREHOUSE_ASIDE,
  width: 400,
  height: 200
};

export const WarehouseShelf = {
  src: WAREHOUSE_SHELF,
  width: 400,
  height: 58,
  animations: {
    idle: [0]
  }
};

export const SecurityGates = {
  src: SECURITY_GATES,
  width: 400,
  height: 200
};

export const Home = {
  src: HOME,
  width: 400,
  height: 200
};

export const Couch = {
  src: COUCH,
  width: 400,
  height: 200
};

export const Phone = {
  src: PHONE,
  width: 75,
  height: 150,
  animations: {
    loopIdle: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    loopReply: [2, 2, 2, 2, 3, 3, 3, 3],
    loopShift: [4, 4, 4, 4, 5, 5, 5, 5],
    call: [6],
    loopSad: [7, 7, 7, 7, 7, 8, 8, 8, 8, 8],
    loopNephews: [9, 9, 9, 9, 9, 10, 10, 10, 10, 10],
    loopNephews2: [11, 11, 11, 11, 11, 12, 12, 12, 12, 12],
    angrySister: [13, 13, 13, 13, 13, 14, 14, 14, 14, 14],
    newsAlert: [15]
  }
};

export const Balloon = {
  src: BALLOON,
  width: 30,
  height: 30,
  animations: {
    thirsty: [0],
    happy: [1],
    angel: [2],
    sad: [3],
    anxious: [4],
    unhappy: [5],
    thumbsUp: [6],
    tired: [7],
    happy2: [8],
    angel2: [9],
    sad2: [10],
    anxious2: [11],
    unhappy2: [12],
    thumbsUp2: [13],
    tired2: [14],
    toilet: [15],
    toilet2: [16]
  }
};

export const Scanner = {
  src: SCANNER,
  width: 75,
  height: 150,
  animations: {
    idle: [0]
  }
};

export default {
  Person1,
  Person1Trolley,
  Person1TrolleyRun,
  Person2,
  Person2Trolley,
  Person2TrolleyRun,
  Person3,
  Person3Trolley,
  Person3TrolleyRun
};

export const Products = {
  Small: {
    OneClick: {
      name: "Book - 'One Click: Jeff Bezos and the rise of Amazon'",
      src: ONE_CLICK,
      width: 32,
      height: 48
    },
    Monopoly: {
      name: 'Property Board game',
      src: MONOPOLY,
      width: 48,
      height: 24
    },
    SwissArmyKnife: {
      name: 'Army Knife',
      src: ARMY_KNIFE,
      width: 48,
      height: 24
    },
    HogwartsHat: {
      name: 'Wizard Hat',
      src: HOGWARTS_HAT,
      width: 32,
      height: 31
    },
    SubtleArt: {
      name: "Book - 'The Subtle Art of not giving a F*ck'",
      src: SUBTLE_ART,
      width: 23,
      height: 32
    },
    Headphones: {
      name: 'Wireless Headphones',
      src: HEADPHONES,
      width: 32,
      height: 32
    },
    HeadphonesWired: {
      name: 'Noise Cancelling Headphones, wired',
      src: HEADPHONES_WIRED,
      width: 32,
      height: 40
    },
    Flamingo: {
      name: 'Giant Inflatable Flamingo',
      src: FLAMINGO,
      width: 46,
      height: 47
    },
    Chicken: {
      name: 'Chicken Squeaky Dog Toy',
      src: CHICKEN,
      width: 11,
      height: 32
    },
    StormTrooper: {
      name: 'Space Robot Costume, Size M',
      src: STORMTROOPER,
      width: 28,
      height: 47
    },
    StormTrooperXL: {
      name: 'Space Robot Costume, Size XL',
      src: STORMTROOPER_XL,
      width: 28,
      height: 50
    },
    DreamCamper: {
      name: 'Doll Campervan',
      src: CAMPER,
      width: 42,
      height: 35
    },
    Puppy: {
      name: 'Interactive Puppy Plush Toy',
      src: PUPPY,
      width: 28,
      height: 28
    },
    NikeShirt: {
      name: "Men's sports T-shirt",
      src: NIKE_SHIRT,
      width: 32,
      height: 34
    },
    HarryPotter: {
      name: 'Wizard Action Figure',
      src: HARRY_POTTER,
      width: 32,
      height: 43
    },
    SmartWatch: {
      name: 'Smart Watch',
      src: SMART_WATCH,
      width: 32,
      height: 32
    },
    StrappySportsBra: {
      name: 'Strappy Yoga Bra',
      src: STRAPPY_SPORTS_BRA,
      width: 32,
      height: 32
    },
    HighNeckCrop: {
      name: 'High Neck Crop',
      src: HIGH_NECK_CROP,
      width: 32,
      height: 32
    },
    ToiletPaper: {
      name: 'Toilet Paper Long Roll 40pk',
      src: TOILET_PAPER,
      width: 48,
      height: 32
    }
  },
  Large: {
    Laptop: {
      name: '15" Laptop',
      src: LAPTOP,
      width: 48,
      height: 30
    }
  },
  Heavy: {
    EspressoMachine: {
      name: 'Espresso Machine',
      src: ESPRESSO,
      width: 27,
      height: 32
    },
    Cookware: {
      name: '12 piece Cookware Set',
      src: PANS,
      width: 44,
      height: 23
    },

    Cot: {
      name: 'White Cot',
      src: COT,
      width: 42,
      height: 27
    },

    Bench: {
      name: 'Home Gym Folding Bench',
      src: BENCH,
      width: 34,
      height: 27
    },
    Television: {
      name: '65" 4K Smart TV',
      src: TELEVISION,
      width: 46,
      height: 26
    },

    CubbyHouse: {
      name: 'Cottage Playhouse, Tan',
      src: CUBBY_HOUSE,
      width: 48,
      height: 56
    }
  }
};

export function preloadAssets(callback) {
  const assets = [
    PERSON_1,
    PERSON_1_TROLLEY,
    PERSON_1_TROLLEY_RUN,
    TROLLEY_PRODUCTS,
    PERSON_2,
    PERSON_2_TROLLEY,
    PERSON_2_TROLLEY_RUN,
    PERSON_3,
    PERSON_3_TROLLEY,
    PERSON_3_TROLLEY_RUN,
    PERSON_COUCH,
    PEOPLE,
    SECURITY_PERSON,
    PEOPLE_TRAINING,
    LUNCH_PEOPLE,
    UNION_PEOPLE,
    TROLLEY_PEOPLE,
    PERSON_NEEDS_HELP,
    SUPERVISOR,
    AGENCY_OFFICE,
    BREAKROOM,
    STARTING_AREA,
    STARTING_AREA_WITHOUT_VESTS,
    WAREHOUSE_ASIDE,
    WAREHOUSE_SHELF,
    WAREHOUSE_ESTABLISHING,
    SECURITY_GATES,
    COUCH,
    HOME,
    PHONE,
    BALLOON,
    SCANNER,
    BIRD,
    DISAPPEAR,
    ARMY_KNIFE,
    BENCH,
    CAMPER,
    CHICKEN,
    COT,
    ESPRESSO,
    FLAMINGO,
    HEADPHONES,
    HEADPHONES_WIRED,
    HOGWARTS_HAT,
    LAPTOP,
    MONOPOLY,
    NIKE_SHIRT,
    ONE_CLICK,
    PANS,
    PUPPY,
    STORMTROOPER,
    STORMTROOPER_XL,
    SUBTLE_ART,
    TELEVISION,
    HARRY_POTTER,
    SMART_WATCH,
    STRAPPY_SPORTS_BRA,
    HIGH_NECK_CROP,
    TOILET_PAPER,
    CUBBY_HOUSE
  ];

  let loadedAssets = 0;

  function onload() {
    loadedAssets++;

    if (loadedAssets === assets.length) {
      callback();
    }
  }

  assets.forEach(asset => {
    const img = document.createElement('img');
    img.onload = onload;
    img.src = asset;
  });
}
