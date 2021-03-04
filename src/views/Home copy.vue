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
      <v-col cols="3"></v-col>
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
          <!-- Dialog -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn height="50" dark v-bind="attrs" v-on="on">
                Novo Aluno
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cadastro de Aluno</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nome*"
                        v-model="user.name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email*"
                        required
                        v-model="user.email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Idade*"
                        v-model="user.age"
                        max="80"
                        min="10"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Telefone*"
                        v-model="user.phone"
                        type="text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-switch
                        v-model="user.disabled"
                        class="ma-2"
                        label="Disabled"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicação de campos obrigatórios</small>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="cancel()"
                  ><strong>Cancelar</strong></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  class="btn-styled"
                  color="blue darken-1"
                  text
                  @click="saveUser(user)"
                  >Salvar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog -->
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-row v-if="users.length == 0" class="justify-center my-10"
        ><h3 class="title">Não há usuários cadastrados</h3></v-row
      >
      <v-col
        v-else
        v-for="card in filteredNameAndEmail"
        :key="card.id"
        cols="12"
        sm="3"
        md="3"
      >
        <Card :data="card" @emitir="editUser(card)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { uuid } from "vue-uuid";
import Card from "../components/Card";
export default {
  name: "home-component",
  components: {
    Card,
  },
  data: () => ({
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
    dialog: false,
    search: "",
    filter: "todos",
  }),
  methods: {
    saveUser() {
      const newUser = {
        id: this.generatorId,
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
      this.dialog = false;
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
    editUser(card) {
      this.user = { ...card };
      this.dialog = true;
    },
    cancel() {
      this.cleanDialog();
      this.dialog = false;
    },
    generatorId() {
      // return  Math.random().toString().substr(2, 8)
      return uuid.v4();
    },
  },
  created() {
    this.getUserLocalStorage();
  },
  computed: {
    filteredNameAndEmail: function () {
      return this.users.filter((user) => {
        let union = user.name + user.email;
        return union.match(this.search);
      });
    },
    // generatorId: function () {
    //   return uuid.v4();
    // },
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