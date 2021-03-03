<template>
  <v-card class="pa-2 rounded" elevation="3" min-width="280px">
    <v-row>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" alt="" :src="data.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              ><strong>{{ data.name }}</strong></v-list-item-title
            >
            <v-list-item-title
              ><small class="text-details"
                >Última avaliação: {{ data.lastReview }}</small
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-row>
    <v-divider></v-divider>
    <v-row class="py-2 px-2 align-center">
      <v-col cols="8">
        <span class="d-block"
          ><small class="text-details">{{ data.email }}</small></span
        >
        <span class="d-block"
          ><small class="text-details">{{ data.age }} {{ data.phone }}</small></span
        >
      </v-col>
      <v-col cols="4">
        <v-row class="justify-space-around">
          <v-btn rounded x-small height="40" width="40" color="grey lighten-5">
            <v-icon color="blue accent-4"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            rounded
            x-small
            height="40"
            width="40"
            depressed
            color="transparent"
          >
            <v-icon color="blue accent-4"> mdi-dots-horizontal </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: ["data"],
};
</script>

<style>
.text-details {
  color: var(--font-color);
  font-size: 0.8rem;
}
</style>