<template>
  <section>
    <div v-if="vendas">
      <h2>vendas</h2>
      <div class="produto-wrapper" v-for="(venda, index) in vendas" :key="index">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="comprador">
            <span>Comprador:</span>
            {{venda.comprador_id}}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              <span>{{key}}:</span>
              {{value}}
            </li>
          </ul>
        </div>
      </div>
    </div>
     <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services/index.js";
import { mapState } from "vuex";

export default {
  name: "vendas",
  components: {
    ProdutoItem
  },
  data() {
    return {
      vendas: null
    };
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getvendas() {
      api.get(`/transacao?tipo=comprador_id`).then(Response => {
        this.vendas = Response.data;
      });
    }
  },
  whatch: {
    login() {
      if (this.login) {
        this.getvendas();
      }
    }
  },
  created() {
    if (this.login) {
      this.getvendas();
    }
  }
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.comprador span {
  color: #e80;
}

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}
.entrega span {
  text-transform: capitalize;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0px;
}

@media screen and (max-width: 500px) {
  .entrega {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  h3 {
    justify-self: center;
    grid-template-columns: 1fr;
  }
  ul{
    text-align: center;
  }
 
}
</style>