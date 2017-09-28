import { StackNavigator } from 'react-navigation'

import PrimaryNav from './PrimaryNav'

import styles from './Styles/NavigationStyles'

function forVertical (props) {
  const { layout, position, scene } = props

  const index = scene.index
  const height = layout.initHeight

  const translateX = 0
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]),
    outputRange: ([height, 0, 0])
  })

  return {
    transform: [{ translateX }, { translateY }]
  }
}

// Manifest of possible screens
const AppNavigation = StackNavigator({
  PrimaryNav: { screen: PrimaryNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'PrimaryNav',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: {
    backgroundColor: 'transparent'
  },
  transitionConfig: () => ({ screenInterpolator: forVertical })
})

export default AppNavigation
