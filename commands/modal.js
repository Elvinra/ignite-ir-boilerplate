// @cliDescription  Generates an opinionated container.

const patterns = require('../lib/patterns')

module.exports = async function (context) {
  // grab some features
  const { parameters, print, strings, ignite, filesystem } = context
  const { pascalCase, isBlank } = strings
  const config = ignite.loadIgniteConfig()

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate modal <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const modalName = name.endsWith('Modal') ? name : `${name}Modal`
  const props = { name: modalName }

  const jobs = [
    {
      template: `modal.ejs`,
      target: `App/Modals/${modalName}.js`
    },
    {
      template: `modal-style.ejs`,
      target: `App/Modals/Styles/${modalName}Style.js`
    }
  ]

  // make the templates
  await ignite.copyBatch(context, jobs, props)

  // if using `react-navigation` go the extra step
  // and insert the screen into the nav router
  if (config.navigation === 'react-navigation') {
    const appNavFilePath = `${process.cwd()}/App/Navigation/AppNavigation.js`
    const importToAdd = `import ${modalName} from '../Modals/${modalName}'`
    const routeToAdd = `  ${modalName}: { screen: ${modalName} },`

    if (!filesystem.exists(appNavFilePath)) {
      const msg = `No '${appNavFilePath}' file found.  Can't insert screen.`
      print.error(msg)
      process.exit(1)
    }

    // insert screen import
    ignite.patchInFile(appNavFilePath, {
      after: patterns[patterns.constants.PATTERN_IMPORTS_MODALS],
      insert: importToAdd
    })

    // insert screen route
    ignite.patchInFile(appNavFilePath, {
      after: patterns[patterns.constants.PATTERN_ROUTES],
      insert: routeToAdd
    })
  } else {
    print.info(`Modals ${modalName} created, manually add it to your navigation`)
  }
}
