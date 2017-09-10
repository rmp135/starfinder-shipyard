export default [
  {
    name: 'Arcane Laboratory',
    details: 'Contains all tools necessary to craft magical items. Reduces crafting time by half.',
    cost: 1,
    pcu: 1,
    size: 1
  },
  {
    name: 'Cargo Hold',
    details: 'Contains up to 25 bulk. 4 contiguous holds can store Huge items, 8 can store gargantuan objects.',
    cost: 0,
    pcu: 0,
    size: 1
  },
  {
    name: 'Escape Pods',
    details: 'Contains 6 escape pods. Fits medium or smaller creatures for crash landing and survival for up to 7 days.',
    cost: 1,
    pcu: 2,
    size: 1
  },
  {
    name: 'Guest Quarters',
    details: 'Contains simple quarters for passengers.',
    cost: 1,
    pcu: 1,
    size: 1
  },
  {
    name: 'Hangar Bay',
    details: 'Provides a place for up to 8 Tiny starships to dock.',
    size: 4,
    sizes: ['gargantuan'],
    cost: 10,
    pcu: 30
  },
  {
    name: 'Life Boats',
    details: 'Provides 2 crafts that each hold one Large or two Medium or smaller creatures. Enough supplies for 15 days (30 for one Medium or smaller creature). Provides basic navigation and propulsion.',
    cost: 3,
    pcu: 5,
    size: 1
  },
  {
    name: 'Medical Bay',
    details: 'Functions as a medical lab.',
    cost: 8,
    pcu: 4,
    size: 1
  },
  {
    name: 'Passengar Seating',
    details: 'Provides 16 seats for Medium creatures.',
    cost: 0,
    pcu: 0,
    size: 1
  },
  {
    name: 'Power Core Housing',
    details: 'Provides an additional power core slot.',
    sizes: ['medium', 'large', 'huge', 'gargantuan'],
    cost: 10,
    pcu: 0,
    size: 1
  },
  {
    name: 'Science Lab',
    details: 'A general lab provides +1 Life Science and Physical Science. A specific Life Science or Physical Science lab provides +2 to the appropriate skill.',
    cost: 1,
    pcu: 2,
    size: 1
  },
  {
    name: 'Sealed Environment Chamber',
    details: 'Provides housing for an exotic, non-oxygen breathing creature.',
    cost: 1,
    pcu: 2,
    size: 1
  },
  {
    name: 'Shuttle Bay',
    details: 'Provides a place for a Small or smaller starship to dock.',
    size: 2,
    sizes: ['huge', 'gargantuan'],
    cost: 4,
    pcu: 10
  },
  {
    name: 'Smuggler Compartment',
    details: 'Provides a place to hide 10 tons of goods, no larger than a Medium creature. Requires DC 20 Perception or Computers to detect. DC increases 5, and power by 1 for each build point spent over base cost.',
    cost: 2,
    pcu: 4,
    size: 1
  },
  {
    name: 'Synthesis Bay',
    details: 'Provides tools necessary to craft drugs, medicine or poison. Reduces crafting time by half.',
    cost: 2,
    pcu: 1,
    size: 1
  },
  {
    name: 'Tech Workshop',
    details: 'Provides tools necessary to craft technilogical items. Reduces crafting time by half.',
    cost: 1,
    pcu: 3,
    size: 1
  }
]