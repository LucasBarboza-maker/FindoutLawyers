export function objectToQuerystring(obj: object) {
    return (
        '?' +
        Object.keys(obj)
            .map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(
                    obj[key]
                )}`;
            })
            .join('&')
    );
}
