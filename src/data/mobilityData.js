import circleNode from '../assets/images/circle50x50.png'

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
            image: circleNode
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
            image: circleNode
        },
        // node
        {
            name: "Slip and Slide",
            description: "You can slide further and faster.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Sturdy Ankles"],
            image: circleNode
        }
    ],
    [
        {
            name: "Youthful Lungs",
            description: "Increase your max stamina",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Carry The Momentum"],
            image: circleNode
        },
        {
            name: "Sturdy Ankles",
            description: "You take less fall damage when falling from a non-lethal height.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Calming Stroll"],
            image: circleNode
        }
    ],
    [
        {
            name: "Carry The Momentum",
            description: "After a Sprint Dodge Roll, sprinting does not consume stamina for a short time. Has a cooldown between uses.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Effortless Roll", "Crawl Before You Walk"],
            image: circleNode
        },
        {
            name: "Calming Stroll",
            description: "While walking, your stamina regenerates as if you were standing still.",
            pointCap: 1,
            pointLock: 15,
            unlocks: ["Crawl Before You Walk", "Off The Wall"],
            image: circleNode
        }
    ],
    [
        {
            name: "Effortless Roll",
            description: "Dodge Rolls cost less stamina.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Heroic Leap"],
            image: circleNode
        },
        {
            name: "Crawl Before You Walk",
            description: "When you're downed, you crawl faster.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["vigorous Vaulter"],
            image: circleNode
        },
        {
            name: "Off The Wall",
            description: "You can Wall Leap further.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Ready To Roll"],
            image: circleNode
        }
    ],
    [
        {
            name: "Heroic Leap",
            description: "You can Sprint Dodge Roll Further.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Vaults on Vaults on Vaults"],
            image: circleNode
        },
        {
            name: "Vigorous Vaulter",
            description: "Vaulting is no longer slowed down while exhausted.",
            pointCap: 1,
            pointLock: 0,
            unlocks: ["Vaults on Vaults on Vaults","Vault Spring"],
            image: circleNode
        },
        {
            name: "Ready To Roll",
            description: "When falling, your timing window to perform a Recovery Roll is increased.",
            pointCap: 5,
            pointLock: 0,
            unlocks: ["Vault Spring"],
            image: circleNode
        }
    ],
    [
        {
            name: "Vaults on Vaults on Vaults",
            description: "Vaulting no longer costs stamina.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: circleNode
        },
        {
            name: "Vault Spring",
            description: "Lets you jump at the end of a vault.",
            pointCap: 1,
            pointLock: 36,
            unlocks: [],
            image: circleNode
        }
    ]
]


export default mobility;