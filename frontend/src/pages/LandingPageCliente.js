import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function LandingPageCliente() {
    return (
        < >
            <Row style={{ background: 'linear-gradient(to bottom, var(--brownLight2) 1%, transparent 100%)' }}
                className="border-round-xl h-screen text-brownMedium1 m-0 gap-2 flex flex-column justify-content-center align-items-center text-center w-12">
                <h1 className="m-0 font-bold">Encontre Profissionais de Beleza e Bem-Estar com Facilidade</h1>
                <h3 className="m-0 font-medium">Agende serviços de beleza e bem-estar de forma simples e rápida</h3>
                <h5 className=" opacity-70 mb-3">Procurando um cabeleireiro, manicure, massagista ou esteticista?<br />Nossa plataforma conecta você aos melhores profissionais perto de você!</h5>
                <a href="/Cadastro" className="w-9 no-underline flex align-items-center justify-content-center">
                    <button type="button" className="border-round-xl border-none py-2 text-lg font-medium w-2 text-white bg-brownDark1-hover bg-brownMedium1"> Cadastra-se! </button>
                </a>
            </Row>
            <Row className="h-screen text-brownMedium1 m-0 gap-2 flex flex-column justify-content-center align-items-center text-center w-12">
                <h1 className="font-bold">Por que usar nossa plataforma?</h1>
                <div className="flex text-whiteSmoke gap-2 justify-content-between align-items-center">
                    <div className="flex flex-column bg-brownMedium1 p-4">
                        <h3>Agendamento Fácil</h3>
                        <h5>Escolha o serviço, horário e profissional em poucos cliques.</h5>
                    </div >

                    <div className="flex flex-column bg-brownMedium2 p-4">
                        <h3>Profissionais Qualificados</h3>
                        <h5>Veja avaliações e escolha o melhor para você.</h5>
                    </div>

                    <div className="flex flex-column bg-brownDark1 p-4">
                        <h3>Lembretes Automáticos</h3>
                        <h5>Nunca mais esqueça um agendamento.</h5>
                    </div>

                    <div className="flex flex-column bg-brownDark2 p-4">
                        <h3>Pagamento Seguro</h3>
                        <h5>Pague online ou no local com tranquilidade.</h5>
                    </div>
                </div>
            </Row>
        </>
    )
}