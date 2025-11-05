function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

export async function hashData(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return bufferToHex(hashBuffer);
}

export function generateSalt() {
    const saltArray = new Uint8Array(16);
    crypto.getRandomValues(saltArray);
    return bufferToHex(saltArray);
}