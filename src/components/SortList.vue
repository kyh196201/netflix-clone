<template>
  <ul class="option-list sort-list">
    <li class="option-listItem" v-for="sort in sorts" :key="sort.id">
      <a href="#" :data-sort-id="sort.id">{{ sort.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SortList",
  props: ["sorts"]
};
</script>