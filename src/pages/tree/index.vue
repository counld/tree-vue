<template>
	<div>
		<HelloWorld msg="Welcome to Your Vue.js App"/>
    <br>
    <TreeNode />
    
	</div>
</template>

<script>
import HelloWorld from '../../components/TreeComponent/HelloWorld.vue';
import TreeNode from '../../components/TreeComponent/TreeNode.vue';
export default {
  name: 'Tree',
  components: {
    HelloWorld,
    TreeNode
  }
}
</script>