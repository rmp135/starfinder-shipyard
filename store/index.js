import Vue from 'vue'

export const state = () => ({
  ship: {
    frame: null,
    cores: null,
    thruster: null,
    armor: null
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
      return armor.cost * costModifier
    }
  }
}

export const mutations = {
  SET_FRAME (state, frame) {
    state.ship.frame = frame
    state.ship.thruster = null
    state.ship.cores = []
    for (var i = 0; i < 1; i++) {
      state.ship.cores.push(null)
    }
  },
  SET_THRUSTER (state, thruster) {
    state.ship.thruster = thruster
  },
  SET_CORE (state, { core, index }) {
    Vue.set(state.ship.cores, index, core)
  },
  SET_ARMOR(state, armor) {
    state.ship.armor = armor
  }
}