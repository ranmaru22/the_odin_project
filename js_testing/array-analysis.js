export default function analyze(arr) {
    if (arr.length === 0) {
        throw new Error("empty array!");
    } else if (arr.some(x => isNaN(Number(x)))) {
        throw new Error("array contains non-numeric values!");
    }
    return {
        average: arr.reduce((acc, x) => acc + x) / arr.length,
        min: arr.reduce((min, x) => x < min ? x : min),
        max: arr.reduce((max, x) => x > max ? x : max),
        length: arr.length
    };
}