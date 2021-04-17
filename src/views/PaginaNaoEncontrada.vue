<template>
  <div class="nao-encontrada">
    <h1>Pagina Nao Encontrada</h1>
    <router-link class="home" to="/">
      <img src="@/assets/ranek.svg" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PaginaNaoEncontrada"
};
</script>

<style scoped>
.nao-encontrada {
  background: #87f;
  padding: 20px 0;
  height: 100vh;
}
h1 {
  margin-bottom: 20px ;
  text-align: center;
  color: #fff;
}
.home img {
  margin: 0 auto;
  width: 400px;
  padding: 100px;
  background: #fff;
}
</style>