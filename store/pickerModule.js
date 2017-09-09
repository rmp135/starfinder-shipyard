export const state = () => ({
  picker: null,
  pickerIndex: null
})

export const mutations = {
  SET_PICKER (state, value) {
    state.picker = value
  },
  SET_PICKER_INDEX (state, index) {
    state.pickerIndex = index
  },
  CLEAR_PICKER (state) {
    state.picker = null
    state.pickerIndex = null
  }
}
