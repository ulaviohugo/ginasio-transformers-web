import { useAthletes } from "@/presentation/hooks";
import { NumberUtils } from "@/utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IconClose, IconHome, IconPhone, IconUser } from "../icons";

type HandleOpenCardProps = {
    show: boolean
    onClose?: () => void
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function HandleOpenCard ({show,onClose, size = 'xl'}:HandleOpenCardProps){
    const [searchValue, setSearchValue] = useState("");
    const athletes = useSelector(useAthletes());
    const [open, setOpen] = useState(show)
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
        setOpen(false)
    }
    if (!open) return <></>

    const w: any = {
        sm: 'max-w-lg',
        md: 'max-w-2xl',
        lg: 'max-w-5xl',
        xl: 'max-w-7xl',
        full: 'max-w-full'
    }

    // Função para filtrar os atletas com base na pesquisa
    const filteredAthletes = athletes.filter(athlete =>
        athlete.id.toString().includes(searchValue) ||
        athlete.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        athlete.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-1/2">
                <div className={`relative flex flex-col bg-white p-5 mx-5 rounded-lg w-full ${w[size]}`} style={{maxHeight: "90vh"}}>
                    <button
                        className="absolute right-2 top-2 group"
                        onClick={handleClose}
                        title="Fechar janela"
                    >
                        <IconClose
                            size={24}
                            className="group-hover:scale-150 transition-all duration-100 ease-in"
                        />
                    </button>
                    <div className="font-semibold">Cartão do Atleta</div>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Pesquisar por ID, e-mail ou nome do atleta"
                        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <ul className="grid lg:grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                        {filteredAthletes.map((athlete) => (
                            <li key={athlete.id} className="p-4 shadow">
                                <div className="flex items-center gap-1 mb-3">
                                    {athlete.photo ? (
                                        <img
                                            src={athlete.photo}
                                            alt={`Foto de perfil`}
                                            width={50}
                                            height={50}
                                            className="rounded-full object-cover aspect-square"
                                        />
                                    ) : (
                                        <IconUser size={50} />
                                    )}
                                    <div>
                                        <div className="font-semibold">{athlete.name}</div>
                                        <div className="flex items-center gap-1 text-sm font-normal">
                                            <IconPhone /> {NumberUtils.format(athlete.phone)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <IconHome /> E-mail:{' '}
                                    {athlete.email}
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <IconHome /> Endereço{' '}
                                    {athlete.address}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
