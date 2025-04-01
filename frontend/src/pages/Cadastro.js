import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { InputMask } from "primereact/inputmask";

// import imgCadastro from '../imagens/imgCadastro.svg';

const Cadastro = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        cpf: '',
        endereco: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
        tipoUser: 'Cliente',
    });

    const [errors, setErrors] = useState({
        senhaMatch: false,
        requiredFields: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors.requiredFields[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                requiredFields: {
                    ...prevErrors.requiredFields,
                    [name]: false
                }
            }));
        }

        if (name === 'confirmarSenha') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                senhaMatch: formData.senha !== value
            }));
        }
    };


    const validateFields = () => {
        const requiredFieldsByStep = {
            1: ['nome', 'email', 'sobrenome'],
            2: ['cpf', 'endereco', 'telefone'],
            3: ['tipoUser', 'senha', 'confirmarSenha']
        };
        const currentRequiredFields = requiredFieldsByStep[step];
        const newErrors = {};

        currentRequiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = true;
            }
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            requiredFields: newErrors
        }));

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields() || formData.senha !== formData.confirmarSenha || !acceptedTerms) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                senhaMatch: formData.senha !== formData.confirmarSenha
            }));
            setShowTermsError(!acceptedTerms);
            return;
        }

        try {
            await axios.post('http://localhost:3002/usuarios', formData);
            toast.current.show({
                severity: 'success',
                summary: 'Cadastro concluído com sucesso!',
                detail: <a href="/login">Ok</a>,
                life: 3000
            });
            setFormData({
                nome: '',
                sobrenome: '',
                email: '',
                cpf: '',
                endereco: '',
                telefone: '',
                senha: '',
                confirmarSenha: '',
                tipoUser: '',
            });
            setStep(1);
            navigate("/login");
        } catch (error) {
            console.error('Erro ao criar cadastro:', error);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    const nextStep = () => {
        if (validateFields()) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const handlePrivaciadeClick = () => {
        window.open(`/Privacidade`, '_blank');
    };

    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setFormData((prevData) => ({
            ...prevData,
            cpf: value
        }));
    };
    return (
        <Container className="cadastro h-screen align-items-center justify-content-center flex">
            <Toast ref={toast} />
            <Row >
                <Col>
                    <h2 className="text-brownMedium1 font-bold text-center">Criar conta</h2>
                    <p className="text-brownMedium1 font-medium opacity-70 text-center">Crie uma conta e tenha acesso a tudo no nosso site!</p>
                    <form onSubmit={handleSubmit} className="w-12 mt-4">

                        {step === 1 && (
                            <>
                                <Form.Group controlId="formnome" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.nome ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Nome</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="text"
                                        name="nome"
                                        placeholder="Coloque seu primeiro nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                    {errors.requiredFields.nome && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <Form.Group controlId="formsobrenome" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.sobrenome ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Sobrenome</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="text"
                                        name="sobrenome"
                                        placeholder="Coloque seu sobrenome"
                                        value={formData.sobrenome}
                                        onChange={handleChange}
                                    />
                                    {errors.requiredFields.sobrenome && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <Form.Group controlId="formemail" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.email ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Email</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="text"
                                        name="email"
                                        placeholder="Coloque seu email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.requiredFields.email && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Form.Group controlId="formcpf" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.cpf ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>CPF</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="text"
                                        name="cpf"
                                        placeholder="Coloque seu cpf"
                                        value={formData.cpf}
                                        onChange={handleCpfChange}
                                        maxLength="14"
                                    />
                                    {errors.requiredFields.cpf && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <Form.Group controlId="formendereco" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.endereco ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Endereço</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="text"
                                        name="endereco"
                                        placeholder="Coloque seu endereço"
                                        value={formData.endereco}
                                        onChange={handleChange}
                                    />
                                    {errors.requiredFields.endereco && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <Form.Group controlId="formtelefone" className="mb-3 relative flex flex-column">
                                    <label className={errors.requiredFields.telefone ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Telefone</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        className="shadow-none border-brownMedium1"
                                        style={{ padding: ' 0.35rem 0.7rem' }}
                                        type="text"
                                        name="telefone"
                                        placeholder="Coloque seu telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                    ></InputMask>
                                    {errors.requiredFields.telefone && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>


                            </>
                        )}

                        {step === 3 && (
                            <>
                                <Form.Group controlId="formSenha" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.senha ? 'text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Senha</label>
                                    <Form.Control
                                        className="shadow-none border-brownMedium1"
                                        type="password"
                                        name="senha"
                                        placeholder="Coloque sua senha"
                                        value={formData.senha}
                                        onChange={handleChange}
                                        maxLength="15"
                                    />
                                    {errors.requiredFields.senha && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <Form.Group controlId="formconfirmarSenha" className={errors.requiredFields.nome ? "relative" : 'mb-3 relative'}>
                                    <label className={errors.requiredFields.confirmarSenha ? ' text-brownMedium1 font-medium opacity-80' : 'text-brownMedium1 font-medium opacity-80'}>Confirmar senha</label>
                                    <Form.Control
                                        className={errors.senhaMatch || errors.requiredFields.confirmarSenha ? 'shadow-none border-brownMedium1' : 'shadow-none border-brownMedium1 '}
                                        type="password"
                                        name="confirmarSenha"
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmarSenha}
                                        onChange={handleChange}
                                        maxLength="15"
                                    />
                                    {errors.senhaMatch && <small className="text-red font-medium flex justify-content-end">As senhas não coincidem</small>}
                                    {errors.requiredFields.confirmarSenha && <small className="text-red font-medium flex justify-content-end">Campo obrigatório</small>}
                                </Form.Group>

                                <div className="cadastroTerms">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={() => {
                                            setAcceptedTerms(!acceptedTerms);
                                            setShowTermsError(false);
                                        }}
                                    />
                                    <span style={{ color: 'var(--black)' }}> Aceito os <Link onClick={handlePrivaciadeClick}>termos e condições.</Link></span> <br />
                                    {showTermsError && <small className="text-red font-medium flex justify-content-end">Você deve aceitar os termos</small>}
                                </div>

                            </>
                        )}
                        <div className="gap-2 flex mt-4">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="w-6 my-2 bg-brownMedium1 p-2 border-none border-round-lg text-white font-medium text-lg bg-brownMedium2-hover">Voltar</button>
                            )}

                            {step < 3 ? (
                                <button type="button" onClick={nextStep} className="w-12 my-2 bg-brownMedium1 p-2 border-none border-round-lg text-white font-medium text-lg bg-brownMedium2-hover">Próximo</button>
                            ) : (
                                <button type="submit" className="w-6 my-2 bg-brownMedium1 p-2 border-none border-round-lg text-white font-medium text-lg bg-brownMedium2-hover">Cadastrar</button>
                            )}

                        </div>
                    </form>

                    <div className="flex justify-content-center mt-3">
                        <p className="mr-2 text-brownMedium1 font-medium">Já possui uma conta?</p> 
                        <Link to="/login" className="text-brownMedium1 font-medium opacity-80">Faça Login</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cadastro;
