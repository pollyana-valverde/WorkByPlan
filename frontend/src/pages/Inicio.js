import React from "react";

export default function Inicio() {
    return (
        <div className="flex flex-column bg-white justify-content-center align-items-center z-5 absolute left-0 right-0 top-0 bottom-0 gap-2">
            <h1 className="text-brownMedium1 ">O que você é?</h1>
            <div className="flex gap-2 align-items-center w-12 justify-content-center">
                <a href="/LandingPageCliente" className="w-1">
                    <button className=" w-12 bg-brownMedium1 text-white border-brownMedium1 border-round-xl px-4 py-1 font-medium text-lg bg-brownDark1-hover" type="button" style={{ border: '2px solid ' }}>Cliente</button>
                </a>
                <a href="/LandingPageProfissional" className="w-1">
                    <button className="w-12 border-brownMedium1 border-round-xl bg-white font-medium text-lg px-4 py-1 bg-whiteSmoke-hover text-brownMedium1" style={{ border: '2px solid ' }} type="button">Profissonal</button>
                </a>
            </div>
        </div>
    )
}