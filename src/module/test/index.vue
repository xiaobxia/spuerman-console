<template>
  <div>

    <el-row>
      <el-col>
        <div>排序测试</div>
        <vue-draggable element="span" v-model="list" :options="dragOptions" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <span class="badge">{{element.order}}</span>

              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                 @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
            </li>
          </transition-group>
        </vue-draggable>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div class="grid-content bg-purple">
           <span class="wrapper">
            <el-button type="success" @click="sessionTimeoutHandler">模拟用户登陆超时</el-button>
            <el-button @click="loadDynamicComponentHandler">动态加载路由</el-button>
            <el-button @click="goTestIndex2Handler">Test index2</el-button>
            <el-button @click="customEventHandler">Custom Event</el-button>
            <el-button type="info">test</el-button>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <vue-ueditor ueditorPath="//cdn.cd121.com/ueditor/1.4.3.3/"
                     @ready="editorReadyHandler"
                     :ueditorConfig="editorConfig"/>
        <div>
          <el-button type="success" @click="getEditorContentHandler">获取内容</el-button>
          <el-button type="success" @click="setEditorContentHandler">设置内容</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import VueUeditor from 'vue-ueditor';
  import VueDraggable from 'vuedraggable'

  import store from '../../store'
  import testStore from './bll/testStore'
  (!store.state.test) && store.registerModule('test', testStore)


  export default{
    name: 'TestPage',
    data() {
      return {
        msg: 'hello vue',
        list: ['Apple', 'Banana', 'Computer', 'noteBook', 'MiniCorp'].map((name, index) => {
          return {name, order: index + 1, fixed: false};
        }),
        editable: true,
        isDragging: false,
        delayedDragging: false,
        editorConfig: {
          toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts'
          ]]
        }
      }
    },

    components: {VueUeditor, VueDraggable},

    mounted() {
      this.initPage();
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      }
    },
    methods: {
      ...mapActions(['queryUserSessionTimeout']),

      initPage() {
        this.$root.eventBus.$on('CUSTOM_EVENT', (data) => {
          const msg = 'custom event:' + JSON.stringify(data);
          this.$message.info(msg);
          console.log(msg);
        })
      },
      orderList () {
        this.list = this.list.sort((one, two) => {
          return one.order - two.order;
        })
      },
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },

      sessionTimeoutHandler () {
        this.queryUserSessionTimeout();
      },
      goTestIndex2Handler() {
        this.$router.push({name: 'Test2', params: {_uncheck: true}}); //params 只能和name进行匹配使用
      },

      loadDynamicComponentHandler() {
        superman.registerRouter('testEmpty', resolve => {
          require(['./empty.vue'], resolve)
        });//懒加载
        this.$router.push({path: '/testEmpty', query: {title: 'TestEmptyPage'}});
      },

      customEventHandler() {
        this.$root.eventBus.$emit('CUSTOM_EVENT', {name: 'smith'});
      },

      editorReadyHandler(editorInstance) {
        console.log('ueditor is ready!');
        this.editor = editorInstance;
        editorInstance.setContent('<p>Hello World！</p><p>hi this is ueditor test</p>');
      },
      getEditorContentHandler() {
        if (this.editor) {
          this.$message.info(this.editor.getContent());
        }
      },
      setEditorContentHandler() {
        if (this.editor) {
          this.editor.setContent('this is new content ' + new Date());
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    padding: 10px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*排序样式 begin*/
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
    border: 1px solid #CCCCCC;
    margin-top: 5px;
    padding: 5px;
    list-style: none;
  }

  .list-group-item i {
    cursor: pointer;
  }

  /*排序样式end*/
</style>
