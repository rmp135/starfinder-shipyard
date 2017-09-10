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
    drift: null
  }
})

export const getters = {
  armorCost () {
    return (frame, armor) => {
      const costModifier = (() => {
        switch (frame.size) {
          case 'tiny': return 1
          case 'small': return 2
          case 'medium': return 3
          case 'large': return 4
          case 'huge': return 5
          case 'gargantuan': return 6
        }})()
      return armor.costMultiplier * costModifier
    }
  },
  maxPCU (state) {
    if (state.ship.cores === null) return 0
    return state.ship.cores.map(c => c === null ? 0 : c.pcu).reduce(((c1, c2) => c1 + c2), 0)
  }
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
  }
}