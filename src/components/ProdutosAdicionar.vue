<template>
  <section>
    <form class="adicionar-produto">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="produto.nome" />

      <label for="preco">Preço</label>
      <input id="preco" name="preco" type="number" v-model="produto.preco" placeholder="R$ 0,00" />

      <label for="fotos">Fotos</label>
      <input id="fotos" name="fotos" type="file" multiple ref="fotos" />

      <label for="descricao">Descrição</label>
      <textarea id="descricao" name="descricao" v-model="produto.descricao"></textarea>
      <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto" />
    </form>
  </section>
</template>

<script>
import { api } from "@/services/index.js";

export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        usuario_id: "",
        preco: "",
        vendido: "false",
        descricao: "",
        fotos: []
      }
    };
  },
  methods: {
    formatarProduto() {
      const form = new FormData();
      const files = this.$refs.fotos.files;
      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);
      form.append("vendido", this.produto.vendido);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },
    async adicionarProduto(event) {
      const produto = this.formatarProduto();

      const button = event.currentTarget;
      button.value = "Adicionando...";
      button.style.backgroundColor = "#bbc";
      button.disable = true;
      button.style.cursor = "initial";

      await api.post("/produto", produto);
      await this.$store.dispatch("getUsuarioProdutos");
      button.value = "Adicionar Produto";
      button.style.backgroundColor = "#78f";
      button.disable = false;
      button.style.cursor = "pointer";
    }
  }
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>