<template lang="pug">
  picker-component(:list="computers" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Bonus to Combat Check: {{props.item.bonus}}
      div Nodes: {{props.item.nodes}}
      div PCU: {{props.item.pcu}}
      div Cost: {{props.item.cost}}
</template>
<script>
  import computers from '~/data/computers'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      computers,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapGetters(['armorCost'])
    },
    methods: {
      ...mapMutations({
        'setComputer': 'SET_COMPUTER',
      }),
      isValid (computer) {
        return computer.bonus === Math.max(this.ship.tier, 1) || computer.bonus === 0
      },
      onDoneClick (computer) {
        this.setComputer(JSON.parse(JSON.stringify(computer)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
