import Vue from 'vue'

export const state = () => ({
  ship: {
    frame: null,
    cores: null,
    thruster: null,
  }
})

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
}