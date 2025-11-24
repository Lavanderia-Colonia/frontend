import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps<T> {
    items: T[];
    filterKey: keyof T;
    displayKey?: keyof T;
    placeholder?: string;
    onSelect?: (value: string, item: T) => void;
}

export function DropdownCodigoItem<T>({
    items,
    filterKey,
    displayKey,
    placeholder = "Selecione",
    onSelect
}: DropdownProps<T>) {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("");

    const usedDisplay = displayKey ?? filterKey;
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems = items.filter((item) =>
        String(item[filterKey]).toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (item: T) => {
        const value = String(item[usedDisplay]);
        setSelected(value);
        setSearch("");
        setIsOpen(false);
        onSelect?.(value, item);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);


    return (
        <div className="relative w-full" ref={containerRef}>

            <div
                className={`
                    border border-neutral/20 rounded-lg bg-white 
                    transition-all duration-200 ease-in-out overflow-hidden
                    ${isOpen ? "max-h-64" : "max-h-10"}
                `}
            >

                <div className="relative">
                    <input
                        autoFocus={isOpen}
                        value={isOpen ? search : selected}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setIsOpen(true)}
                        placeholder={placeholder}
                        className="
                            w-full py-2 pl-3 pr-10 text-sm text-neutral
                            focus:outline-none
                        "
                    />

                    {isOpen && (
                        <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-title/60 w-5 h-5" />
                    )}

                    <FontAwesomeIcon
                        icon={isOpen ? faCaretUp : faCaretDown}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-title"
                    />
                </div>

                {isOpen && (
                    <div className="max-h-40 overflow-auto border-t border-neutral/10">

                        {filteredItems.length === 0 && (
                            <p className="p-2 text-sm text-neutral/50">
                                Nenhum item encontrado
                            </p>
                        )}

                        {filteredItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(item)}
                                className="
                                    px-3 py-2 text-sm text-neutral cursor-pointer 
                                    hover:bg-neutral/10
                                "
                            >
                                {String(item[usedDisplay])}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}