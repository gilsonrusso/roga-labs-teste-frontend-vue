<template>
  <v-app>
    <v-app-bar app color="orange darken-3" dark>
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

    <v-main class="mt-5">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-flex>
              <v-form>
                <v-text-field
                  outlined
                  label="Busque por nomes ou emails"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-form>
            </v-flex>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4" class="d-flex">
            <v-col cols="6" class="d-flex">
              <span class="pr-2 py-2"><strong>Filtros:</strong></span>
              <v-select :items="items" label="Todos" dense solo></v-select>
            </v-col>
            <v-col cols="6">
              <v-btn>
                <v-icon>mdi-plus</v-icon>
                Adicionar</v-btn
              >
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="card in listData" :key="card" cols="12" sm="3" md="3">
            <Card :data="card" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Card from "./components/Card";
export default {
  name: "App",

  components: {
    Card,
  },

  data: () => ({
    show: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    listData: [
      {
        name: "Fulano de Souza",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "fulano@gmail.com",
        age: "30",
        phone: "(11) 99844-3540",
      },
      {
        name: "Ciclano Moura",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "ciclano@gmail.com",
        age: "25",
        phone: "(11) 99844-3540",
      },
      {
        name: "Beltrano de lima",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "beltrano@gmail.com",
        age: "38",
        phone: "(11) 99844-3540",
      },
      {
        name: "Carlos Ferraz",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "carlos@gmail.com",
        age: "18",
        phone: "(11) 99844-3540",
      },
      {
        name: "Marcio de Castro",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "marcio@gmail.com",
        age: "45",
        phone: "(11) 99844-3540",
      },
      {
        name: "Silvana Silva",
        lastReview: "12/10/2020",
        image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        email: "silvana@gmail.com",
        age: "53",
        phone: "(11) 99844-3540",
      },
    ],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
  }),
};
</script>
