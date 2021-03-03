<template>
  <v-app-bar app dark>
    <v-row>
      <v-col>
        <v-divider class="mx-4" vertical></v-divider>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-card-actions>
            <v-btn color="orange lighten-2" text> Explore </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                <a href="#">Sair</a>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <v-divider vertical></v-divider>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "navbar-component",
  data: () => ({
    show: false,
  }),
};
</script>

<style>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: var(--main-color) !important;
}
</style>