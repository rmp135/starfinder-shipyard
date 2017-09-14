import Vue from 'vue'

export const state = () => ({
  ship: {
    tier: 0.25,
    frame: null,
    cores: [],
    thruster: null,
    armor: null,
    computer: null,
    defenses: null,
    crewQuarters: null,
    bays: [],
    drift: null,
    shields: null,
    security: [
      {
        enabled: false,
        name: 'Anti-hacking systems'
      },
      {
        enabled: false,
        upgraded: false,
        onlyShowAdderWhenUpgraded: true,
        name: 'Antipersonnel weapon (longarm)',
        upgradedName: 'Antipersonnel weapon (heavy)',
        adder: 0
      },
      {
        enabled: false,
        name: 'Biometric locks',
      },
      {
        enabled: false,
        name: 'Computer countermeasures',
      },
      {
        enabled: false,
        name: 'Self-destruct system',
      }
    ]
  }
})

export const getters = {
  securityCost (state, getters) {
    return (item) => {
      switch (item.name) {
        case 'Anti-hacking systems':
          return 3          
        case 'Antipersonnel weapon (longarm)':
          let total = 0
          total += item.upgraded ? 5 : 0
          total += item.adder
          return total
        case 'Biometric locks':
          return 5
        case 'Computer countermeasures':
          return  Math.floor(state.ship.tier)
        case 'Self-destruct system':
          return 5 * getters.sizeAsNumber(state.ship.frame)
      }
    }
  },
  sizeAsNumber () {
    return (frame) => {
      switch (frame.size) {
        case 'tiny': return 1
        case 'small': return 2
        case 'medium': return 3
        case 'large': return 4
        case 'huge': return 5
        case 'gargantuan': return 6
      }
    }
  },
  armorCost (_, getters) {
    return (frame, armor) => {
      return armor.costMultiplier * getters.sizeAsNumber(frame)
    }
  },
  maxPCU (state) {
    if (state.ship.cores === null) return 0
    return state.ship.cores.map(c => c === null ? 0 : c.pcu).reduce(((c1, c2) => c1 + c2), 0)
  },
  hasCores (state) {
    return state.ship.cores.filter(c => c !== null).length > 0
  },
}

export const mutations = {
  SET_FRAME (state, frame) {
    state.ship.frame = frame
    state.ship.thruster = null
    state.ship.cores = []
    state.ship.cores.push(null)
    state.ship.bays = []
    if (frame !== null) {
      for (var i = 0; i < frame.expansionBays; i++) {
        state.ship.bays.push(null)
      }
    }
  },
  SET_THRUSTER (state, thruster) {
    state.ship.thruster = thruster
  },
  SET_CORE (state, { core, index }) {
    Vue.set(state.ship.cores, index, core)
  },
  REMOVE_CORE (state, index) {
    state.ship.cores.splice(index, 1)
  },
  ADD_CORE (state) {
    state.ship.cores.push(null)
  },
  SET_ARMOR (state, armor) {
    state.ship.armor = armor
  },
  SET_TIER (state, tier) {
    state.ship.computer = null
    state.ship.tier = tier
  },
  SET_COMPUTER (state, computer) {
    state.ship.computer = computer
  },
  SET_CREW (state, crewQuarters) {
    state.ship.crewQuarters = crewQuarters
  },
  SET_DEFENSES (state, defenses) {
    state.ship.defenses = defenses
  },
  SET_BAY (state, { bay, index }) {
    Vue.set(state.ship.bays, index, bay)
  },
  SET_DRIFT (state, drift) {
    state.ship.drift = drift
  },
  UPDATE_SECURITY (state, { item, newItem }) {
    Object.assign(item, newItem)
  },

  SET_SHIELDS (state, shields) {
    state.ship.shields = shields
  }
}
  
export const actions = {
  clearBay ({ state, commit }, index) {
    if (state.ship.bays[index].name === "Power Core Housing") {
      commit('REMOVE_CORE', index)
    }
    commit('SET_BAY', { bay: null, index })
  },
  setBay ({ state, commit }, { bay, index }) {
    if (bay.name === "Power Core Housing") {
      commit('ADD_CORE')
    }
    commit('SET_BAY', { bay, index })
  },
  setCore ({ state, commit, getters }, { core, index }) {
    commit('SET_CORE', { core, index })
    if (!getters.hasCores) {
      state.ship.security.forEach(s => commit('UPDATE_SECURITY', { item: s, newItem: { enabled: false }}))
    }
  }
}