<template>
  <div style="border: 1px solid #ccc; marginBottom: 10px ">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 350px; overflow-y: hidden"
      class="srocll-set"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="onChange"
      @onCreated="onCreated"
    />
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { isMobile } from "@/utils/judgmentTools.js";
import { API_URL} from "@/config/env.js";
export default {
  name: "my-edtior",
  components: { Editor, Toolbar },
  props: [""],
  data() {
    var isShowFullScreen = false
    if(isMobile()) { //如果是移动端关闭fullScreen
         isShowFullScreen = true
    }
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        excludeKeys: [isShowFullScreen && 'fullScreen',]
      },
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: API_URL + "/api/upload/image", // 上传服务器地址 --> 必填，否则上传图片会报错。
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: "editormd-image-file",

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 1 * 1024 * 1024, // 1M

            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,

            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: [""],

            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。

            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,

            // 自定义增加 http  header

            // 跨域是否传递 cookie ，默认为 false
            withCredentials: false,

            // 超时时间，默认为 10 秒
            timeout: 5 * 1000, // 5 秒
          },
        },
      },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      this.$emit("getEditor", this.editor);
    },
    onChange(editor) {
      this.$emit('onChange',editor.getHtml()) // onChange 时获取编辑器最新内容
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    // 		this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css" >
.w-e-text-container {
  padding-bottom: 15px;
}

</style>