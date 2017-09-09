<template lang="pug">
  picker-component(:list="crew" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Cost: {{props.item.cost}}
</template>
<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      crew: [
        {
          name: 'common',
          cost: 0
        },
        {
          name: 'good',
          cost: 2
        },
        {
          name: 'luxurious',
          cost: 5
        }
      ]
    }),
    computed: {
      ...mapState(['ship'])
    },
    methods: {
      ...mapMutations({
        'setCrew': 'SET_CREW',
      }),
      isValid (crew) {
        return true
      },
      onDoneClick (armor) {
        this.setCrew(JSON.parse(JSON.stringify(armor)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
