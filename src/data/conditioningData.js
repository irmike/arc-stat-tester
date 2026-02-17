import circleNode from '../assets/images/circle50x50.png'

const conditioning = [
    // subsection
    [
        // node
        {
            name: "Used To The Weight",
            description: "Wearing a shield doesn't slow you down as much.",
            pointCap: 5,
            pointLock: 0,
            opens: ["Blast-Born", "Gentle Pressure"],
            image: circleNode
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
            image: circleNode
        },
        // node
        {
            name: "Gentle Pressure",
            description: "You make less noise when breaching.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        }
    ],
    [
        {
            name: "Fight Or Flight",
            description: "When you're hurt in combat, regain a fixed amount of stamina. Has cooldown between uses.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Proficient Pryer",
            description: "Breaching doors and containers takes less time",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        }
    ],
    [
        {
            name: "Survivor's Stamina",
            description: "When you're critically hurt, your stamina regenerates faster.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Unburdened Roll",
            description: "If your shield breaks, your first Dodge Roll within a few seconds does not cost stamina.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        }
    ],
    [
        {
            name: "Downed But Determined",
            description: "When you're downed, it takes longer before you collapse.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "A Little Extra",
            description: "Breaching an object generates resources.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Effortless Swing",
            description: "Melee abilities cost less stamina.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        }
    ],
    [
        {
            name: "Turtle Crawl",
            description: "While downed, you take less damage.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Loaded Arms",
            description: "Your equipped weapon has less impact on your encumbrance.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Sky-Clearing Swing",
            description: "You deal more melee damage to drones.",
            pointCap: 5,
            pointLock: 0,
            image: circleNode
        }
    ],
    [
        {
            name: "Back On Your Feet",
            description: "When you're critically hurt, your health regenerates until a certain limit.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        },
        {
            name: "Flyswatter",
            description: "Wasps and Turrets can now be destroyed with a single melee attack.",
            pointCap: 1,
            pointLock: 0,
            image: circleNode
        }
    ]
]


export default conditioning;