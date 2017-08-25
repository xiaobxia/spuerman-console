<template>
  <nav class="level app-levelbar">
    <div class="level-left">
      <div class="level-item">
        <h3 class="subtitle is-5">
          <strong>{{ name }}</strong>
        </h3>
      </div>
    </div>
  </nav>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        list: null
      }
    },

    created () {
      this.getList()
    },

    computed: {
      name () {
        return this.$route.name
      }
    },

    methods: {
      getList () {
        let matched = this.$route.matched
        let first = matched[0]
        if (first && (first.name !== 'Home' || first.path !== '')) {
          matched = [{name: 'Home', path: '/'}].concat(matched)
        }
        this.list = matched
      }
    },

    watch: {
      $route () {
        this.getList()
      }
    }
  }
</script>
