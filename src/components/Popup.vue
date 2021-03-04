<template>
  <v-dialog v-model="isOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Cadastro de Aluno</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Nome*"
                :rules="nameRules"
                v-model="user.name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="email"
                :rules="rulesEmail"
                label="Email*"
                required
                v-model="user.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Idade*"
                v-model="user.age"
                :rules="idadeRules"
                max="100"
                min="10"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Telefone* DDDXXXXXXXX"
                :rules="phoneRules"
                v-model="user.phone"
                counter="12"
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
        </v-form>
        <small>*indicação de campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-btn class="btn btn-cancel" text @click="cancel()"
          ><strong>Cancelar</strong></v-btn
        >
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" class="btn btn-save" text @click="save()">{{
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
    return {
      valid: true,
      rules: [],
      rulesEmail: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 25 || "Número máximo de caracterer é 25",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Formato de e-mail inválido!.";
        },
      ],
      nameRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 37 || "Número máximo de caracterer é 37",
        (value) => {
          const pattern = /^[a-zA-Z]+[\s|-]?[a-zA-Z]+[\s|-]?[a-zA-Z]+$/;
          return pattern.test(value) || "Nome Inválido!.";
        },
      ],
      phoneRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 12 || "Número máximo de caracterer é 12",
        (value) => {
          const pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
          return pattern.test(value) || "Nome Inválido!.";
        },
      ],
      idadeRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 2 || "Número máximo de caracterer é 02",
      ],
    };
  },
  methods: {
    save() {
      this.$emit("save");
      this.$refs.form.reset();
    },
    cancel() {
      this.$refs.form.reset();
      this.$emit("closeDialog");
    },
  },
  computed: {
    disableBtn: function () {
      return this.$rules > 0 ? true : false;
    },
  },
};
</script>

<style>
.btn-save {
  background-color: var(--main-color);
  color: #ffff !important;
}
.btn-cancel {
  color: var(--second-color) !important;
}
.v-card__title {
  background-color: var(--second-color);
  color: #ffff;
}
</style>