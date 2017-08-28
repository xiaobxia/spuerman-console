<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Role Code" prop="roleCode">
            <el-input v-model="form.roleCode" placeholder="Role Code should unique." :disabled="pageModel==='EDIT'"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Role Name" prop="roleName">
            <el-input v-model="form.roleName" placeholder="Role Name"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="Input Description"
                    v-model="form.description">
          </el-input>
        </el-form-item>
      </el-row>

      <el-form-item>
        <el-button type="info" @click="saveHandler">Save</el-button>
        <el-button type="danger" @click="resetHandler">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">

  import { mapActions } from 'vuex';

  import moduleStore from './bll/roleStore';
  import store from '../../store';
  (!store.state.sysRole) && store.registerModule('sysRole', moduleStore);

  export default{
    data() {
      return {
        pageModel: 'ADD',
        form: {
          roleId: null,
          roleCode: '',
          roleName: '',
          description: ''
        },
        rules: {
          roleCode: [
            {required: true, message: 'This field is required.'}
          ],
          roleName: [
            {required: true, message: 'This field is required.'}
          ],
          description: [
            {required: true, message: 'This field is required.'}
          ]
        }
      };
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['querySysRole', 'saveSysRole', 'updateSysRole']),

      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysRole' : 'updateSysRole'](self.form).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('Succeed in adding Role.', 'Information', {
                  confirmButtonText: 'Continue to Add',
                  cancelButtonText: 'Back to List',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/role/index');
                });
              } else {
                self.$alert('Succeed in update role info.', 'Information', {
                  confirmButtonText: 'OK'
                });
              }

            });
          } else {
            this.$message({
              showClose: true,
              message: 'Please check this form information.',
              type: 'error'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
      },


      initPage() {
        console.log(this.$route);

        if (this.$route.query) {
          const roleId = this.$route.query.roleId;
          if (roleId) {
            this.pageModel = 'EDIT';
            this.querySysRole({roleId}).then(role => {
              console.log(role);
              this.form = role; //TODO 不是很优雅
            });
          }
        }

      }
    }
  };
</script>
