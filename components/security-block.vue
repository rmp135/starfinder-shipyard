<template lang="pug">
  .card
    header.card-header
      p.card-header-title {{name}}
    .card-content
      .content
        div
          label.checkbox
            input(type="checkbox" v-model="enabled")
            | Enabled
        div
          label.checkbox(v-if="canBeUpgraded")
            input(type="checkbox" v-model="upgraded")
            | Upgraded
        div(v-if="shouldShowModifier")
          label Modifier
          input(type="number" v-model.number="modifier").input
        div Cost: {{securityCost(item)}}
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    props: ['item'],
    computed: {
      ...mapState(['ship']),
      ...mapGetters(['securityCost']),
      enabled: {
        get () {
          return this.ship.security.find(s => s.name === this.item.name).enabled
        },
        set (value) {
          this.updateSecurity({ item: this.item, newItem: { enabled: value }})
        }
      },
      upgraded: {
        get () {
          return this.ship.security.find(s => s.name === this.item.name).upgraded
        },
        set (value) {
          this.updateSecurity({ item: this.item, newItem: { upgraded: value, adder: 0 }})
        }
      },
      modifier: {
        get () {
          return this.ship.security.find(s => s.name === this.item.name).adder
        },
        set (value) {
          this.updateSecurity({ item: this.item, newItem: { adder: value }})
        }
      },
      name () {
        return this.item.upgraded ? this.item.upgradedName : this.item.name
      },
      shouldShowModifier () {
        return this.item.onlyShowAdderWhenUpgraded && this.item.upgraded
      },
      canBeUpgraded () {
        return this.item.upgraded !== undefined
      }
    },
    methods: {
      ...mapMutations({
        'updateSecurity': 'UPDATE_SECURITY'
      })
    }
  }
</script>
