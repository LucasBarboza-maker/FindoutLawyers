export function list(data, config) {
    const type = data.style === 'ordered' ? 'ol' : 'ul';
    const items = data.items.reduce(
        (acc, item) => acc + `<li>${item}</li>`,
        ''
    );
    return `<${type}>${items}</${type}>`;
}
