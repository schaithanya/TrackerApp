export function enumToArray(enumObj) {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}