"use client";
import React, { useEffect, useState } from "react";

interface DataInputProps {
    value?: string;
    onChange?: (value: string) => void;
}

// Função para converter dd/mm/aaaa para YYYY-MM-DD (formato do input date)
function formatDateForInput(dateStr: string): string {
    if (!dateStr || dateStr.length !== 10) return "";
    const [dia, mes, ano] = dateStr.split("/");
    if (!dia || !mes || !ano) return "";
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

// Função para converter YYYY-MM-DD para dd/mm/aaaa
function formatDateFromInput(dateStr: string): string {
    if (!dateStr) return "";
    const [ano, mes, dia] = dateStr.split("-");
    if (!dia || !mes || !ano) return "";
    return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
}

export default function DataInput({ value = "", onChange }: DataInputProps) {
    const [internalValue, setInternalValue] = useState(value);
    const [dateInputValue, setDateInputValue] = useState(formatDateForInput(value));
    const [erro, setErro] = useState(false);

    const dateRegex =
        /^(?:(?:31\/(?:0?[13578]|1[02]))|(?:30\/(?:0?[13-9]|1[0-2]))|(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2])|(?:29\/02\/(?:[02468][048]00|[13579][26]00|[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))))\/(?:19|20)\d{2}$/;

    // Handler para o input de texto (mantém compatibilidade)
    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value.replace(/\D/g, "");

        if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
        if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5, 9);

        setInternalValue(val);
        
        // Atualizar o input date também
        const dateFormatted = formatDateForInput(val);
        setDateInputValue(dateFormatted);

        if (onChange) onChange(val);

        if (val.length === 10) {
            setErro(!dateRegex.test(val));
        } else {
            setErro(false);
        }
    }

    // Handler para o input date (calendário)
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        const dateValue = e.target.value;
        setDateInputValue(dateValue);
        
        if (dateValue) {
            const formatted = formatDateFromInput(dateValue);
            setInternalValue(formatted);
            if (onChange) onChange(formatted);
            setErro(false);
        } else {
            setInternalValue("");
            if (onChange) onChange("");
        }
    }

    useEffect(() => {
        setInternalValue(value);
        setDateInputValue(formatDateForInput(value));
    }, [value]);

    return (
        <div className="flex flex-col w-full">
            <div className="relative">
                <input
                    type="text"
                    maxLength={10}
                    value={internalValue}
                    onChange={handleTextChange}
                    placeholder="dd/mm/aaaa"
                    className={`
                        w-full border rounded-xl px-4 py-3 pr-12
                        text-neutral outline-none transition
                        bg-white
                        ${erro ? "border-error" : "border-neutral focus:border-title"}
                    `}
                />
                {/* Input date invisível cobrindo toda a área para o calendário aparecer no lugar certo */}
                <input
                    type="date"
                    value={dateInputValue}
                    onChange={handleDateChange}
                    className="
                        absolute left-0 top-0 h-full w-full
                        opacity-0 cursor-pointer
                        border-none outline-none
                        z-10
                    "
                    title="Clique para abrir o calendário"
                />
                {/* Ícone de calendário */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <svg 
                        className="w-5 h-5 text-title/60" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                    </svg>
                </div>
            </div>

            {erro && (
                <span className="text-error mt-1 text-sm">
                    Data inválida. Verifique o dia, mês e ano.
                </span>
            )}
        </div>
    );
}
