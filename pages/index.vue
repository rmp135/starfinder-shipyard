<style lang="scss">
</style>
<template lang="pug">
  .container
    component(:show="pickerComp !== null" :is="pickerComp")
    template(v-if="ship.frame !== null")
      .section
        label.label Piloting Skills
        input.input(type="number"  v-model.number="initialPilotSkill")
        label.label Tier
        select.input(v-model.number="chosenTier")
          option(v-for="tier in tiers") {{tier}}
      .columns.section
        .column
          .card
            .card-header
              .card-header-title Key Totals
            .card-content
              div HP: {{maxHP}}
              div Maneuverability: {{ship.frame.maneuverability}} (turn {{turnDistanceTotal}})
              div Piloting Check Bonus: {{pilotCheckTotal}}
              div Target Lock: {{targetLockTotal}}
              div Total AC: {{totalAC}}
              div Available Build Points: {{availableBuildPoints}} / {{maxBuildPoints}}
              div Available PCU: {{availablePCU}} / {{maxPCU}}
        .column
          .card
            .card-header
              p.card-header-title Skill Checks
            .card-content
              div Back Off: DC{{stuntChecks.easy}}
              div Barrel Roll: DC{{stuntChecks.easy}}
              div Evade: DC{{stuntChecks.easy}}
              div Flip and Burn: DC{{stuntChecks.medium}}
              div Flyby: DC{{stuntChecks.hard}}
              div Slide: DC{{stuntChecks.easy}}
        
    .section
      h2.title Frame
      stat-block(:item="ship.frame" :type="'frame'" @pick="onPick('frame')" @clear="setFrame(null)")
        template(slot="title" scope="props") {{props.item.name}}
        template(slot="details" scope="props")
          div Size: {{props.item.size}}
          div Maneuverability: {{props.item.maneuverability}}
          div Max HP: {{props.item.hp.max}}
          div HP Increment: {{props.item.hp.increment}}
          div Cost: {{props.item.cost}}
    template(v-if="ship.frame !== null")
      .section
        h2.title Cores
        .columns
          .column(v-for="(core, index) in ship.cores")
            stat-block(:type="'core'" :item="core" @pick="onPick('power', index)" @clear="setCore({ core: null, index })")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div PCU: {{props.item.pcu}}
                div Cost: {{props.item.cost}}
      .section
        h2.title Thrusters
        stat-block(:item="ship.thruster" :type="'thruster'" @pick="onPick('thruster')" @clear="setThruster(null)")
          template(slot="title" scope="props") {{props.item.name}}
          template(slot="details" scope="props")
            div Speed: {{props.item.speed}}
            div PCU: {{props.item.pcu}}
            div Cost: {{props.item.cost}}
      .section
        h2.title Security
        .columns
          template(v-if="hasCores")
            .column(v-for="(item, index) in ship.security")
              security-block(:item="item")
          .column(v-else)
              .card
                .card-content 
                  .content You must have a core to equip security modules.
      .section
        .columns
          .column
            h2.title Armor
            stat-block(:item="ship.armor" :type="'armor'" @pick="onPick('armor')" @clear="setArmor(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Bonus to AC: {{props.item.ac}}
                div Target Lock: {{props.item.targetLock}}
                div Turn Distance: {{props.item.turnDistance}}
                div Cost: {{armorCost(ship.frame, props.item)}}
          .column
            h2.title Computer
            stat-block(:item="ship.computer" :type="'computer'" @pick="onPick('computer')" @clear="setComputer(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Bonus to Combat Check: {{props.item.bonus}}
                div Nodes: {{props.item.nodes}}
                div PCU: {{props.item.pcu}}
                div Cost: {{props.item.cost}}
          .column
            h2.title Defenses
            stat-block(:item="ship.defenses" :type="'defensive countermeasures'" @pick="onPick('defenses')" @clear="setDefenses(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Cost: {{props.item.cost}}
                div PCU: {{props.item.pcu}}
                div TL Bonus: {{props.item.tl}}
      .section(v-if="hasCrewQuarters")
        .columns
          .column
            h2.title Crew Quarters
            stat-block(:item="ship.crewQuarters" :type="'crew quarters'" @pick="onPick('crew')" @clear="setCrew(null)")
              template(slot="title" scope="props") Quality: {{props.item.name}}
              template(slot="details" scope="props")
                div Cost: {{props.item.cost}}
      .section
        .columns
          .column
            h2.title Sensors
            stat-block(v-if="hasCores" :item="ship.sensor" :type="'sensors'" @pick="onPick('sensor')" @clear="setSensor(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Range: {{props.item.range}}
                div Perception Modifier: {{props.item.modifier}}
                div Cost: {{props.item.cost}}
            .card(v-else)
              .card-content 
                .content You must have a core to equip security modules.
          .column
            h2.title Drift
            stat-block(:item="ship.drift" :type="'drift engine'" @pick="onPick('drift')" @clear="setDrift(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Engine Rating: {{props.item.rating}}
                div Min PCU: {{props.item.minPCU}}
                div Cost: {{armorCost(ship.frame, props.item)}}
          .column
            h2.title Shields
            stat-block(:item="ship.shields" :type="'shields'" @pick="onPick('shields')" @clear="setShields(null)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div Cost: {{props.item.cost}}
                div PCU: {{props.item.pcu}}
                div Shield Points: {{props.item.points}}
                div Regen: {{props.item.regen}}/min
      .section(v-if="ship.bays.length > 0")
        h2.title Expansion Bays
        .columns
          .column
            stat-block(v-for="(bay, index) in ship.bays" v-if="index % 3 === 0" :item="bay" :type="'expansion bay'" @pick="onPick('bay', index)" @clear="clearBay(index)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div {{props.item.details}}
                div Cost: {{props.item.cost}}
                div PCU: {{props.item.pcu}}
          .column
            stat-block(v-for="(bay, index) in ship.bays" v-if="(index - 1) % 3 === 0" :item="bay" :type="'expansion bay'" @pick="onPick('bay', index)" @clear="clearBay(index)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div {{props.item.details}}
                div Cost: {{props.item.cost}}
                div PCU: {{props.item.pcu}}
          .column
            stat-block(v-for="(bay, index) in ship.bays" v-if="(index - 2) % 3 === 0" :item="bay" :type="'expansion bay'" @pick="onPick('bay', index)" @clear="clearBay(index)")
              template(slot="title" scope="props") {{props.item.name}}
              template(slot="details" scope="props")
                div {{props.item.details}}
                div Cost: {{props.item.cost}}
                div PCU: {{props.item.pcu}}
</template>
<script>
  import PowerPicker from '~/components/power-picker'
  import ThrusterPicker from '~/components/thruster-picker'
  import ArmorPicker from '~/components/armor-picker'
  import FramePicker from '~/components/frame-picker'
  import ComputerPicker from '~/components/computer-picker'
  import CrewPicker from '~/components/crew-picker'
  import DefensesPicker from '~/components/defenses-picker'
  import DriftPicker from '~/components/drift-picker'
  import BayPicker from '~/components/bay-picker'
  import ShieldsPicker from '~/components/shields-picker'
  import SensorPicker from '~/components/sensor-picker'
  import StatBlock from '~/components/stat-block'
  import SecurityBlock from '~/components/security-block'
  import Vue from 'vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    data: () => ({
      initialPilotSkill: 0,
      tiers: [0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }),
    computed: {
      ...mapState(['ship']),
      ...mapState('pickerModule', ['picker', 'pickerIndex']),
      ...mapGetters(['armorCost', 'maxPCU', 'securityCost', 'hasCores']),
      stuntChecks () {
        return {
          easy: Math.floor(10 + 2 * this.ship.tier),
          medium: Math.floor(15 + 2 * this.ship.tier),
          hard: Math.floor(20 + 2 * this.ship.tier),
        }
      },
      maxBuildPoints () {
        switch (this.ship.tier) {
          case 0.25: return 25
          case 0.5: return 30
          case 1: return 55
          case 2: return 75
          case 3: return 95
          case 4: return 115
          case 5: return 135
          case 6: return 155
          case 7: return 180
          case 8: return 205
          case 9: return 230
          case 10: return 270
          case 11: return 310
          case 12: return 350
          case 13: return 400
          case 14: return 450
          case 15: return 500
          case 16: return 600
          case 17: return 700
          case 18: return 800
          case 19: return 900
          case 20: return 1000
        }
      },
      hasCrewQuarters () {
        return this.ship.frame !== null && this.ship.frame.size !== "tiny"
      },
      availableBuildPoints () {
        let total = this.maxBuildPoints
        total -= this.ship.frame !== null ? this.ship.frame.cost : 0
        total -= this.ship.thruster !== null ? this.ship.thruster.cost : 0
        total -= this.ship.computer !== null ? this.ship.computer.cost : 0
        total -= this.ship.crewQuarters !== null ? this.ship.crewQuarters.cost : 0
        total -= this.ship.defenses !== null ? this.ship.defenses.cost : 0
        total -= this.ship.armor !== null ? this.armorCost(this.ship.frame, this.ship.armor) : 0
        total -= this.ship.drift !== null ? this.armorCost(this.ship.frame, this.ship.drift) : 0
        total -= this.ship.bays.map(b => b !== null ? b.cost : 0).reduce(((b1, b2) =>  b1 + b2), 0)
        total -= this.ship.security.filter(s => s.enabled).map(s => this.securityCost(s)).reduce(((b1, b2) =>  b1 + b2), 0)
        total -= this.ship.sensor !== null ? this.ship.sensor.cost : 0
        total -= this.ship.shields !== null ? this.ship.shields.cost : 0
        return total
      },
      maxHP () {
        let total = 0
        total += this.ship.frame.hp.max
        total += this.ship.frame.hp.increment * Math.floor(this.ship.tier / 4)
        return total
      },
      totalAC () {
        let total = 10
        total += this.initialPilotSkill
        total += this.ship.armor !== null ? this.ship.armor.ac : 0
        total += this.frameBonus !== null ? this.frameBonus : 0
        return total
      },
      frameBonus () {
        if (this.ship.frame === null) return 0
        switch (this.ship.frame.size) {
          case 'tiny': return 2
          case 'small': return 1
          case 'medium': return 0
          case 'large': return -1
          case 'huge': return -2
          case 'gargantuan': return -4
          case 'colossal': return -8
        }
      },
      chosenTier: {
        get () {
          return this.ship.tier
        },
        set (value) {
          this.setTier(value)
        }
      },
      availablePCU () {
        let total = this.maxPCU
        total -= this.ship.thruster !== null ? this.ship.thruster.pcu : 0
        total -= this.ship.defenses !== null ? this.ship.defenses.pcu : 0
        total -= this.ship.computer !== null ? this.ship.computer.pcu : 0
        total -= this.ship.bays.map(b => b !== null ? b.pcu : 0).reduce(((b1, b2) =>  b1 + b2), 0)
        total -= this.ship.shields !== null ? this.ship.shields.pcu : 0
        return total
      },
      pickerComp () {
        if (this.picker === null) return null
        return  `${this.picker}-picker`
      },
      targetLockTotal () {
        let total = 10
        total += this.initialPilotSkill
        total += this.ship.armor !== null ? this.ship.armor.targetLock : 0
        total += this.ship.defenses !== null ? this.ship.defenses.tl : 0
        total += this.frameBonus
        return total
      },
      turnDistanceTotal () {
        let total = 0
        total += this.maneuverabilityDetails !== null ? this.maneuverabilityDetails.turn : 0
        total += this.ship.armor !== null ? this.ship.armor.turnDistance : 0
        return total
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
      pilotCheckTotal () {
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
        'setTier': 'SET_TIER',
        'setThruster': 'SET_THRUSTER',
        'setArmor': 'SET_ARMOR',
        'setComputer': 'SET_COMPUTER',
        'setCrew': 'SET_CREW',
        'setDefenses': 'SET_DEFENSES',
        'setDrift': 'SET_DRIFT',
        'setShields': 'SET_SHIELDS',
        'setSensor': 'SET_SENSOR',
        'setPicker': 'pickerModule/SET_PICKER',
        'setPickerIndex': 'pickerModule/SET_PICKER_INDEX',
      }),
      ...mapActions(['clearBay', 'setCore']),
      onPick (picker, index) {
        this.setPicker(picker)
        if (index !== undefined) {
          this.setPickerIndex(index)
        }
      }
    },
    components: {
      PowerPicker,
      ThrusterPicker,
      ArmorPicker,
      StatBlock,
      FramePicker,
      ComputerPicker,
      DefensesPicker,
      BayPicker,
      CrewPicker,
      DriftPicker,
      ShieldsPicker,
      SensorPicker,
      SecurityBlock
    }
  }
</script>
