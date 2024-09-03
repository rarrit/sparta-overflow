export const removeMarkdown = (text) => {
  return text.replace(/[*_~`#>]/g, '');
}