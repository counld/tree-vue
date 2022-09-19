<template>
	<div class="absolute menu-details" @click="goTopic">
      <div class="menu-wrapper">
        <div class="menu-item">{{edit}}</div>
      </div>
    </div>
</template>

<script>
export default {
	name: 'go-edit',
	props: ['edit'],
	data() {
		return {}
	},
	methods: {
		goTopic() {
			this.$emit('goTopic')
		}
	}
}
</script>
<style scoped>

.menu-details {
	position: fixed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #3e73a0;
  right: 30px;
  top: 80px;
}
.menu-details:hover {
	transform: scale(1.5);
}
.menu-wrapper {
	position: relative;
  display: flex;
	height: 100%;
  flex-direction: column;
	align-items: center;
}

.menu-wrapper:hover::before {
	right: -12px;
	transition: all 1 ease-in;
}

.menu-wrapper::before {
	content: '';
	width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 0 7px 7px;
  border-color: transparent transparent transparent #558fc2 ;
  position: absolute;
  z-index: 1;
  top: 5px;
	right: 0px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.menu-item {
	font-size: 14px;
	line-height: 25px;
	transform: scale(0.5);
	color: #fff;
	white-space: nowrap;
}
</style>