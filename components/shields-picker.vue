<template lang="pug">
  picker-component(:list="shields" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Cost: {{props.item.cost}}
      div PCU: {{props.item.pcu}}
      div Shield Points: {{props.item.points}}
      div Regen: {{props.item.regen}}/min
</template>
<script>
  import shields from '~/data/shields'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      shields,
    }),
    computed: {
      ...mapState(['ship'])
    },
    methods: {
      ...mapMutations({
        'setShields': 'SET_SHIELDS',
      }),
      isValid (shield) {
        return true
      },
      onDoneClick (shield) {
        this.setShields(JSON.parse(JSON.stringify(shield)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
