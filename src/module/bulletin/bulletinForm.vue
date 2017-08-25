/**
* Created by 周翔 on 2017/4/11.
*/

<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">


      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告标题" prop="title">
              <el-input v-model="form.title" placeholder="输入公告标题" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告作者" prop="author">
              <el-input v-model="form.author" placeholder="输入公告作者" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公告简介" prop="intro">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="form.intro" placeholder="输入公告简介" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="图片地址" prop="homeImgUrl">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}"
                        v-model="form.homeImgUrl" placeholder="输入图片地址" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="公告类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择文章类型" :disabled="disableForm"
                         style="width:100%">
                <el-option v-for="item in types" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分组类型" prop="groupId">
              <el-select v-model="form.groupId" placeholder="请选择分组类型" :disabled="disableForm"
                         style="width:100%">
                <el-option v-for="item in getSysGroups" :label="item.groupName" :value="item.groupId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="form.deviceType" placeholder="请选择设备类型" :disabled="disableForm"
                         style="width:100%">
                <el-option v-for="item in deviceTypes" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="公告链接" prop="url">
              <el-input v-model="form.url" placeholder="输入公告链接" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="公告内容" prop="content">
            <vue-ueditor ref="ueditor" ueditorPath="static/ueditor/1.4.3.3/"
                         @ready="editorReadyHandler"
                         :ueditorConfig="editorConfig"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="详情描述" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="描述公告详情"
                      v-model="form.description" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="info" @click="saveHandler" :disabled="disableForm">保存</el-button>
          <el-button type="danger" @click="backHandler" :disabled="disableForm">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/babel">
  import assignDeep from 'assign-deep'
  import { mapActions, mapGetters } from 'vuex'
  import VueUeditor from 'vue-ueditor';
  import VueDraggable from 'vuedraggable'

  import bulletinStore from './bll/bulletinStore'
  import store from '../../store'
  (!store.state.sysBulletin) && store.registerModule('sysBulletin', bulletinStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        callbacks: [],
        deviceTypes: [
          {value: 0, label: 'PC'},
          {value: 1, label: 'APP'}
        ],
        types: [
          {value: 0, label: '常规文章'},
          {value: 1, label: '超链接'}
        ],
        form: {
          id: null,
          title: '',
          intro: '',
          homeImgUrl: '',
          content: '',
          groupId: '',
          deviceType: '',
          type: '',
          state: '',
          description: '',
          url: '',
          author: ''
        },
        rules: {
          title: [
            {required: true, message: '此项不能为空！'}
          ],
          intro: [
            {required: false}
          ],
          homeImgUrl: [
            {required: false}
          ],
          content: [
            {required: false}
          ],
          groupId: [
            {required: true, message: '此项不能为空！'}
          ],
          deviceType: [
            {required: true, message: '此项不能为空！'}
          ],
          type: [
            {required: true, message: '此项不能为空！'}
          ],
          state: [
            {required: true, message: '此项不能为空！'}
          ],
          description: [
            {required: false}
          ],
          url: [
            {required: false}
          ],
          author: [
            {required: false}
          ]
        },
        editorConfig: {
          serverUrl: '',
          initialFrameHeight: 500,
          toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts'
          ]]
        }
      }
    },
    computed: {
      ...mapGetters(['getSysGroups'])
    },
    components: {VueUeditor, VueDraggable},
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
          this.form.title = record.title;
          this.form.intro = record.intro;
          this.form.homeImgUrl = record.homeImgUrl;
          this.form.content = record.content;
          this.form.deviceType = record.deviceType;
          this.form.groupId = record.groupId;
          this.form.type = record.type;
          this.form.state = record.state;
          this.form.description = record.description;
          this.form.url = record.url;
          this.form.author = record.author;
          this.editor.setContent(this.form.content);
        } else {
          assignDeep(this.form, {
            id: '',
            title: '',
            intro: '',
            homeImgUrl: '',
            groupId: '',
            content: '',
            deviceType: '',
            type: '',
            state: '',
            description: '',
            url: '',
            author: ''
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
      ...mapActions(['saveSysBulletin', 'updateSysBulletin', 'querySysBulletins', 'queryBulletin', 'queryGroup']),
      saveHandler() {
        let self = this;
        self.form.content = this.editor.getContent();
        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysBulletin' : 'updateSysBulletin'](self.form).then(() => {
              this.querySysBulletins();
              self.disable();
              if (self.pageModel === 'ADD') {
                self.$confirm('添加成功', '信息', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/bulletin/index');
                });
              } else {
                self.$alert('公告修改成功', '消息', {
                  confirmButtonText: '确认'
                }).then(() => {
                  self.$router.push('/bulletin/index');
                });
              }
            })
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
      editorReadyHandler(editorInstance) {
        console.log('ueditor is ready!');
        this.editor = editorInstance;
        editorInstance.setContent('');

        if (this.callbacks && this.callbacks.length) {
          this.callbacks.forEach((cb, index) => {
            cb();
          });
          this.callbacks = [];
        }
      },
      resetHandler() {
        this.enable();
        this.editor.setContent('');
        this.$refs.form.resetFields();
      },
      backHandler() {
        this.$router.push('/bulletin/index');
      },

      initPage() {

        console.log('init bulletin page', this.$refs.ueditor);

        let biz = 'bulletin';
        this.queryGroup({biz});
        this.enable();
        if (this.$route.query) {
          const id = this.$route.query.id;
          if (id) {
            this.pageModel = 'EDIT'
            this.queryBulletin({id}).then(bulletin => {
              console.log(bulletin);
              this.form = bulletin;
              //this.editor.setContent(this.form.content);
              this.getEditorReady(() => {
                this.editor.setContent(this.form.content);
              });
            });
          }
        }
      },

      getEditorReady(cb) {
        if (this.editor) {
          this.editor.ready(cb);
        } else {
          this.callbacks.push(cb);
        }
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
