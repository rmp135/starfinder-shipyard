<style lang="scss">
  .background {
    width: 100%;
    height: 100%;
    background-color: grey;
    position: absolute;
  }
  .item {
    cursor: pointer;
    &.inValid {
      color: grey;
    }
    &.selected {
      background-color: green;
    }
  }
  .dialog {
    background-color: red;
    position: absolute;
    width: 50%;
    height: 300px;
  }
</style>
<template lang="pug">
  .picker
    div(v-for="item in list")
      .item(:class="{inValid: !isValid(item), selected: selectedItem === item}" @click="selectedItem = item")
        slot(name="title" :item="item")
    div(v-if="selectedItem !== null")
      slot(name="details" :item="selectedItem")
    button(@click="onDone" :disabled="!canContinue") Done
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    props: ["list", "isValid"],
    data: () => ({
      selectedItem: null
    }),
    computed: {
      canContinue () {
        this.selectedItem !== null && this.isValid(this.selectedItem)
      }
    },
    methods: {
      ...mapMutations({
        'clearPicker': 'pickerModule/CLEAR_PICKER'
      }),
      onDone () {
        this.$emit("change", { target: { value: this.selectedItem }})
        this.clearPicker()
      }
    }
  }
</script>
