export function formatPhone(phone?: string) {
    if (!phone) return "-";

    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return phone;
}

export function formatCEP(cep?: string) {
    if (!cep) return "-";
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length === 8) {
        return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return cep;
}

export function unformatPhone(phone?: string): string {
    if (!phone) return "";
    return phone.replace(/\D/g, "");
}

export function unformatCEP(cep?: string): string {
    if (!cep) return "";
    return cep.replace(/\D/g, "");
}