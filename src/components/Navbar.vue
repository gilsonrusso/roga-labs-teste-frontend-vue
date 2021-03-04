<template>
  <v-app-bar app dark>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="12" md="4" class="d-flex justify-center">
        <v-card>
          <v-list-item class="grow">
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><strong></strong>John Silva</v-list-item-title>
              <v-list-item-title
                ><small class="text-details-login"
                  >Último login: 10/03/2021
                </small></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="btn-dropdown" icon v-bind="attrs" v-on="on" @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "navbar-component",
  data: () => ({
    show: false,
    items: [{ title: "Sair" }],
  }),
};
</script>

<style>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: var(--main-color) !important;
}

.theme--dark.v-card {
  background-color: transparent !important;
  width: 100%;
}

.v-list-item__content {
  padding: 0px;
  height: 100% !important;
}

.v-application a {
  color: #ffffff !important;
  text-decoration: none !important;
}

.text-details-login {
  color: #ffffff;
  font-weight: 400;
  font-size: 0.7rem;
}

.btn-dropdown{
  border-radius: 0;
  height: 60px !important;
}
</style>