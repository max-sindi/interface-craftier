import colorAlpha from 'color-alpha'

export const generateColor = (deepLevel = 1, indexInLevel = 1, c = 1) => {
  // const args = [a, b, c],
  // console.log(['#0E292A', '#29547A', '#1D584F', '#172845', '#7A292A', '#541C34', '#1B504F'][a])
  return ['#364', '#29547A', '#1D584F', '#172845', '#7A292A', '#541C34', '#1B504F', '#BF75D1', '#C75798',
    '#A1365F', '#7A2941', '#4D192C'
  ][deepLevel] || "#289" // if it's too deep

  // return `rgba(${  color()  })`

  // function color() {
  //   return new Array(3)
  //     .fill(255)
  //     .map((val, i) =>
  //     // abs for 2x range increasing
  //       Math.abs(
  //         val - (args[i] * 20))
  //       )
  //     .join(', ')
  // }
}

// export const transparentColor = (color, transparency = '99') => '#' + color.split('#').join(transparency)
export const transparentColor = (color) => colorAlpha(color, .9)