import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps<T> {
    items: T[];
    filterKey: keyof T;
    displayKey?: keyof T;
    placeholder?: string;
    onClickPlaceholder?: string;
    onSelect?: (value: string, item: T) => void;
}

export function DropdownCodigoItem<T>({
    items,
    filterKey,
    displayKey,
    placeholder = "Selecione",
    onClickPlaceholder,
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

            <div className={`
                border border-neutral/20 bg-white
                ${isOpen ? "rounded-t-lg rounded-b-none" : "delay-300 rounded-lg"}
            `}>

                <div className="relative">
                    <input
                        value={isOpen ? search : selected}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setIsOpen(prev => !prev)}
                        placeholder={isOpen ? onClickPlaceholder : placeholder}
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

                <div
                    className={`    
                        overflow-hidden
                        transition-[max-height] duration-300 ease-in-out 
                        absolute left-0 right-0 z-20
                        ${isOpen
                            ? "max-h-40 bg-white border border-neutral/20 border-t-0 rounded-b-lg"
                            : "max-h-0"
                        }
                    `}
                >
                    <div className="max-h-40 overflow-y-auto">
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
                </div>
            </div>
        </div>
    );
}