<template lang="pug">
  picker-component(:list="frames" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2.title {{props.item.name}}
      div Cost: {{props.item.cost}}
      div Size: {{props.item.size}}
      div Maneuverability: {{props.item.maneuverability}}
      div Max HP: {{props.item.hp.max}}
      div HP Increment: {{props.item.hp.increment}}
      div Damage Threshold: {{props.item.damageThreshold}}
      div Expansion Bays: {{props.item.expansionBays}}
</template>
<script>
  import frames from '~/data/frames'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      frames,
    }),
    computed: {
      ...mapState(['ship'])
    },
    methods: {
      ...mapMutations({
        'setFrame': 'SET_FRAME',
      }),
      isValid (frame) {
        return true
      },
      onDoneClick (frame) {
        this.setFrame(JSON.parse(JSON.stringify(frame)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
