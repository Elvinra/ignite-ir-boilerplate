const constants = {
  PATTERN_IMPORTS: 'imports',
  PATTERN_ROUTES: 'routes',
  PATTERN_IMPORTS_MODALS: 'importsModals'
}

module.exports = {
  constants,
  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+'react-navigation';?`,
  [constants.PATTERN_ROUTES]: 'const PrimaryNav',
  [constants.PATTERN_IMPORTS_MODALS]: 'const AppNavigation'
}
