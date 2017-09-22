<template lang="pug">
  picker-component(:list="sensors" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
      div Range: {{props.item.range}}
      div Perception Modifier: {{props.item.modifier}}
      div Cost: {{props.item.cost}}
</template>
<script>
  import sensors from '~/data/sensors'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      sensors,
    }),
    computed: {
      ...mapState(['ship'])
    },
    methods: {
      ...mapMutations({
        'setSensor': 'SET_SENSOR',
      }),
      isValid (sensor) {
        return true
      },
      onDoneClick (sensor) {
        this.setSensor(JSON.parse(JSON.stringify(sensor)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
