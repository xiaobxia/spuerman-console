/**
* Created by 周翔 on 2017/4/17.
*/

<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">详情</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="分组名称" prop="groupName">
              <el-input v-model="form.groupName" placeholder="输入分组名称" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务分组" prop="bizGroupCode">
              <el-input v-model="form.bizGroupCode" placeholder="输入业务分组" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分组代号" prop="bizCode">
              <el-input v-model="form.bizCode" placeholder="输入分组代号" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="描述详细信息"
                      v-model="form.description" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="info" @click="saveHandler" :disabled="disableForm">保存</el-button>
          <el-button type="danger" @click="resetHandler" :disabled="disableForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/babel">
  import assignDeep from 'assign-deep'
  import { mapActions } from 'vuex'

  import groupStore from './bll/groupStore'
  import store from '../../store'
  (!store.state.sysGroup) && store.registerModule('sysGroup', groupStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        form: {
          groupId: null,
          groupName: '',
          bizGroupCode: '',
          bizCode: '',
          description: ''
        },
        rules: {
          groupName: [
            {required: true, message: '此项不能为空'}
          ],
          bizGroupCode: [
            {required: true, message: '此项不能为空'}
          ],
          bizCode: [
            {required: true, message: '此项不能为空'}
          ],
          description: [
            {required: true, message: '此项不能为空'}
          ]
        }
      }
    },

    props: {
      param: {
        type: Object
      },
      mode: {
        type: String
      }
    },

    watch: {
      param(record) {
        if (record) {
          this.form.groupId = record.groupId;
          this.form.groupName = record.groupName;
          this.form.bizGroupCode = record.bizGroupCode;
          this.form.bizCode = record.bizCode;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            groupId: '',
            groupName: '',
            bizGroupCode: '',
            bizCode: '',
            description: ''
          });
        }
      },
      mode(val) {
        this.pageModel = val;
      }
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['saveSysGroup', 'updateSysGroup', 'querySysGroups']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysGroup' : 'updateSysGroup'](self.form).then(() => {
              this.querySysGroups();
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('添加成功');
              } else {
                self.resetHandler();
                self.$alert('修改成功', '消息', {
                  confirmButtonText: '确认'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请确认您的表单信息',
              type: '错误'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
        this.disableForm = true;
      },


      initPage() {
      },

      // interface for invoking

      disable() {
        this.disableForm = true;
      },
      enable() {
        this.disableForm = false;
      },
      clear() {
        this.$refs.form.resetFields();
      }

    }
  }
</script>
