<template>
  <div>
    <ul>
      <li v-for="item in getComments">
        <div>
          <div style="color:#ccc">{{item.time | dateTimeFormat}} - {{item.userId}}</div>
          <div>{{item.message}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from '../../bll/bpmnStore'
  import store from '../../../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)

  export default{
    data() {
      return {
        msg: 'hello vue'
      }
    },

    props: {
      pid: {
        type: String
      }
    },

    watch: {
      pid(value) {
        this.pid = value;
        console.log('update pid value=', value);
        this.queryComments(value);
      }
    },

    computed: {
      getComments() {
        return this.$store.state.sysBpmn.comments;
      }
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['queryProcessInstanceComments']),
      initPage() {
        console.log('[leave-comment-list] mounted.');
        console.log('pid=', this.pid);
        this.queryComments(this.pid);
      },
      queryComments(pid) {
        pid && this.queryProcessInstanceComments({pid});
      }
    }
  }
</script>
