<template>
  <v-container>
    <v-row class="d-flex align-center animationLeft">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="col-main-one">
        <v-text-field
          :disabled="users.length == 0"
          outlined
          label="Busque por nomes ou e-mail"
          v-model="search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-spacer class="space-container"></v-spacer>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="d-flex">
        <v-col
          cols="8"
          xs="6"
          sm="6"
          md="6"
          lg="6"
          class="d-flex animationLeft"
        >
          <span class="py-3 mr-1"><strong>Filtros:</strong></span>
          <v-select
            :items="items"
            label="Escolha"
            v-model="chosenFilter"
            @change="getFilteredItems"
            :disabled="users.length == 0"
            solo
          ></v-select>
        </v-col>

        <v-col cols="4" class="animationLeft">
          <Popup
            @closeDialog="cancel"
            :isOpen="openDialog"
            :user="user"
            @save="saveUser"
          />
          <v-btn class="btn-add" @click="open"
            ><v-icon class="mr-2" color="white"> mdi-account-plus </v-icon
            ><span class="span-btn-add">NOVO ALUNO</span></v-btn
          >
        </v-col>
      </v-col>
    </v-row>
    <!-- Container Cards -->
    <v-row class="row-main">
      <v-row v-show="users.length == 0" class="justify-center my-10"
        ><h3 class="title">Não há usuários cadastrados</h3></v-row
      >
      <v-row v-if="users.length > 0">
        <v-col
          v-for="card in filteredNameAndEmail"
          :key="card.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
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
    usersFiltered: [],
    items: ["Todos", "Ativos", "Inativos"],
    openDialog: false,
    search: "",
    chosenFilter: "Todos",
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
      this.getFilteredItems();
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
      (this.user.name = ""),
        (this.user.email = ""),
        (this.user.age = ""),
        (this.user.phone = "");
    },
    open() {
      this.openDialog = true;
      this.chosenFilter = "Todos";
    },
    editUser(card) {
      this.user = { ...card };
      this.openDialog = true;
    },
    cancel() {
      this.cleanDialog();
      this.openDialog = false;
    },
    getFilteredItems() {
      const inativeItems = this.users.filter(
        (element) => element.disabled === true
      );
      const activeItems = this.users.filter(
        (element) => element.disabled === false
      );
      const chosenItems =
        this.chosenFilter === "Ativos"
          ? activeItems
          : this.chosenFilter === "Inativos"
          ? inativeItems
          : this.users;

      this.usersFiltered = chosenItems;

      const d = this.filteredNameAndEmail;
      console.log(d);
    },
  },
  created() {
    this.getUserLocalStorage();
    this.usersFiltered = this.users;
  },
  updated() {
    this.uuid = uuid.v4();
    // this.getFilteredItems();
  },
  computed: {
    filteredNameAndEmail: function () {
      return this.usersFiltered.filter((user) => {
        let union = user.name + user.email;
        return union.match(this.search);
      });
    },
  },
};
</script>

<style>
.v-application {
  min-width: 360px;
  padding: 20px;
}

.btn-add {
  background-color: var(--main-color) !important;
  color: #ffff !important;
  height: 62% !important;
}

.col-main-one {
  height: 60px;
}

@media (max-width: 500px) {
  .span-btn-add {
    display: none;
  }
}

.animationLeft{
  animation: moverEsquerda 1s ease-in;

}
.row-main{
   animation: moverParaCima 1s ease-in;
}

@keyframes moverEsquerda {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moverDireita {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moverParaCima {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>