<template>
  <section :class="{open:openAll,'app-main':true}">
    <div class="container is-fluid is-marginless app-content">
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script type="text/babel">
  import Levelbar from './Levelbar'

  export default {
    props: {
      openAll: Boolean
    },
    components: {
      Levelbar
    }
  }
</script>
