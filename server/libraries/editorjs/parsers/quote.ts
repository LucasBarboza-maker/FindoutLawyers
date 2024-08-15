export function quote(data, config) {
    let alignment = '';
    if (config.quote.applyAlignment) {
        alignment = `style="text-align: ${data.alignment};"`;
    }
    return `<blockquote ${alignment}><p>${data.text}</p><cite>${data.caption}</cite></blockquote>`;
}
