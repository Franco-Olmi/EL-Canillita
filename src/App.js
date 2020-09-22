import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./bootstrap.min.css";
import Navbar from "./components/common/Encabezado";
import Footer from "./components/common/Footer";
import Inicio from "./components/principal/Inicio";
import Error404 from "./components/error/Error404";
import Actualidad from "./components/categorias/Actualidad";
import Deportes from "./components/categorias/Deportes";
import Espectaculos from "./components/categorias/Espectaculos";
import Economia from "./components/categorias/Economía";
import Fotografia from "../src/assents/Fotografía";
import Politica from "./components/categorias/Política";
import Salud from "./components/categorias/Salud";
import Tecnologia from "./components/categorias/Tecnología";
import Login from "./components/login/Login";
import Sesion from "./components/login/Sesion";
import InfoNoticia from "./components/InfoNoticia";
import AgregarNoticias from "./components/noticias/AgregarNoticias";
import EditarNoticias from "./components/noticias/EditarNoticias";
import ItemNoticias from "./components/noticias/ItemNoticias";
import ListarNoticias from "./components/noticias/ListarNoticias";
import RecuperarClave from "./components/login/RecuperarClave";


function App() {
  const [noticias, setNoticias] = useState([]);
  const [recargarNoticia, setRecargarNoticia] = useState(true);
  const [noticiasCategorias, setNoticiasCategorias] = useState ([]);

  useEffect(() => {
    if (recargarNoticia) {
      consultar();
      setRecargarNoticia(false);
    }
  }, [recargarNoticia]);

  const consultar = async () => {
    try {
      const respuesta = await fetch("http://localhost:4004/api/noticia");
      console.log(respuesta);
      const resultado = await respuesta.json();
      setNoticias(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/Inicio de Sesion">
          <Sesion></Sesion>
        </Route>
        <Route exact path="/recuperar-clave">
          <RecuperarClave></RecuperarClave>
        </Route>
        <Route exact path="/">
          <Inicio setNoticiasCategorias={setNoticiasCategorias}></Inicio>
        </Route>
        <Route exact path="/actualidad">
          <Actualidad setNoticiasCategorias={setNoticiasCategorias}></Actualidad>
        </Route>
        <Route exact path="/deportes">
          <Deportes setNoticiasCategorias={setNoticiasCategorias}></Deportes>
        </Route>
        <Route exact path="/economia">
          <Economia setNoticiasCategorias={setNoticiasCategorias}></Economia>
        </Route>
        <Route exact path="/espectaculos">
          <Espectaculos setNoticiasCategorias={setNoticiasCategorias}></Espectaculos>
        </Route>
        <Route exact path="/fotografia">
          <Fotografia></Fotografia>
        </Route>
        <Route exact path="/politica">
          <Politica setNoticiasCategorias={setNoticiasCategorias}></Politica>
        </Route>
        <Route exact path="/salud">
          <Salud setNoticiasCategorias={setNoticiasCategorias}></Salud>
        </Route>
        <Route exact path="/tecnologia">
          <Tecnologia setNoticiasCategorias={setNoticiasCategorias}></Tecnologia>
        </Route>
        <Route exact path="/noticia/:id" render={ (props) =>{
            const parametro = props.match.params.id
            console.log(parametro);
            const noticiaBuscada = noticiasCategorias.find((item)=> item._id === parametro)
           console.log(noticiaBuscada)

          return <InfoNoticia noticia={noticiaBuscada}></InfoNoticia>
        }}>       
        </Route>
        <Route exact path="/error404">
          <Error404></Error404>
        </Route>
        <Route exact path="/noticias/agregar">
          <AgregarNoticias
            setRecargarNoticia={setRecargarNoticia}
          ></AgregarNoticias>
        </Route>
        <Route
          exact
          path="/noticias/editar/:id"
          render={(props) => {

            const parametroUrl = parseInt(props.match.params.id)
            console.log(parametroUrl);
            const buscarNoticia = noticias.find((item)=> item.id === parametroUrl)
            return <EditarNoticias noticia={buscarNoticia}></EditarNoticias>;
          }}
        ></Route>
        <Route exact path="/admin">
          <ListarNoticias
            noticias={noticias}
            setRecargarNoticia={setRecargarNoticia}
          ></ListarNoticias>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
