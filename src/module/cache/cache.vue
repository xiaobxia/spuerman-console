<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card" :body-style="{padding:'5px'}">
          <div class="clearfix" style="padding:5px;">
            <div class="btn-group-wrapper bottom">
              <el-form :inline="true" :model="form">
                <el-form-item>
                  <el-input v-model="form.key" placeholder="Cache Key" style="width:300px;">
                    <el-select v-model="form.type" slot="prepend" placeholder="Please Select" style="width:100px;">
                      <el-option label="String" :value="0"/>
                      <el-option label="List" :value="1"/>
                      <el-option label="Set" :value="2"/>
                      <el-option label="ZSet" :value="3"/>
                      <el-option label="Hash" :value="4"/>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item :style="{display:(form.type==1 || form.type==3?'':'none')}">
                  <label class="el-form-item__label">Start:</label>
                  <el-input-number v-model="form.start" :min="0" :step="1"/>
                </el-form-item>
                <el-form-item :style="{display:(form.type==1 || form.type==3?'':'none')}">
                  <label class="el-form-item__label">End:</label>
                  <el-input-number v-model="form.end" :min="10" :step="1"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="queryValueByKeyHandler">Query</el-button>
                  <el-button type="primary" @click="deleteValueByKeyHandler">Delete</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <el-form>
            <el-form-item>
              <el-input type="textarea" :disabled="true"
                        :autosize="{ minRows: 10}" placeholder="Cache Value"
                        v-model="getSysCacheValue"/>
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/cacheStore'
  import store from '../../store'
  (!store.state.sysCache) && store.registerModule('sysCache', moduleStore)

  export default{
    data() {
      return {
        form: {
          key: null,
          type: 0,
          start: 0,
          end: 10
        }
      }
    },
    computed: {
      ...mapGetters(['getSysCacheValue'])
    },
    methods: {
      ...mapActions(['querySysCacheValue', 'deleteCacheValue']),
      queryValueByKeyHandler() {
        this.querySysCacheValue({...this.form}).then(() => {
          this.$message.success('Succeed in querying cache.');
        });
      },
      deleteValueByKeyHandler() {
        this.deleteCacheValue({key: this.form.key}).then(() => {
          this.$message.success('Succeed in deleting cache.');
        });
      }
    }
  }
</script>
