<template>
  <v-container>
    <v-row class="d-flex align-center">
      <v-col cols="4">
        <v-flex>
          <v-form>
            <v-text-field
              :disabled="users.length == 0"
              outlined
              label="Busque por nomes ou e-mail"
              v-model="search"
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5" class="d-flex">
        <v-col cols="6" class="d-flex">
          <span class="py-3 mr-1"><strong>Filtros:</strong></span>
          <v-select
            :items="items"
            label="Escolha"
            v-model="filter"
            :disabled="users.length == 0"
            solo
          ></v-select>
        </v-col>
        <v-col cols="6">
          <Popup
            @closeDialog="cancel"
            :isOpen="openDialog"
            :user="user"
            @save="saveUser"
          />
          <v-btn @click="open">Adicionar</v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-row v-show="users.length == 0" class="justify-center my-10"
        ><h3 class="title">Não há usuários cadastrados</h3></v-row
      >
      <v-row v-if="users.length > 0">
        <v-col
          v-for="card in filteredNameAndEmail"
          :key="card.id"
          cols="12"
          sm="3"
          md="3"
        >
          <Card :data="card" @emitir="editUser(card)" />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import Popup from "../components/Popup";
import { uuid } from "vue-uuid";
import Card from "../components/Card";
export default {
  name: "home-component",
  components: {
    Card,
    Popup,
  },
  data: () => ({
    uuid: uuid.v4(),
    user: {
      name: "",
      lastReview: "03/03/2021",
      image: "https://cdn.vuetifyjs.com/images/john.jpg",
      email: "",
      age: "",
      phone: "",
      disabled: false,
    },
    users: [],
    items: ["Todos", "Ativos", "Inativos"],
    openDialog: false,
    search: "",
    filter: "todos",
  }),
  methods: {
    saveUser() {
      const newUser = {
        id: this.uuid,
        ...this.user,
      };

      let users = localStorage.getItem("usersApp");

      if (users) {
        users = JSON.parse(users);

        const userFindIndex = users.findIndex(
          (user) => user.id === this.user.id
        );

        if (userFindIndex < 0) {
          users.push(newUser);
        } else {
          users[userFindIndex] = this.user;
        }
      } else {
        users = [{ ...newUser }];
      }
      localStorage.setItem("usersApp", JSON.stringify(users));
      this.getUserLocalStorage();
      this.cleanDialog();
      this.openDialog = false;
    },
    getUserLocalStorage() {
      let usersStorage = localStorage.getItem("usersApp");
      let data = JSON.parse(usersStorage);
      if (usersStorage) {
        this.users = data;
      }
    },
    cleanDialog() {
      (this.user.id = ""),
        (this.user.name = ""),
        (this.user.email = ""),
        (this.user.age = ""),
        (this.user.phone = "");
    },
    open() {
      this.openDialog = true;
    },
    editUser(card) {
      this.user = { ...card };
      this.openDialog = true;
    },
    cancel() {
      this.cleanDialog();
      this.openDialog = false;
    },
  },
  created() {
    this.getUserLocalStorage();
  },
  updated() {
    this.uuid = uuid.v4();
  },
  computed: {
    filteredNameAndEmail: function () {
      return this.users.filter((user) => {
        let union = user.name + user.email;
        return union.match(this.search);
      });
    },
  },
};
</script>

<style>
.theme--dark.v-btn.v-btn--has-bg {
  background-color: var(--main-color);
}

.v-card__title {
  background-color: var(--second-color);
  color: #ffff;
}

.v-application .blue--text.text--darken-1 {
  color: var(--second-color) !important;
}

.v-application .blue--text.text--darken-1.btn-styled {
  background-color: var(--main-color);
  color: #ffff !important;
}

.title {
  color: var(--font-color);
}
</style>