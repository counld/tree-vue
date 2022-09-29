<template>
  <aside>
    <my-tab />
    <div class="aside-bottom">
      <riddle-card :id="asideId" :asideCard="true" @changeId="changeId"/>
    </div>
  </aside>
</template>
<script>
import myTab from "./componets/my-tab.vue";
import riddleCard from "../common/riddle-card.vue";
export default {
  name: "aside-componet",
  components: {
    myTab,
    riddleCard
  },
  data() {
    return {
      asideId: 1,
    };
  },
  mounted() {
  },
  methods: {
    changeId(id) {
      this.asideId = id;
    }
  },
};
</script>
<style scoped>
aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 25%;
  right: 30px;
}
.aside-bottom {
  margin-bottom: 1rem;
}
@media screen and (max-width: 640px) {
  aside {
    position: static;
    width: 100%;
  }
}
@media screen and (min-width: 640px) and (max-width: 1025px) {
  aside {
    display: none;
  }
}
</style>