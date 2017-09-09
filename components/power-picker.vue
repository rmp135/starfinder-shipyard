<template lang="pug">
  picker-component(:list="cores" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div PCU: {{props.item.pcu}}
      div Cost: {{props.item.cost}}
</template>
<script>
  import cores from '~/data/power-cores'
  import { mapMutations, mapState } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      cores,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapState('pickerModule', ['pickerIndex'])
    },
    methods: {
      ...mapMutations({
        'setCore': 'SET_CORE',
        'clearPicker': 'pickerModule/CLEAR_PICKER'
      }),
      isValid (core) {
        return core.sizes.includes(this.ship.frame.size)
      },
      onDoneClick (core) {
        this.setCore(JSON.parse(JSON.stringify({ index: this.pickerIndex, core })))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>

