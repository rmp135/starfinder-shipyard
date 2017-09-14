<template lang="pug">
  .card
    div(v-if="item !== null")
      header.card-header
          p.card-header-title
            slot(name="title" :item="item") {{item.title}}
      .card-content
        slot.content(:item="item" name="details")
    div(v-else)
      .card-content
        .content No {{type}} selected.
    footer.card-footer
      a.card-footer-item(@click="$emit('pick')") Pick {{type}}
      a.card-footer-item(@click="$emit('clear')" v-if="item !== null") Clear {{type}}
</template>
<script>
  export default {
    props: ["item", "type"]
  }
</script>
