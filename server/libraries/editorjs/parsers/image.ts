export function image(data, config) {
    const imageConditions = `${data.stretched ? 'img-fullwidth' : ''} ${
        data.withBorder ? 'img-border' : ''
    } ${data.withBackground ? 'img-bg' : ''}`;
    const imgClass = config.image.imgClass || '';
    let imageSrc;
    if (config.image.path === 'absolute') {
        imageSrc = data.file.url;
    } else {
        imageSrc = config.image.path.replace(
            /<(.+)>/,
            (match, p1) => data.file[p1]
        );
    }

    if (config.image.use === 'img') {
        return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}">`;
    } else if (config.image.use === 'figure') {
        const figureClass = config.image.figureClass || '';
        const figCapClass = config.image.figCapClass || '';

        return `<figure class="${figureClass}"><img class="${imgClass} ${imageConditions}" src="${imageSrc}" alt="${data.caption}"><figcaption class="${figCapClass}">${data.caption}</figcaption></figure>`;
    }
    return '';
}
