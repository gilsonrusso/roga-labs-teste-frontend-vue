<template>
  <v-dialog v-model="isOpen" persistent max-width="600px">
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
        <v-btn class="btn-styled" color="blue darken-1" text @click="save()">{{
          user.id ? "Atualizar" : "Salvar"
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "popup-component",
  props: ["user", "isOpen"],
  data() {
    return {};
  },
  methods: {
    save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style>
</style>