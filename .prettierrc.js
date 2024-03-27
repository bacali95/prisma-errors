module.exports = {
  printWidth: 100,
  singleQuote: true,
  importOrder: ['@prisma-errors/(core|nest)', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
