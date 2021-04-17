<template>
  <section>
    <h2>Crie Sua Conta</h2>
    <ErroNotificacao :erros="erros" />
    <transition mode="out-in">
      <button class="btn" v-if="!criar" @click="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: { UsuarioForm },
  data() {
    return {
      criar: false,
      erros: []
    };
  },
  methods: {
    async criarUsuario(event) {
      this.erros = [];

      const button = event.currentTarget;
      button.innerText = "Criando...";
      button.style.backgroundColor = "#bbc";
      button.disable = true;
      button.style.cursor = "initial";

      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.$router.push({ name: "usuario" });
      } catch (erro) {
        this.erros.push(erro.response.data.message);
        button.innerText = "Criar Usuário";
        button.style.backgroundColor = "#87f";
        button.disable = false;
        button.style.cursor = "pointer";
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>