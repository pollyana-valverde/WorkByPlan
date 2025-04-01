import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
// import Privacidade from "./pages/Privacidade";
// import Suporte from "./pages/Suporte";
// import AboutUs from "./pages/AboutUs";
import Config from "./pages/Config";
import Historico from "./pages/Historico";
import PaginaServico from "./pages/PaginaServico";
import Pagamento from "./pages/Pagamento";
import Notificacoes from "./pages/Notificacoes";
import Agenda from "./pages/Agenda";
import Dashboard from "./pages/Dashboard";
// import AddProduto from "./pages/Adm/AddProduto";

import EnterAccount from "./pages/EnterAccount";
import Logout from "./pages/Logout";


const Rotas = () => {
  const { tokenGL } = useAuth();

  const rotasSomenteAutenticados = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: '/EnterAccount',
          element: <EnterAccount />,
        },
        {
          path: "/Logout",
          element: <Logout />,
        },
        {
          path: "/",
          element: <Home  />
        },
        {
          path: "/Historico",
          element: <Historico  />
        },
        {
          path: "/PaginaServico",
          element: <PaginaServico  />
        },
        {
          path: "/config",
          element: <Config  />
        },
        {
          path: "/Notificacoes",
          element: <Notificacoes  />
        },
        // {
        //   path: "/detalhesProduto/:idProduto",
        //   element: <DetalhesProduto  />
        // },
        {
          path: "/pagamento",
          element: <Pagamento  />
        },
        {
          path: "/dashboard",
          element: 
            <Dashboard /> 
        },
        // {
        //   path: "/addProduto",
        //   element: 
        //     <AddProduto /> 
        // },
        {
          path: "/Agenda",
          element: <Agenda />,
        },
      ],
    },
  ];

  const rotasNaoAutenticados = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/cadastro",
      element: <Cadastro />
    },
    // {
    //   path: "/Privacidade",
    //   element: <Privacidade />
    // },
    // {
    //   path: "/Suporte",
    //   element: <Suporte />
    // },
    // {
    //   path: "/AboutUs",
    //   element: <AboutUs />
    // },
  ];

  const router = createBrowserRouter([
    ...(!tokenGL ? rotasNaoAutenticados : []),
    ...rotasSomenteAutenticados,
  ]);


  return <RouterProvider router={router} />;
};

export default Rotas;
