/*
:--------------------------------------------------------------------------
: Bootstrap
: replace variables as {{name}} to values;
:--------------------------------------------------------------------------
*/

function sanitizeVariableKey(key: string): string {
    let value = key.replace(/(\{)/gm, '\\{');
    value = value.replace(/(\})/gm, '\\}');
    return value;
}

export async function UtilsEmailTemplateReplacer(
    content: string,
    variables: Record<string, string>
): Promise<string> {
    let text: string = content;

    Object.keys(variables).map((key) => {
        const element = variables[key];
        let sanitizeKey = sanitizeVariableKey(key);
        const rule = new RegExp(`(${sanitizeKey})`, 'gum');
        text = text.replace(rule, element);
    });

    return text;
}
