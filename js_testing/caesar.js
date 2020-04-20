export function encode(str) {
    return str.split("")
        .map(c => c.charCodeAt(0))
        .map(c => {
            if (c >= 65 && c <= 89 || c >= 97 && c <= 121) {
                return c + 1;
            } else if (c === 90) {
                return 65;
            } else if (c === 122) {
                return 97;
            }
            return c;
        })
        .map(c => String.fromCharCode(c))
        .join("");
}

export function decode(str) {
    return str.split("")
        .map(c => c.charCodeAt(0))
        .map(c => {
            if (c >= 66 && c <= 90 || c >= 98 && c <= 122) {
                return c - 1;
            } else if (c === 65) {
                return 90;
            } else if (c === 97) {
                return 122;
            }
            return c;
        })
        .map(c => String.fromCharCode(c))
        .join("");
}