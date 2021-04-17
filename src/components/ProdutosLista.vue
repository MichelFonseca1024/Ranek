<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div class="produto" v-for="(produto, index) in produtos" :key="index">
          <router-link :to="{name: 'produto', params: {id: produto.id}}">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
              srcset
            />
            <p class="preco">{{produto.preco | numeroPreco}}</p>
            <h2 class="titulo">{{produto.nome}}</h2>
            <p class="descricao">{{produto.descricao}}</p>
          </router-link>
        </div>
        <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosporPagina" />
      </div>
      <div
        class="sem-resultados"
        v-else-if="produtos && produtos.length === 0"
        key="sem-resultados"
      >
        <img src="https://portalmaia.com.br/images/nadaencontrado.jpg" alt />
      </div>
      <PaginaCarregando v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import { api } from "@/services/index.js";
import { serialize } from "@/helpers/index.js";
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar
  },
  data() {
    return {
      produtos: null,
      produtosporPagina: 9,
      produtosTotal: 0
    };
  },

  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosporPagina}${query}`;
    }
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      api.get(this.url).then(r => {
        this.produtosTotal = Number(r.headers["x-total-count"]);
        this.produtos = r.data;
      });
    }
  },
  watch: {
    url() {
      this.getProdutos();
    }
  },
  created() {
    this.getProdutos();
  }
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}

.produto {
  box-shadow: 0px 4px 8px rgba(30, 60, 90, 0.2);
  padding: 10px;
  background: #ffff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0px 6px 12px rgba(30, 60, 90, 0.3);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  font-weight: bold;
  color: #e80;
}

.sem-resultados img {
  margin: 0 auto;
}
</style>