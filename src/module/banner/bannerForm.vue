/**
* Created by 周翔 on 2017/3/30.
*/

<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">Detail</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Banner名字" prop="name">
              <el-input v-model="form.name" placeholder="Input Name" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="banner排序" prop="bannerOrder">
              <el-input v-model="form.bannerOrder" placeholder="Input BannerOrder" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="链接地址" prop="url">
              <el-input v-model="form.url" placeholder="Input Url" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="图片地址" prop="imgUrl">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="Input imgUrl"
                      v-model="form.imgUrl" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效时间" prop="effectDate">
              <el-date-picker
                style="width:100%"
                v-model="form.effectDate"
                type="datetime"
                placeholder="选择日期时间"
                :disabled="disableForm">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效时间" prop="expireDate">
              <el-date-picker
                style="width:100%"
                v-model="form.expireDate"
                type="datetime"
                placeholder="选择日期时间"
                :disabled="disableForm">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="banner状态" prop="state">-->
          <!--<el-select v-model="form.state" placeholder="banner状态" :disabled="disableForm"-->
          <!--style="width:100%">-->
          <!--<el-option v-for="item in states" :label="item.label" :value="item.value"/>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Input Description"
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
  import dateUtil from '../../util/dateUtil'

  import bannerStore from './bll/bannerStore'
  import store from '../../store'
  (!store.state.sysBanner) && store.registerModule('sysBanner', bannerStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        states: [
          {value: 'A', label: '上线'},
          {value: 'B', label: '下线'}
        ],
        form: {
          id: null,
          name: '',
          bannerOrder: '',
          url: '',
          imgUrl: '',
          description: '',
          effectDate: '',
          expireDate: ''
        },
        rules: {
          name: [
            {required: true, message: '此项不能为空'}
          ],
          bannerOrder: [
            {required: true, message: '此项不能为空'}
          ],
          url: [
            {required: false}
          ],
          imgUrl: [
            {required: true, message: '此项不能为空'}
          ],
          description: [
            {required: true, message: '此项不能为空'}
          ],
          effectDate: [
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
          this.form.id = record.id;
          this.form.name = record.name;
          this.form.bannerOrder = record.bannerOrder;
          this.form.url = record.url;
          this.form.imgUrl = record.imgUrl;
          this.form.description = record.description;
          this.form.effectDate = record.effectDate;
          this.form.expireDate = record.expireDate;
        } else {
          assignDeep(this.form, {
            id: '',
            name: '',
            bannerOrder: '',
            url: '',
            imgUrl: '',
            description: '',
            effectDate: '',
            expireDate: ''
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
      ...mapActions(['saveSysBanner', 'updateSysBanner', 'querySysBanners']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            if (self.form.url === null || self.form.url === undefined) {
              delete self.form.url;
            } else {
              let u = self.form.url.trim();
              if (u === '') {
                delete self.form.url;
              }
            }
            let userInfo = assignDeep({}, self.form);
            if (userInfo.effectDate) {
              if (typeof userInfo.effectDate === 'object') {
                userInfo.effectDate = dateUtil.getDateTime(userInfo.effectDate);
              }
            } else {
              delete userInfo.effectDate;
            }

            if (userInfo.expireDate) {
              if (typeof userInfo.expireDate === 'object') {
                userInfo.expireDate = dateUtil.getDateTime(userInfo.expireDate);
              }
            } else {
              delete userInfo.expireDate;
            }
            self[self.pageModel === 'ADD' ? 'saveSysBanner' : 'updateSysBanner'](userInfo).then(() => {
              this.querySysBanners();
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('添加banner成功');
              } else {
                self.resetHandler();
                self.$alert('更新banner成功', '消息', {
                  confirmButtonText: 'OK'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请检查你的信息填写',
              type: 'error'
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
