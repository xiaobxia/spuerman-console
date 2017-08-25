<template>
  <div>
    <ul>
      <li>
        <router-link :to="{path:'/bpmn/workflow/leave', query:{_uncheck:true}}">请假申请</router-link>
      </li>
    </ul>
    <hr/>
    <el-row>
      <el-col :span="6">
        <span>我的申请</span>
      </el-col>

      <el-col :span="6" :offset="12">
        <el-select v-model="state" placeholder="请选择" @change="stateChangeHandler">
          <el-option
            v-for="item in getStateMapList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-table :data="dataList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="bizType" label="申请类型" :formatter="formatterHandler" width="150"/>
      <el-table-column prop="bizKey" label="业务主键" width="200"/>
      <el-table-column prop="state" label="状态" :formatter="formatterHandler"/>
      <el-table-column prop="stateDate" label="状态日期" width="160"/>
      <el-table-column prop="createDate" label="创建时间"/>
      <el-table-column prop="description" label="备注" :show-overflow-tooltip="true"/>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/bpmnStore'
  import store from '../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        state: '1',
        stateMap: {
          '0': '草稿',
          '1': '审批中',
          '2': '通过',
          '3': '拒绝'
        },
        applyMap: {
          'SysBizLeave': '请假申请'
        }
      }
    },
    components: {},
    computed: {
      dataList() {
        return this.$store.state.sysBpmn.myApplys;
      },
      totalCount() {
        return this.$store.state.sysBpmn.myApplysCount;
      },
      getStateMapList() {
        let result = [];
        let that = this;
        Object.keys(that.stateMap).map((item, index) => {
          result.push({value: item, label: that.stateMap[item]});
        });
        return result;
      }
    },
    watch: {
      state(value) {
        console.log('watch state', value);
        this._queryApplys(value);
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {
      ...mapActions(['queryMyApplysCount', 'queryMyApplys']),

      initPage() {
        console.log('[apply page] mounted');
        this._queryApplys(this.state);
      },

      _queryApplys(state) {
        this.queryMyApplysCount({state});
        this.queryMyApplys({state, pageIndex: 1, pageSize: this.pageSize});
      },
      stateChangeHandler(value) {
        this.state = value;
        console.log('change state', this.state);
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return this.stateMap['' + row.state];
          case 'bizType':
            return this.applyMap[row.bizType];
        }
      },
      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryMyApplys({state: this.state, pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.queryMyApplys({state: this.state, pageIndex: val, pageSize: this.pageSize});
      }
    }
  }
</script>
