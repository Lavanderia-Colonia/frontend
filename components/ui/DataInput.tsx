"use client";
import React, { useState } from "react";

export default function DataInput() {
    const [value, setValue] = useState("");
    const [erro, setErro] = useState(false);

    const dateRegex =
        /^(?:(?:31\/(?:0?[13578]|1[02]))|(?:30\/(?:0?[13-9]|1[0-2]))|(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2])|(?:29\/02\/(?:[02468][048]00|[13579][26]00|[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))))\/(?:19|20)\d{2}$/;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value.replace(/\D/g, "");

        if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
        if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5, 9);

        setValue(val);

        if (val.length === 10) {
            setErro(!dateRegex.test(val));
        } else {
            setErro(false);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <input
                type="text"
                maxLength={10}
                value={value}
                onChange={handleChange}
                placeholder="dd/mm/aaaa"
                className={`
                    w-full border rounded-xl px-4 py-3 
                    text-neutral outline-none transition
                    ${erro ? "border-red-500" : "border-gray-300 focus:border-title"}
                `}
            />

            {erro && (
                <span className="text-red-500 mt-1 text-sm">
                    Data inválida. Verifique o dia, mês e ano.
                </span>
            )}
        </div>
    );
}
