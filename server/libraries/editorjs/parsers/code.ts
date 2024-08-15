import { UtilsString } from '@/libraries/utils';

export function code(data, config) {
    const markup = UtilsString.sanitizeHtml(data.code);
    return `<pre><code class="${config.code.codeBlockClass}">${markup}</code></pre>`;
}
