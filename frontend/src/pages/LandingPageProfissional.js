import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function LandingPageProfissional() {
    return (
        <Container>
            <Row className="h-screen text-brownMedium1 m-0 gap-2 flex flex-column justify-content-center align-items-center text-center w-12">
                <h1 className="m-0 font-bold">Plataforma de Gestão Inteligente para Autônomos</h1>
                <h3 className="m-0 font-medium">Transforme seu Negócio com uma Plataforma Completa de Gestão</h3>
                <h5 className=" opacity-70 mb-3">Facilite sua rotina e aumente seus ganhos com um sistema inteligente feito para você!</h5>
                <a href="/Cadastro" className="w-9 no-underline flex align-items-center justify-content-center">
                    <button type="button" className="border-round-xl border-none py-2 text-lg font-medium w-2 text-white bg-brownDark1-hover bg-brownMedium1"> Cadastra-se! </button>
                </a>
            </Row>
        </Container>
    )
}