import Vue from "vue";

Vue.filter("nameMask", function(value) {
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter("phoneMask", function(value) {
  value = value.toString();
  const ddd = value.slice(0, 3);
  const firstPart = value.slice(4, 8);
  const secondPart = value.slice(9, 12);
  const phoneFormated = `(${ddd}) ${firstPart}-${secondPart}`;
  return phoneFormated;
});
