export default [
  {
    name: "Racer",
    size: "tiny",
    maneuverability: "perfect",
    hp: {
      max: 20,
      increment: 5
    },
    damageThreshold: 0,
    mounts: {
      forward: [
        {
          count: 1,
          type: "light"
        }
      ],
      aft: [
        {
          count: 1,
          type: "light"
        }
      ],
      port: [
        {
          count: 0
        }
      ],
      turrent: [],
      starboard: []
    },
    expansionBays: 0,
    crew: {
      minimum: 1,
      maximum: 1
    },
    cost: 4
  },
  {
    name: "Interceptor",
    size: "tiny",
    maneuverability: "perfect",
    hp: {
      max: 30,
      increment: 5
    },
    damageThreshold: 0,
    mounts: {
      forward: [
        {
          count: 2,
          type: "light"
        }
      ],
      aft: [],
      port: [],
      turrent: [],
      starboard: []
    },
    expansionBays: 0,
    crew: {
      minimum: 1,
      maximum: 1
    },
    cost: 6
  },
  {
    name: "Fighter",
    size: "tiny",
    maneuverability: "good",
    hp: {
      max: 35,
      increment: 5
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 2,
          type: "light"
        }
      ],
      aft: [],
      port: [],
      turrent: [],
      starboard: []
    },
    expansionBays: 0,
    crew: {
      minimum: 1,
      maximum: 1
    },
    cost: 6
  },
  {
    name: "Shuttle",
    size: "small",
    maneuverability: "perfect",
    hp: {
      max: 35,
      increment: 5
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        }
      ],
      aft: [],
      port: [],
      turrent: [],
      starboard: []
    },
    expansionBays: 3,
    crew: {
      minimum: 1,
      maximum: 4
    },
    cost: 6
  },
  {
    name: "Light Freighter",
    size: "small",
    maneuverability: "good",
    hp: {
      max: 40,
      increment: 10
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        }
      ],
      aft: [],
      port: [
        {
          count: 1,
          type: "light"
        }
      ],
      turrent: [],
      starboard: [
        {
          count: 1,
          type: "light"
        }
      ]
    },
    expansionBays: 3,
    crew: {
      minimum: 1,
      maximum: 6
    },
    cost: 10
  },
  {
    name: "Explorer",
    size: "medium",
    maneuverability: "good",
    hp: {
      max: 55,
      increment: 10
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        }
      ],
      aft: [],
      port: [
        {
          count: 1,
          type: "light"
        }
      ],
      turrent: [],
      starboard: [
        {
          count: 1,
          type: "light"
        }
      ]
    },
    expansionBays: 4,
    crew: {
      minimum: 1,
      maximum: 6
    },
    cost: 12
  },
  {
    name: "Transport",
    size: "medium",
    maneuverability: "average",
    hp: {
      max: 70,
      increment: 15
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        },
        {
          count: 1,
          type: "heavy"
        }
      ],
      aft: [],
      port: [],
      turrent: [
        {
          count: 2,
          type: "light"
        }
      ],
      starboard: []
    },
    expansionBays: 5,
    crew: {
      minimum: 1,
      maximum: 6
    },
    cost: 15
  },
  {
    name: "Destroyer",
    size: "large",
    maneuverability: "average",
    hp: {
      max: 150,
      increment: 20
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        },
        {
          count: 1,
          type: "heavy"
        }
      ],
      aft: [
        {
          count: 1,
          type: "light"
        }
      ],
      port: [
        {
          count: 1,
          type: "light"
        }
      ],
      turrent: [
        {
          count: 2,
          type: "light"
        }
      ],
      starboard: [
        {
          count: 1,
          type: "light"
        }
      ]
    },
    expansionBays: 4,
    crew: {
      minimum: 6,
      maximum: 20
    },
    cost: 30
  },
  {
    name: "Heavy Freighter",
    size: "large",
    maneuverability: "average",
    hp: {
      max: 120,
      increment: 20
    },
    damageThreshold: 0,
    mounts: {
      forward: 
      [
        {
          count: 1,
          type: "light"
        },
        {
          count: 1,
          type: "heavy"
        }
      ],
      aft: [],
      port: [
        {
          count: 1,
          type: "heavy"
        }
      ],
      turrent: [],
      starboard: [
        {
          count: 1,
          type: "heavy"
        }
      ]
    },
    expansionBays: 8,
    crew: {
      minimum: 6,
      maximum: 20
    },
    cost: 40
  },
  {
    name: "Bulk Freighter",
    size: "huge",
    maneuverability: "poor",
    hp: {
      max: 160,
      increment: 20
    },
    damageThreshold: 5,
    mounts: {
      forward: [
        {
          count: 1,
          type: "heavy"
        }
      ],
      aft: [
        {
          count: 1,
          type: "heavy"
        }
      ],
      port: [],
      turrent: [
        {
          count: 2,
          type: "light"
        }
      ],
      starboard: []
    },
    expansionBays: 10,
    crew: {
      minimum: 20,
      maximum: 50
    },
    cost: 55
  },
  {
    name: "Cruiser",
    size: "huge",
    maneuverability: "average",
    hp: {
      max: 180,
      increment: 25
    },
    damageThreshold: 5,
    mounts: {
      forward: [
        {
          count: 1,
          type: "capital"
        }
      ],
      aft: [],
      port: [
        {
          count: 1,
          type: "light"
        }
      ],
      turrent: [
        {
          count: 1,
          type: "heavy"
        }
      ],
      starboard: [
        {
          count: 1,
          type: "light"
        }
      ]
    },
    expansionBays: 6,
    crew: {
      minimum: 20,
      maximum: 100
    },
    cost: 60
  },
  {
    name: "Carrier",
    size: "gargantuan",
    maneuverability: "poor",
    hp: {
      max: 240,
      increment: 30
    },
    damageThreshold: 10,
    mounts: {
      forward: [
        {
          count: 1,
          type: "capital"
        }
      ],
      aft: [],
      port: [
        {
          count: 3,
          type: "heavy"
        }
      ],
      turrent: [
        {
          count: 2,
          type: "light"
        }
      ],
      starboard: [
        {
          count: 3,
          type: "heavy"
        }
      ]
    },
    expansionBays: 10,
    crew: {
      minimum: 75,
      maximum: 200
    },
    cost: 120
  },
  {
    name: "Battleship",
    size: "gargantuan",
    maneuverability: "average",
    hp: {
      max: 280,
      increment: 40
    },
    damageThreshold: 10,
    mounts: {
      forward: [
        {
          count: 1,
          type: "capital"
        },
        {
          count: 2,
          type: "heavy"
        }
      ],
      aft: [
        {
          count: 1,
          type: "light"
        }
      ],
      port: [
        {
          count: 2,
          type: "heavy"
        },
        {
          count: 1,
          type: "light"
        }
      ],
      turrent: [
        {
          count: 2,
          type: "heavy"
        }
      ],
      starboard: [
        {
          count: 2,
          type: "heavy"
        },
        {
          count: 1,
          type: "light"
        }
      ]
    },
    expansionBays: 8,
    crew: {
      minimum: 100,
      maximum: 300
    },
    cost: 150
  },
  {
    name: "Dreadnought",
    size: "colossal",
    maneuverability: "clumsy",
    hp: {
      max: 400,
      increment: 50
    },
    damageThreshold: 15,
    mounts: {
      forward: [
        {
          count: 2,
          type: "capital"
        },
        {
          count: 2,
          type: "heavy"
        }
      ],
      aft: [],
      port: [
        {
          count: 1,
          type: "capital"
        },
        {
          count: 3,
          type: "heavy"
        }
      ],
      turrent: [
        {
          count: 3,
          type: "light"
        }
      ],
      starboard: [
        {
          count: 1,
          type: "capital"
        },
        {
          count: 3,
          type: "heavy"
        }
      ]
    },
    expansionBays: 20,
    crew: {
      minimum: 125,
      maximum: 500
    },
    cost: 200
  }
]