<template>
  <div>
    <h3>{{title}}</h3>
    <p>{{titleEn}}</p>
  </div>
</template>
<script>
export default {
  props: ["title", "titleEn"]
};
</script>
<style lang="scss" scoped>
div {
  text-align: center;
}
h3 {
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}
p {
  text-align: center;
  font-size: 16px;
  color: #4a4a4a;
}
</style>
