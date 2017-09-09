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
  }
  .dialog {
    background-color: red;
    position: absolute;
    width: 50%;
    height: 300px;
  }
</style>
<template lang="pug">
  .picker.modal.is-active
    .modal-background
    .modal-content
      .modal-card
        header.modal-card-head
          p.modal-card-title Hello
        section.modal-card-body
          .columns
            .column.is-one-quarter
              div(v-for="item in list")
                .item(:class="{inValid: !isValid(item), 'has-text-primary': selectedItem === item}" @click="selectedItem = item")
                  slot(name="title" :item="item")
            .column
              div(v-if="selectedItem !== null")
                slot(name="details" :item="selectedItem")
        footer.modal-card-foot
          button.button.is-success(@click="onDone" :disabled="!canContinue") Done
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
        return this.selectedItem !== null && this.isValid(this.selectedItem)
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
