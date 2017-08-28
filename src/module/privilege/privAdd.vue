
<template>
  <div>
    <nav class="panel">
      <p class="panel-heading">Privliege Add </p>
      <div class="panel-block">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>

            <el-col :span="6">
              <el-form-item label="Parent Priv" prop="parentPrivId">
                <el-select v-model="form.parentPrivId" placeholder="Please select parent priv" style="width:100%">
                  <el-option label="Root Directory" :value="0"/>
                  <el-option v-for="item in getRootPrivs" :label="item.privName" :value="item.privId" :key="item.privId">
                    <span style="float: left">{{ item.privName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.privCode }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="Priv Code" prop="privCode">
                <el-input v-model="form.privCode" :disabled="pageModel==='EDIT'"/>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="Priv Name" prop="privName">
                <el-input v-model="form.privName"/>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="Type" prop="type">
                <el-select v-model="form.type" placeholder="Please select priv type."
                           @change="privTypeChangeHandler" style="width:100%">
                  <el-option label="Directory" :value="0"/>
                  <el-option label="Menu" :value="1"/>
                  <el-option label="Data" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :style="{display: form.type==1 ?block:'none'}">
            <el-col :span="12">
              <el-form-item label="URL" prop="url">
                <el-input v-model="form.url" placeholder="file in module PATH"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="PATH" prop="path">
                <el-input v-model="form.path" placeholder="show in browser(Hash)"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="Description" prop="description">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="Input Description"
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
    </nav>
  </div>
</template>

<script type="text/babel">

  import { mapActions, mapGetters } from 'vuex';

  import moduleStore from './bll/privStore';
  import store from '../../store';
  (!store.state.sysPriv) && store.registerModule('sysPriv', moduleStore);

  export default{
    data() {
      return {
        pageModel: 'ADD',
        form: {
          privId: null,
          parentPrivId: 0,
          privCode: '',
          privName: '',
          type: 1,
          url: '',
          path: '',
          description: ''
        },
        rules: {
          parentPrivId: [
            {required: true, message: 'This field is required.'}
          ],
          privCode: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          privName: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          type: [
            {required: true, message: 'This field is required.'}
          ],
          url: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          path: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          description: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ]
        }
      };
    },

    mounted() {
      this.initPage();
    },
    computed: {
      ...mapGetters(['getRootPrivs'])
    },
    methods: {
      ...mapActions(['savePriv', 'queryPriv', 'updatePriv', 'queryRootPrivs']),

      privTypeChangeHandler(privType) {
        console.log(arguments);
        switch (privType) {
          case 0://directory
            this.rules.url[0].required = false;
            this.rules.path[0].required = false;
            break;
          case 1://menu
            this.rules.url[0].required = true;
            this.rules.path[0].required = true;
            break;
          case 2://data
            this.rules.url[0].required = false;
            this.rules.path[0].required = false;
            break;
        }


      },
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'savePriv' : 'updatePriv'](self.form).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('Succeed in adding priv.', 'Information', {
                  confirmButtonText: 'Continue to Add',
                  cancelButtonText: 'Back to List',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/priv/index');
                });
              } else {
                self.$alert('Succeed in update priv info.', 'Information', {
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

        this.queryRootPrivs();

        if (this.$route.query) {
          const privId = this.$route.query.privId;
          if (privId) {
            this.pageModel = 'EDIT';
            this.queryPriv({privId}).then(priv => {
              console.log(priv);
              this.form = priv; //TODO 不是很优雅
              this.privTypeChangeHandler(priv.privType);
            });
          }
        }

      }
    }
  };
</script>
