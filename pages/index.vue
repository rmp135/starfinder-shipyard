<style lang="scss">
</style>
<template lang="pug">
  div
    component(:show="pickerComp !== null" :is="pickerComp")
    label Pilot
    input(type="number"  v-model.number="initialPilotSkill")
    select(v-model="frameSelect")
      option(v-for="availableFrame in frames" :value="availableFrame.name") {{availableFrame.name}}
    div(v-if="ship.frame !== null")
      div HP: {{ship.frame.hp.max}}
      div Maneuverability: {{ship.frame.maneuverability.name}} (turn {{maneuverabilityDetails.turn}})
      div Piloting Check: {{pilotCheck}}
      .section
        h2.title Cores
        div Available PCU: {{availablePCU}}
        stat-block(v-for="(core, index) in ship.cores" :type="'core'" :item="core" :onPick="onPick.bind(this, 'power', index)")
          template(slot="title" scope="props") {{props.item.name}}
          template(slot="details" scope="props")
            div PCU: {{props.item.pcu}}
            div Cost: {{props.item.cost}}
      .section
        h2.title Thrusters
        stat-block(:item="ship.thruster" :type="'thruster'" :onPick="onPick.bind(this, 'thruster')")
          template(slot="title" scope="props") {{props.item.name}}
          template(slot="details" scope="props")
            div Name: {{props.item.name}}
            div Speed: {{props.item.speed}}
            div PCU: {{props.item.pcu}}
            div Cost: {{props.item.cost}}
</template>
<script>
  import PowerPicker from '~/components/power-picker'
  import ThrusterPicker from '~/components/thruster-picker'
  import PickerComp from '~/components/picker-component'
  import StatBlock from '~/components/stat-block'
  import frames from '~/data/frames'
  import Vue from 'vue'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data: () => ({
      frames,
      initialPilotSkill: 0,
    }),
    computed: {
      ...mapState(['ship']),
      ...mapState('pickerModule', ['picker', 'pickerIndex']),
      frameSelect: {
        get () {
          return this.ship.frame === null ? null : this.ship.frame.name
        },
        set (value) {
          this.setFrame(this.frames.find(f => f.name === value))
        }
      },
      availablePCU () {
        let total = this.ship.cores.map(c => c === null ? 0 : c.pcu).reduce(((c1, c2) => c1 + c2), 0)
        if (this.ship.thruster !== null) {
          total -= this.ship.thruster.pcu
        }
        return total
      },
      pickerComp () {
        if (this.picker === null) return null
        return  `${this.picker}-picker`
      },
      maneuverabilityDetails () {
        if (this.ship.frame === null) return null
        switch (this.ship.frame.maneuverability) {
          case "clumsy":
            return { piloting: -2, turn: 4 }
            break
          case "poor":
            return { piloting: -1, turn: 3 }
            break
          case "average":
            return { piloting: 0, turn: 2 }
            break
          case "good":
            return { piloting: 1, turn: 1 }
            break
          case "perfect":
            return { piloting: 2, turn: 0 }
            break
        }
      },
      pilotCheck () {
        let check = this.initialPilotSkill
        let speed = 0
        if (this.maneuverabilityDetails !== null) {
           check += this.maneuverabilityDetails.piloting
        }
        if (this.ship.thruster !== null) {
          if (this.ship.thruster.speed < 5) speed = 2
          if (this.ship.thruster.speed === 6) speed = 1
          if (this.ship.thruster.speed === 12) speed = -1
          if (this.ship.thruster.speed > 13) speed = -2
        }
        return check + speed
      }
    },
    methods: {
      ...mapMutations({
        'setFrame': 'SET_FRAME',
        'setPicker': 'pickerModule/SET_PICKER',
        'setPickerIndex': 'pickerModule/SET_PICKER_INDEX'
      }),
      onPick (picker, index) {
        this.setPicker(picker)
        this.setPickerIndex(index)
      }
    },
    components: {
      PickerComp,
      PowerPicker,
      ThrusterPicker,
      StatBlock
    }
  }
</script>
