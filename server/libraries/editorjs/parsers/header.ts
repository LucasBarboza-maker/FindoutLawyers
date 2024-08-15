export function header(data) {
    return `<h${data.level}>${data.text}</h${data.level}>`;
}
