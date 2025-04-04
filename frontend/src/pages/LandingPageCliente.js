import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function LandingPageCliente() {
    return (
        <div className="border-round-xl" style={{ background: 'linear-gradient(to bottom, var(--brownLight2) 1%, transparent 100%)' }}>
            <Row
                className="mb-0 h-screen text-brownMedium1 m-0 gap-2 flex flex-column justify-content-center align-items-center text-center w-12">
                <h1 className="m-0 font-bold">Encontre Profissionais de Beleza e Bem-Estar com Facilidade</h1>
                <h3 className="m-0 font-medium">A plataforma que coloca você no centro do cuidado e da conveniência</h3>
                <h5 className=" opacity-70 mb-3">Procurando um cabeleireiro, manicure, massagista ou esteticista?<br />Nossa plataforma conecta você aos melhores profissionais perto de você!</h5>
                <a href="/Cadastro" className="w-9 no-underline flex align-items-center justify-content-center">
                    <button type="button" className="border-round-xl border-none py-2 text-lg font-medium w-2 text-white bg-brownDark1-hover bg-brownMedium1"> Experimente agora! </button>
                </a>
            </Row>
            <Row className="border-round-2xl relative h-screen mt-0 text-brownMedium1 mx-3 gap-6 flex flex-column justify-content-center align-items-center text-center ">

                <div className="flex flex-column  align-items-center justify-content-center">
                    <p className="shadow-2 font-bold w-2 my-2 text-center py-1 border-round-3xl border-brownMedium1 border-2 border-dashed">Por que usar nossa plataforma?</p>
                    <h1>Conheça os nossos recursos e diferenciais.</h1>
                </div>
                <div className="flex z-1 gap-2 justify-content-between text-brownDark1 align-items-center">
                    <div className="flex flex-column bg-blur1 border-2 border-brownMedium1  border-round-3xl py-7 px-3 w-3 h-full">
                        <h3>Agendamento Fácil</h3>
                        <h5>Escolha o serviço, horário e profissional em poucos cliques.</h5>
                    </div >

                    <div className="flex flex-column border-2  border-brownMedium1 bg-blur1 border-round-3xl py-7 px-3 w-3 h-full">
                        <h3>Profissionais Qualificados</h3>
                        <h5>Veja avaliações e escolha o melhor para você.</h5>
                    </div>

                    <div className="flex flex-column border-2 border-brownMedium1 bg-blur1 border-round-3xl py-7 px-3 w-3 h-full">
                        <h3>Lembretes Automáticos</h3>
                        <h5>Nunca mais esqueça um agendamento.</h5>
                    </div>

                    <div className="flex flex-column border-2 border-brownMedium1 bg-blur1 border-round-3xl py-7 px-3 w-3 h-full">
                        <h3>Pagamento Seguro</h3>
                        <h5>Pague online ou no local com tranquilidade.</h5>
                    </div>
                </div>
                <div className="h-20rem bg-brownDark1 border-round-2xl absolute" style={{ bottom: '13%', background: 'radial-gradient(circle, var(--brownLight2) 0%, var(--brownMedium1) 100%)' }}>

                </div>
            </Row>
            <Row className="border-round-2xl h-screen text-brownMedium1 mx-3 gap-4 flex  text-center  align-items-center">
                <div className="flex justify-content-center align-items-start">

                    <Col lg={2} className="text-left flex flex-column justify-content-center align-items-start">
                        <p className="shadow-2 font-bold w-6 my-2 text-center py-1 border-round-3xl border-brownMedium1 border-2 border-dashed">Como Funciona?</p>
                        <h2>Agendamento simples e fácil.</h2>
                    </Col>

                    <Col lg={8} className="flex gap-4 justify-content-end align-items-center">
                        <div className="flex flex-column justify-content-between border-brownMedium1 border-1 shadow-2  hover:shadow-6 border-round-3xl p-4 w-3 h-23rem">
                            <h1 className="text-right text-8xl">01</h1>
                            <div className="text-left">
                                <h2 className="font-bold">Escolha o serviço </h2>
                                <h5>  Busque por profissionais próximos à sua localização</h5>
                            </div>
                        </div >

                        <div className="flex flex-column justify-content-between border-brownMedium1 border-1 shadow-2 hover:shadow-6 border-round-3xl p-4 w-3 h-23rem">
                            <h1 className="text-right text-8xl">02</h1>
                            <div className="text-left">
                                <h2 className="font-bold">Agende online </h2>
                                <h5>  Selecione o melhor horário para você.</h5>
                            </div>
                        </div>

                        <div className="flex flex-column justify-content-between border-brownMedium1 border-1 shadow-2  hover:shadow-6 border-round-3xl p-4 w-3 h-23rem">
                            <h1 className="text-right text-8xl">03</h1>
                            <div className="text-left">
                                <h2 className="font-bold">Aproveite o atendimento </h2>
                                <h5>  Relaxe e aproveite seu serviço.</h5>
                            </div>
                        </div>
                    </Col>
                </div>
            </Row>

            <Row className="border-round-2xl m-3 bg-brownMedium1 text-white h-15rem flex justify-content-center align-items-center text-center">
                <h1 className="m-0">Ainda tem dúvidas?</h1>
                <h4> Entre em contato com nosso suporte pelo WhatsApp ou e-mail.
                </h4>
            </Row>
        </div>
    )
}