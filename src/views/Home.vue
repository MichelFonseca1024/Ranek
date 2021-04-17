<template>
  <section>
    <h1>Compre ou venda</h1>
    <ProdutosBuscar/>
    <ProdutosLista/>
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/ProdutosBuscar"
import ProdutosLista from "@/components/ProdutosLista"

export default {
  name: "home",
  components: {
    ProdutosBuscar,
    ProdutosLista
  },
  beforeCreate(){
    document.title = "RANEK"
  }

}
</script>

<style scoped>
  h1{
    font-size: 2rem;
    color: #87f;
    margin-top: 40px;
    text-align: center;
  }
</style>