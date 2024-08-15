export function paragraph(data, config) {
    return `<p class="${config.paragraph.pClass}"> ${data.text} </p>`;
}
