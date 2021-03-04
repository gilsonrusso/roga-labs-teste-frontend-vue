<template>
  <v-app>
    <Navbar />
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: { Home, Navbar },
  data: () => ({
    created() {
      localStorage.setItemItem("students");
    },
  }),
};
</script>
