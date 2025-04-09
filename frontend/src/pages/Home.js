import React from "react";
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
    const [servicos, setServicos] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [itensFiltradosServicos, setItensFiltradosServicos] = useState([]);
    const [itensFiltradosEmpresa, setItensFiltradosEmpresa] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState("");
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        fetch('http://localhost:3002/servicos')
            .then((res) => res.json())
            .then((data) => {
                setServicos(data);
                setItensFiltradosServicos(data); // mostrar todos no início
            });
        fetch('http://localhost:3002/perfilEmpresa')
            .then((res) => res.json())
            .then((data) => {
                setEmpresa(data);
                setItensFiltradosServicos(data); // mostrar todos no início
            });

        setTipoSelecionado("");
    }, []);


    const handleServico = () => {
        fetch('http://localhost:3002/servicos')
            .then((res) => res.json())
            .then((data) => {
                setServicos(data);
                setItensFiltradosServicos(data); // mostrar todos no início
            });
        setTipoSelecionado("servicos");
    }

    const handleEmpresa = () => {
        fetch('http://localhost:3002/perfilEmpresa')
            .then((res) => res.json())
            .then((data) => {
                setEmpresa(data);
                setItensFiltradosEmpresa(data); // mostrar todos no início
            });
        setTipoSelecionado("empresa");
    }

    const handleFiltro = (e) => {
        const valor = e.target.value.toLowerCase();
        setFiltro(valor);

        if (tipoSelecionado === "servicos") {
            const filtrados = servicos.filter((servico) =>
                servico.nomeServico?.toLowerCase().includes(valor)
            );
            setItensFiltradosServicos(filtrados);
        } else if (tipoSelecionado === "empresa") {
            const filtrados = empresa.filter((empresa) =>
                empresa.nomeFantasia?.toLowerCase().includes(valor)
            );
            setItensFiltradosEmpresa(filtrados);
        } else {
            const filtradosServico = servicos.filter((servico) =>
                servico.nomeServico.toLowerCase().includes(valor)
            );

            const filtradosEmpresa = empresa.filter((empresa) =>
                empresa.nomeFantasia.toLowerCase().includes(valor)
            );

            setItensFiltradosServicos(filtradosServico);
            setItensFiltradosEmpresa(filtradosEmpresa);
        }
    };

    // const handleServicoClick = (servico) => {
    //     navigate(`/servico/${servico.idUsuarioEditavel}`, { state: servico });
    // };

    return (
        <Container>
            <Row className="h-screen flex gap-2 text-center text-brownMedium1 flex-column justify-content-center align-items-center">
                <h1>O que está procurando?</h1>
                <Form.Group controlId="formemail" className="mb-3 relative">
                    <Form.Control
                        className="text-lg shadow-none border-round-3xl p-2 px-3 border-2 border-brownMedium1"
                        type="text"
                        name="email"
                        placeholder="Qual serviço procura?"
                        value={filtro}
                        onChange={handleFiltro}
                    />
                </Form.Group>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleServico}
                        className={`border-brownMedium1 text-brownMedium1 border-2 border-round-2xl py-1 px-3 text-lg font-medium ${tipoSelecionado == 'servicos' ? 'bg-brownMedium1 text-white' : 'bg-transparent'}`}>Serviços</button>
                    <button
                        type="button"
                        onClick={handleEmpresa}
                        className={`border-brownMedium1 text-brownMedium1 border-2 border-round-2xl py-1 px-3 text-lg font-medium ${tipoSelecionado == 'empresa' ? 'bg-brownMedium1 text-white' : 'bg-transparent'}`}>Empresas</button>

                </div>

                <div>
                    {itensFiltradosServicos.length > 0 && tipoSelecionado == "" ? (
                        <>
                            {itensFiltradosServicos.map((servico, index) => {
                                return (
                                    <p>{servico.nomeServico}</p>
                                )
                            })}

                            {itensFiltradosEmpresa.map((empresa, index) => {
                                return (
                                    <p>{empresa.nomeFantasia}</p>
                                )
                            })}

                        </>
                    ) : (<></>)}
                </div>

                <div>
                    {itensFiltradosServicos.length > 0 && tipoSelecionado == 'servicos' ? (
                        itensFiltradosServicos.map((servico, index) => {
                            return (
                                <p>{servico.nomeServico}</p>
                            )
                        })
                    ) : (<></>)}
                </div>

                <div>
                    {itensFiltradosEmpresa.length > 0 && tipoSelecionado == 'empresa' ? (
                        itensFiltradosEmpresa.map((empresa, index) => {
                            return (
                                <p>{empresa.nomeFantasia}</p>
                            )
                        })
                    ) : (<></>)}
                </div>
            </Row>
        </Container>
    )
}