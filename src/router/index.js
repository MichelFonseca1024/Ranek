import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Produto from "@/views/Produto.vue";
import Login from "@/views/Login.vue";
import Usuario from "@/views/Usuario/Usuario.vue";
import UsuarioProdutos from "@/views/Usuario/UsuarioProdutos.vue";
import UsuarioCompras from "@/views/Usuario/UsuarioCompras.vue";
import UsuarioEditar from "@/views/Usuario/UsuarioEditar.vue";
import UsuarioVendas from "@/views/Usuario/UsuarioVendas.vue";
import PaginaNaoEncontrada from "@/views/PaginaNaoEncontrada.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: PaginaNaoEncontrada
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/produto/:id",
    name: "produto",
    component: Produto,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true
  },
  {
    path: "/usuario",
    component: Usuario,
    meta: {
      login: true
    },
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras,
        
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas,
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditar,
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

router.beforeEach((to, from, next) => {
 
  const title = "RANEK  " + to.name.toString().toUpperCase();
  document.title = title.replace("-", " ");
  if(to.matched.some(record => record.meta.login)){
    if(!window.localStorage.token){
      next("/login");
    }
    else{
      next();
    }
  }
  else{
    next();
  }
    
});

export default router;
