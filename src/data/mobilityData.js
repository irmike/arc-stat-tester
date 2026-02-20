import nimbleClimber from '../assets/images/mobility/Nimble Climber.svg?react';
import marathonRunner from '../assets/images/mobility/Marathon Runner.svg?react';
import slipAndSlide from '../assets/images/mobility/Slip and Slide.svg?react';
import youthfulLungs from '../assets/images/mobility/Youthful Lungs.svg?react';
import sturdyAnkles from '../assets/images/mobility/Sturdy Ankles.svg?react';
import carryTheMomentum from '../assets/images/mobility/Carry The Momentum.svg?react';
import calmingStroll from '../assets/images/mobility/Calming Stroll.svg?react';
import effortlessRoll from '../assets/images/mobility/Effortless Roll.svg?react';
import crawlBeforeYouWalk from '../assets/images/mobility/Crawl Before You Walk.svg?react';
import offTheWall from '../assets/images/mobility/Off The Wall.svg?react';
import heroicLeap from '../assets/images/mobility/Heroic Leap.svg?react';
import vigorousVaulter from '../assets/images/mobility/Vigorous Vaulter.svg?react';
import readyToRoll from '../assets/images/mobility/Ready To Roll.svg?react';
import vaultsOnVaultsOnVaults from '../assets/images/mobility/Vaults on Vaults on Vaults.svg?react';
import vaultSpring from '../assets/images/mobility/Vault Spring.svg?react'

const mobility = [
    // subsection
    [
        // node
        {
            name: "Nimble Climber",
            description: "You can climb and vault more quickly.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Marathon Runner", "Slip and Slide"],
            image: nimbleClimber
        }
    ],
    // subsection
    [
        // node
        {
            name: "Marathon Runner",
            description: "Moving around costs less stamina.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Youthful Lungs"],
            image: marathonRunner
        },
        // node
        {
            name: "Slip and Slide",
            description: "You can slide further and faster.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Sturdy Ankles"],
            image: slipAndSlide
        }
    ],
    [
        {
            name: "Youthful Lungs",
            description: "Increase your max stamina",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Carry The Momentum"],
            image: youthfulLungs
        },
        {
            name: "Sturdy Ankles",
            description: "You take less fall damage when falling from a non-lethal height.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Calming Stroll"],
            image: sturdyAnkles
        }
    ],
    [
        {
            name: "Carry The Momentum",
            description: "After a Sprint Dodge Roll, sprinting does not consume stamina for a short time. Has a cooldown between uses.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Effortless Roll", "Crawl Before You Walk"],
            image: carryTheMomentum
        },
        {
            name: "Calming Stroll",
            description: "While walking, your stamina regenerates as if you were standing still.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Crawl Before You Walk", "Off The Wall"],
            image: calmingStroll
        }
    ],
    [
        {
            name: "Effortless Roll",
            description: "Dodge Rolls cost less stamina.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Heroic Leap"],
            image: effortlessRoll
        },
        {
            name: "Crawl Before You Walk",
            description: "When you're downed, you crawl faster.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Vigorous Vaulter"],
            image: crawlBeforeYouWalk
        },
        {
            name: "Off The Wall",
            description: "You can Wall Leap further.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Ready To Roll"],
            image: offTheWall
        }
    ],
    [
        {
            name: "Heroic Leap",
            description: "You can Sprint Dodge Roll Further.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Vaults on Vaults on Vaults"],
            image: heroicLeap
        },
        {
            name: "Vigorous Vaulter",
            description: "Vaulting is no longer slowed down while exhausted.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["Vaults on Vaults on Vaults","Vault Spring"],
            image: vigorousVaulter
        },
        {
            name: "Ready To Roll",
            description: "When falling, your timing window to perform a Recovery Roll is increased.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Vault Spring"],
            image: readyToRoll
        }
    ],
    [
        {
            name: "Vaults on Vaults on Vaults",
            description: "Vaulting no longer costs stamina.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: vaultsOnVaultsOnVaults
        },
        {
            name: "Vault Spring",
            description: "Lets you jump at the end of a vault.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: vaultSpring
        }
    ]
]


export default mobility;