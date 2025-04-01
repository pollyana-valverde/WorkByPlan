import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../provider/AuthProvider';
// import noImage from '../imagens/noUserProfileImg.webp';
// import SidebarAdm from "./Sidebar";

// import '../css/navegacao.css';

import Rotas from "../Routes";


export default function Navbar() {
    const { tokenGL } = useAuth();
    const userData = tokenGL ? JSON.parse(tokenGL) : null;
    const [scrollNavegacao, setScrollNavegacao] = useState(false)
    const [showToggleDropCliente, setShowToggleDropCliente] = useState(false)
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const startNavegacaoScroll = () => {
            if (window.scrollY >= 1) {
                setScrollNavegacao(true);
            } else {
                setScrollNavegacao(false);
            }
        };

        window.addEventListener('scroll', startNavegacaoScroll);

        return () => {
            window.removeEventListener('scroll', startNavegacaoScroll);
        };
    }, []);

    const [linksAutenticados] = useState([
        {
            caminho: "/",
            nome: "Home",
        },
        {
            caminho: "/Catalogo",
            nome: "Catálogo",
        },
    ]);

    const [linksSemHeader] = useState([
        {
            caminho: "/Logout",
            nome: "Logout",
        },
        {
            caminho: "/EnterAccount",
            nome: "EnterAccount",
        },
    ]);

    // Estado para rastrear o link ativo
    const [activeLink, setActiveLink] = useState(() => {
        // Recupera o link ativo do localStorage, se existir
        const savedLink = localStorage.getItem("activeLink");
        // return savedLink ? JSON.parse(savedLink) : linksPublicos[0];
    });

    // Função para atualizar o link ativo e salvar no localStorage
    const handleLinkClick = (link) => {
        setActiveLink(link);
        localStorage.setItem("activeLink", JSON.stringify(link));
    };

    const toggleDropCliente = () => {
        setShowToggleDropCliente((prevState) => !prevState);
    }

    return (
        <Container fluid>
            {!tokenGL && (
                <>
                    <Row className={`navFixed flex justify-content-between fixed w-12 z-5 align-items-center text-center ${scrollNavegacao ? 'navScroll my-2' : ' my-3 '}`}>
                        <Col lg={3}>
                            <a
                                className="text-xl font-bold no-underline text-brownMedium1"
                                href="/"
                                onClick={() => handleLinkClick("/")}>WorkByPlan</a>
                        </Col>
                        <Col lg={3}>
                            <a href="/login" className="text-brownMedium1 text-lg font-bold ">Login</a>
                        </Col>
                    </Row>
                    <Col ><Rotas /></Col>
                </>
            )}

            {tokenGL && (
                <>
                    <Row className={`navFixed flex justify-content-between fixed w-12 z-2 align-items-center text-center ${scrollNavegacao ? 'navScroll my-2' : ' my-3 '}`}>
                        <Col lg={3}>
                            <a
                                className="text-xl font-bold no-underline text-brownMedium1"
                                href="/"
                                onClick={() => handleLinkClick("/")}>RoadGarden</a>
                        </Col>
                        <Col lg={3}>
                            <div className="navegacaoCliente flex gap-3 justify-content-center align-items-center">
                                <div className="flex gap-2">
                                    <a href="/listaDesejo"><i className="pi pi-heart"></i></a>
                                    <a href="/carrinhoCompra"><i className="pi pi-shopping-bag"></i></a>
                                </div>

                                <div className="flex navegacaoDrop relative gap-2 align-items-center">
                                    {/* <img src={userData.imgPerfilCadastro ? `http://localhost:3002${userData.imgPerfilCadastro}` : noImage} alt='perfilFoto' /> */}
                                    <div className="flex flex-column text-left line-height-2">
                                        <p className="text-xs opacity-40">Olá, {userData.nome}</p>
                                        <div className="flex gap-2 align-items-center">
                                            <p className="text-sm font-medium">{userData.nome} {userData.sobrenome}</p>
                                            <i className="pi pi-angle-down" onClick={toggleDropCliente}></i>
                                        </div>
                                        {showToggleDropCliente && (
                                            <div className="navegacaoDropShow line-height-3">
                                                <a href="/config">Configurações</a>
                                                <a href="/meusPedidos"> Meus pedidos</a>
                                                <div style={{ borderTop: '1px solid var(--tuscanRed)', margin: '3px 0' }}></div>
                                                <a href="/Logout" > <i className="pi pi-sign-out"></i> Sair</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Col ><Rotas /></Col>
                </>
            )}
        </Container>
    );
}


