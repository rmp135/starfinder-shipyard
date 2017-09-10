<template lang="pug">
  picker-component(:list="drift" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Engine Rating: {{props.item.rating}}
      div Min PCU: {{props.item.minPCU}}
      div Max Size: {{maxSize(props.item)}}
      div Cost: {{armorCost(ship.frame, props.item)}}
</template>
<script>
  import drift from '~/data/drift'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      drift,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapGetters(['armorCost', 'maxPCU'])
    },
    methods: {
      ...mapMutations({
        'setDrift': 'SET_DRIFT',
      }),
      maxSize (drift) {
        if (drift.sizes === undefined) return '-'
        return drift.sizes[drift.sizes.length - 1]
      },
      isValid (drift) {
        return  drift.minPCU <= this.maxPCU
      },
      onDoneClick (drift) {
        this.setDrift(JSON.parse(JSON.stringify(drift)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
