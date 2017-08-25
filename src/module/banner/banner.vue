/**
* Created by 周翔 on 2017/3/30.
*/
<template>
  <div>

    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>
    </div>

    <el-table ref="bannerTable" :data="getSysBanners" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id" style="width: 100%">
      <el-table-column type="index" width="100"/>
      <el-table-column prop="name" min-width="200" label="Banner名称" :show-overflow-tooltip="true"/>
      <!--<el-table-column prop="imgUrl" label="Banner ImgUrl" width="150" />-->
      <!--<el-table-column prop="url" label="Banner Url" width="150"/>-->
      <el-table-column prop="bannerOrder" label="Banner排序" width="100"/>
      <el-table-column prop="createDate" width="200" label="创建时间"/>
      <el-table-column prop="effectDate" width="200" label="生效时间"/>
      <el-table-column prop="expireDate" width="200" label="失效时间"/>
      <el-table-column prop="state" label="状态" width="100" :formatter="formatterStateHandler"/>
      <el-table-column inline-template :context="_self" label="操作" width="100" fixed="right">
      <span>
        <el-button :type="row.state === 'B'?'danger':'info'" size="small"
                   @click="onlineHandler($index,row)">{{row.state === 'B'?'上线':'下线'}}</el-button>
      </span>
      </el-table-column>
    </el-table>

    <banner-form ref="bannerForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'
  import bannerStore from './bll/bannerStore'
  import store from '../../store'
  (!store.state.sysBanner) && store.registerModule('sysBanner', bannerStore)
  import BannerForm from './bannerForm.vue'

  export default{
    data() {
      return {
        formMode: null,
        currentRecord: null
      }
    },

    computed: {
      ...mapGetters(['getSysBanners'])
    },

    components: {BannerForm},

    mounted() {
      this.initPage();
    },
    methods: {
      ...mapActions(['querySysBanners', 'deleteSysBanner', 'onlineSysBanner']),

      initPage() {
        console.log('[Banner Page] mounted');
        this.querySysBanners();
      },
      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.bannerTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.bannerForm.enable();
        this.$refs.bannerForm.clear();
      },
      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择一条数据');
          return;
        }
        this.$refs.bannerForm.enable();
        this.formMode = 'EDIT';
      },
      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择一条数据');
          return;
        }

        this.deleteBanner(this.currentRecord.id)
      },
      formatterStateHandler (row, column) {
        switch (column.property) {
          case 'state':
            switch (row.state) {
              case 'A':
                return '上线';
              case 'B':
                return '下线';
            }
            break;
        }
        return 'Unkown key'
      },
      onlineHandler(index, row) {
        this.$confirm(row.state === 'B' ? '你确定要上线吗?' : '你确定要下线吗?', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onlineSysBanner(row).then(data => {
            this.$message.success(row.state === 'B' ? '下线成功' : '上线成功');
          });
        });
      },
      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.bannerForm.disable();
      },
      deleteBanner(id) {
        this.$confirm('你确定要删除这条数据吗?', '确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSysBanner({id}).then(data => {
            this.$message.success('数据删除成功');
            this.currentRecord = null;
            this.$refs.bannerForm.clear();
          });
        });
      }
    }
  }
</script>
