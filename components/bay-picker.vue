<template lang="pug">
  picker-component(:list="bays" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2.title {{props.item.name}}
      div {{props.item.details}}
      div Cost: {{props.item.cost}}
      div PCU: {{props.item.pcu}}
</template>
<script>
  import bays from '~/data/bays'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      bays,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapState('pickerModule', ['pickerIndex']),
      ...mapGetters(['armorCost'])
    },
    methods: {
      ...mapActions(['setBay']),
      isValid (bay) {
        let free = this.ship.frame.expansionBays - (this.ship.bays.filter(b => b !== null).length - 1)
        return bay.size <= free
          && (bay.sizes === undefined || bay.sizes.includes(this.ship.frame.size))
      },
      onDoneClick (bay) {
        this.setBay(JSON.parse(JSON.stringify({ bay, index: this.pickerIndex })))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
