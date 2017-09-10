<template lang="pug">
  picker-component(:list="thrusters" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Speed: {{props.item.speed}}
      div PCU: {{props.item.pcu}}
      div Cost: {{props.item.cost}}
</template>
<script>
  import thrusters from '~/data/thrusters'
  import { mapMutations, mapState } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      thrusters,
    }),
    computed: {
      ...mapState(['ship']),
    },
    methods: {
      ...mapMutations({
        'setThruster': 'SET_THRUSTER',
      }),
      isValid (thruster) {
        return this.ship.frame.size === thruster.size
      },
      onDoneClick (thruster) {
        this.setThruster(JSON.parse(JSON.stringify(thruster)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
