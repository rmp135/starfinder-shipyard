<template lang="pug">
  picker-component(:list="armors" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Bonus to AC: {{props.item.ac}}
      div Target Lock: {{props.item.targetLock}}
      div Turn Distance: {{props.item.turnDistance}}
      div Cost: {{armorCost(ship.frame, props.item)}}
</template>
<script>
  import armors from '~/data/armors'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      armors,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapGetters(['armorCost'])
    },
    methods: {
      ...mapMutations({
        'setArmor': 'SET_ARMOR',
      }),
      isValid (armor) {
        return true
      },
      onDoneClick (armor) {
        this.setArmor(JSON.parse(JSON.stringify(armor)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
