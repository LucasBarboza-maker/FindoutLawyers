export const sanitizeHtml = function (markup) {
   markup = markup.replace(/&/g, '&amp;');
   markup = markup.replace(/</g, '&lt;');
   markup = markup.replace(/>/g, '&gt;');
   return markup;
};
export function FilenameSaveFormat(str: string): string {
   const sanitized = str
      .replace(/[\/\?<>\\:\*\|":]/g, '')
      .replace(/[\x00-\x1f\x80-\x9f]/g, '')
      .replace(/^\.+$/, '')
      .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, '')
      .replace(/\s/gim, '_');
   return sanitized.split('').splice(0, 255).join('');
}
