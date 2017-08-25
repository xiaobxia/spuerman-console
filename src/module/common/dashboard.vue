<template>
  <div class="dashboard-wrapper">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">{{$t('DASHBOARD')}}</h3>
      </div>
      <div class="panel-body">
        {{this.$store.state.loginUser.userName}},&nbsp;{{$t('WELCOME')}}
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import moduleStore from './bll/dashboardStore'
  import store from '../../store'
  (!store.state.sysDashboard) && store.registerModule('sysDashboard', moduleStore)

  export default{
    data() {
      return {}
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        console.log(this);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .dashboard-wrapper {
    margin-top: 5px;
    margin-left: 5px;

    .panel {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid transparent;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
      box-shadow: 0 1px 1px rgba(0, 0, 0, .05);

      .panel-primary {
        border-color: #337ab7;
      }

      .panel-heading {
        color: #fff;
        background-color: #337ab7;
        border-color: #337ab7;
      }
      .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      .panel-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
        color: inherit;
      }

      .panel-body {
        padding: 15px;
      }
    }
  }
</style>
