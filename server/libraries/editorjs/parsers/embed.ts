export function embed(data, config) {
    if (config.embed.useProvidedLength) {
        data.length = `width="${data.width}" height="${data.height}"`;
    } else {
        data.length = '';
    }
    const regex = new RegExp(/<%data\.(.+?)%>/, 'gm');
    if (config.embedMarkups[data.service]) {
        return config.embedMarkups[data.service].replace(
            regex,
            (match, p1) => data[p1]
        );
    } else {
        return config.embedMarkups['defaultMarkup'].replace(
            regex,
            (match, p1) => data[p1]
        );
    }
}
