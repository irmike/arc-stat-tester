import usedToTheWeight from '../assets/images/conditioning/Used To The Weight.svg?react';
import blastBorn from '../assets/images/conditioning/Blast-Born.svg?react';
import gentlePressure from '../assets/images/conditioning/Gentle Pressure.svg?react';
import fightOrFlight from '../assets/images/conditioning/Fight Or Flight.svg?react';
import proficientPryer from '../assets/images/conditioning/Proficient Pryer.svg?react';
import survivorsStamina from "../assets/images/conditioning/Survivor's Stamina.svg?react";
import unburdenedRoll from '../assets/images/conditioning/Unburdened Roll.svg?react';
import downedButDetermined from '../assets/images/conditioning/Downed But Determined.svg?react';
import aLittleExtra from '../assets/images/conditioning/A Little Extra.svg?react';
import effortlessSwing from '../assets/images/conditioning/Effortless Swing.svg?react';
import turtleCrawl from '../assets/images/conditioning/Turtle Crawl.svg?react';
import loadedArms from '../assets/images/conditioning/Loaded Arms.svg?react';
import skyClearingSwing from '../assets/images/conditioning/Sky-Clearing Swing.svg?react';
import backOnYourFeet from '../assets/images/conditioning/Back On Your Feet.svg?react';
import flyswatter from '../assets/images/conditioning/Flyswatter.svg?react'

const conditioning = [
    // subsection
    [
        // node
        {
            name: "Used To The Weight",
            description: "Wearing a shield doesn't slow you down as much.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Blast-Born", "Gentle Pressure"],
            image: usedToTheWeight
        }
    ],
    // subsection
    [
        // node
        {
            name: "Blast-Born",
            description: "Your hearing is less affected by nearby explosions.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Fight Or Flight"],
            image: blastBorn
        },
        // node
        {
            name: "Gentle Pressure",
            description: "You make less noise when breaching.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Proficient Pryer"],
            image: gentlePressure
        }
    ],
    [
        {
            name: "Fight Or Flight",
            description: "When you're hurt in combat, regain a fixed amount of stamina. Has cooldown between uses.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Survivor's Stamina"],
            image: fightOrFlight
        },
        {
            name: "Proficient Pryer",
            description: "Breaching doors and containers takes less time",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Unburdened Roll"],
            image: proficientPryer
        }
    ],
    [
        {
            name: "Survivor's Stamina",
            description: "When you're critically hurt, your stamina regenerates faster.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Downed But Determined", "A Little Extra"],
            image: survivorsStamina
        },
        {
            name: "Unburdened Roll",
            description: "If your shield breaks, your first Dodge Roll within a few seconds does not cost stamina.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["A Little Extra", "Effortless Swing"],
            image: unburdenedRoll
        }
    ],
    [
        {
            name: "Downed But Determined",
            description: "When you're downed, it takes longer before you collapse.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Turtle Crawl"],
            image: downedButDetermined
        },
        {
            name: "A Little Extra",
            description: "Breaching an object generates resources.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["Loaded Arms"],
            image: aLittleExtra
        },
        {
            name: "Effortless Swing",
            description: "Melee abilities cost less stamina.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Sky-Clearing Swing"],
            image: effortlessSwing
        }
    ],
    [
        {
            name: "Turtle Crawl",
            description: "While downed, you take less damage.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Back On Your Feet"],
            image: turtleCrawl
        },
        {
            name: "Loaded Arms",
            description: "Your equipped weapon has less impact on your encumbrance.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["Back On Your Feet", "Flyswatter"],
            image: loadedArms
        },
        {
            name: "Sky-Clearing Swing",
            description: "You deal more melee damage to drones.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Flyswatter"],
            image: skyClearingSwing
        }
    ],
    [
        {
            name: "Back On Your Feet",
            description: "When you're critically hurt, your health regenerates until a certain limit.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: backOnYourFeet
        },
        {
            name: "Flyswatter",
            description: "Wasps and Turrets can now be destroyed with a single melee attack.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: flyswatter
        }
    ]
]


export default conditioning;