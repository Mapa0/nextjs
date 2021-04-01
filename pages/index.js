import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SideBar from "./sidebar";
const haversine = require("haversine");
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faUtensils,
  faCity,
  faTheaterMasks,
  faCompass,
  faGlobe,
  faMapMarkerAlt,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const cerca1 = {
  latitute: -22.8138898979856,
  longitude: -43.37738698539801,
  link: "https://geofencebrasil.com.br/pelourinho",
  nome: "Pelourinho",
  raio: 10000,
};
const cerca2 = {
  latitute: -22.8138898979856,
  longitude: -43.37738698539801,
  link: "https://geofencebrasil.com.br/jorgeamado/",
  nome: "Jorge Amado",
  raio: 1000,
};
const listaCercas = [cerca1, cerca2];
const cercasEncontradas = [];
export default function Home() {
  const [cercas, setCercas] = useState([]);

  useEffect(() => {
    let todosEncontrados = true;
    listaCercas.forEach((cerca) => {
      if (!(cerca in cercas)) todosEncontrados = false;
    });
    if (!todosEncontrados) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function success(position) {
            const end = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            listaCercas.forEach((cerca) => {
              console.log("Avaliando Cerca ", cerca.nome);
              let start = {
                latitude: cerca.latitute,
                longitude: cerca.longitude,
              };
              if (!(cerca in cercasEncontradas)) {
                if (haversine(start, end) < cerca.raio) {
                  cercasEncontradas.push(cerca);
                }
              }
            });
            setCercas(cercasEncontradas);
          },
          function error(error_message) {
            // Erro com a geolocalizacao
            console.error(
              "An error has occured while retrievinglocation",
              error_message
            );
          }
        );
      } else {
        // geolocalizacao nao suportada
        // Pegar localizacao de alguma forma
        console.log("geolocation is not enabled on this browser");
      }
    }
  });
  return (
<div id="container">
<div id="topo"><img src="/html/img/destaque.jpg" width="480" height="373" /> </div>
<div id="botoes">
<div class="box"><a href="/html/hoteis.html"><img src="/html/img/hoteis-bt.jpg" width="241" height="138" /></a></div>
<div><a href="/html/eventos.html"><img src="/html/img/eventos-bt.jpg" width="239" height="138" /></a></div>
<div class="box"><a href="/html/pontos-turisticos.html"><img src="/html/img/pontos-turisticos-bt.jpg" width="241" height="141" /></a></div>
<div><a href="/html/servicos.html"><img src="/html/img/servicos-bt.jpg" width="239" height="141" /></a></div>
</div>
<div class="search">
<div class="chamada1"><img src="/html/img/search-cerca.jpg" width="480" height="97" />
<div class="chamada"><img src="/html/img/radar.jpg" width="59" height="60" /><br /></div>
<div class="texto-cerca">CERCAS ENCONTRADAS</div>
<div class="encontradas">
{cercas.length > 0 && (
          <div>
            {cercas.map((cerca) => (
              <Link href={cerca.link} passHref={true}>
                <div>
                {cerca.nome === "Pelourinho" && (<div class="cerca"><a href="#"><img src="/html/img/cerca-pelourunho.jpg" width="266" height="89" /></a></div>)}
                {cerca.nome === "Jorge Amado" && (<div class="cerca"><a href="#"><img src="/html/img/cerca-jorge-amado.jpg" width="266" height="89" /></a></div>)}
                </div>
              </Link>
            ))}
          </div>
        )}
</div>
<div class="assinatura">Aplicativo para fins demonstrativos - © Geofence Brasil</div>
</div>
</div>
</div>

  );
}
