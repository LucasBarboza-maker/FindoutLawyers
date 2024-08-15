export function table(data, config) {
    const rows = data.content.map((row) => {
        return `<tr>${row.reduce(
            (acc, cell) => acc + `<td>${cell}</td>`,
            ''
        )}</tr>`;
    });
    return `<table><tbody>${rows.join('')}</tbody></table>`;
}
