<template lang="pug">
  picker-component(:list="defenses" :isValid="isValid" @change="onDoneClick($event.target.value)")
    template(slot="title" scope="props") {{props.item.name}}
    template(slot="details" scope="props")
      h2 {{props.item.name}}
        div Cost: {{props.item.cost}}
        div PCU: {{props.item.pcu}}
        div TL Bonus: {{props.item.tl}}
</template>
<script>
  import defenses from '~/data/defenses'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PickerComponent from '~/components/picker-component'
  export default {
    data: () => ({
      defenses,
    }),
    computed: {
      ...mapState(['ship'])
    },
    methods: {
      ...mapMutations({
        'setDefenses': 'SET_DEFENSES',
      }),
      isValid (defense) {
        return true
      },
      onDoneClick (defense) {
        this.setDefenses(JSON.parse(JSON.stringify(defense)))
      }
    },
    components: {
      PickerComponent
    }
  }
</script>
