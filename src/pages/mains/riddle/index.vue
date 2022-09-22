<template>
  <section>
    <div class="absolute riddle-title theme-color">
      <h3>欢迎来到猜谜语, 由大家描绘的一个谜语答题环节</h3>
    </div>
    <riddle-card
      :id="riddleId"
      @changeId="changeId"
      :riddleHead="riddleHead"
      :riddleBody="riddleBody"
    />
    <go-back />
		<go-edit edit="去出题" @goTopic="goTopic"/>
  </section>
</template>

<script>
import goBack from "@/components/common/go-back.vue";
import RiddleCard from "@/components/common/riddle-card.vue";
import GoEdit from '@/components/common/go-edit.vue';
export default {
  name: "riddle",
  components: {
    goBack,
    RiddleCard,
    GoEdit,
  },
  data() {
    return {
      riddleId: 0,
      riddleHead: "riddle-head",
      riddleBody: "riddle-body",
    };
  },
  mounted() {
    this.riddleId = this.$route.params.riddleId;
  },

  methods: {
    changeId(id) {
      this.raddleId = id;
    },
    goTopic() {
      this.$router.push({
        name: "study",
        params: {
          tag: "猜谜语",
        },
      });
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  position: relative;
  justify-content: center;
  width: 90%;
  margin: 10px auto 0;
  background-color: antiquewhite;
}
.riddle-title {
  top: 30px;
}
h3 {
  padding: 4px;
}

.time {
  font-size: 14px;
  color: #999;
}

.riddle-head {
  width: 100%;
  height: 100vh;
  margin-top: -80px;
}
:deep(.raddle-temp) {
  padding: 10px 4px;
}
:deep(.riddle-body) {
  position: absolute;
  height: 50%;
  width: 60%;
  padding-top: 20px;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 640px) {
  :deep(.riddle-body) {
    width: 100%;
  }
}
</style>