import agileCroucher from '../assets/images/survival/Agile Croucher.svg?react';
import lootersInstincts from '../assets/images/survival/Looter’s Instincts.svg?react';
import revitalizingSquat from '../assets/images/survival/Revitalizing Squat.svg?react';
import silentScavenger from '../assets/images/survival/Silent Scavenger.svg?react';
import inRoundCrafting from '../assets/images/survival/In-round Crafting.svg?react';
import sufferInSilence from '../assets/images/survival/Suffer In Silence.svg?react';
import goodAsNew from '../assets/images/survival/Good As New.svg?react';
import broadShoulders from '../assets/images/survival/Broad Shoulders.svg?react';
import travelingTinkerer from '../assets/images/survival/Traveling Tinkerer.svg?react';
import stubbornMule from '../assets/images/survival/Stubborn Mule.svg?react';
import lootersLuck from '../assets/images/survival/Looter’s Luck.svg?react';
import oneRaidersScraps from '../assets/images/survival/One Raider’s Scraps.svg?react';
import threeDeepBreaths from '../assets/images/survival/Three Deep Breaths.svg?react';
import securityBreach from '../assets/images/survival/Security Breach.svg?react';
import minesweeper from '../assets/images/survival/Minesweeper.svg?react'

const survival = [
    // subsection
    [
        // node
        {
            name: "Agile Croucher",
            description: "Your movement speed while crouching is increased.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Looter's Instincts", "Revitalizing Squat"],
            image: agileCroucher
        }
    ],
    // subsection
    [
        // node
        {
            name: "Looter's Instincts",
            description: "When searching a container, loot is revealed faster.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Silent Scavenger"],
            image: lootersInstincts
        },
        // node
        {
            name: "Revitalizing Squat",
            description: "Stamina regeneration while crouched is increased.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["In-round Crafting"],
            image: revitalizingSquat
        }
    ],
    [
        {
            name: "Silent Scavenger",
            description: "You make less noise when looting.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Suffer In Silence"],
            image: silentScavenger
        },
        {
            name: "In-round Crafting",
            description: "Unlocks the ability to field-craft items while topside.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["Good As New"],
            image: inRoundCrafting
        }
    ],
    [
        {
            name: "Suffer In Silence",
            description: "While critically hurt, your movement makes less noise.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Broad Shoulders", "Traveling Tinkerer"],
            image: sufferInSilence
        },
        {
            name: "Good As New",
            description: "While under a healing effect, stamina regeneration is increased.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Traveling Tinkerer", "Stubborn Mule"],
            image: goodAsNew
        }
    ],
    [
        {
            name: "Broad Shoulders",
            description: "Increases the maximum weight you can carry.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Looter's Luck"],
            image: broadShoulders
        },
        {
            name: "Traveling Tinkerer",
            description: "Unlocks additional items to field craft.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["One Raider's Scraps"],
            image: travelingTinkerer
        },
        {
            name: "Stubborn Mule",
            description: "Your stamina regeneration is less affected by being over-encumbered.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Three Deep Breaths"],
            image: stubbornMule
        }
    ],
    [
        {
            name: "Looter's Luck",
            description: "While looting, there's a chance to reveal twice as many items at once.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Security Breach"],
            image: lootersLuck
        },
        {
            name: "One Raider's Scraps",
            description: "When looting Raider containers, you have a small chance of finding additional field-crafted items.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Security Breach", "Minesweeper"],
            image: oneRaidersScraps
        },
        {
            name: "Three Deep Breaths",
            description: "After an ability drains your stamina, you recover more quickly.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Minesweeper"],
            image: threeDeepBreaths
        }
    ],
    [
        {
            name: "Security Breach",
            description: "Lets you breach Security Lockers.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: securityBreach
        },
        {
            name: "Minesweeper",
            description: "Mines and explosive deployables can be defused when in close proximity.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: minesweeper
        }
    ]
]


export default survival;