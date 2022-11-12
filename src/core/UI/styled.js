// import BG from './assets/BG.jpg'
import style from 'styled-components'
import {onlineGreen, onlineRed} from './colors'

export const PageWrapper = style.div`
  display: flex;
  width: 100%;
`

export const Cover = style.div`
  height: 100%;
  width: 100%;
  display: flex;
`

export const FocusedEffects = style.div`
  background-color: ${pr => pr.isFocused ? 'red' : 'green'};
`

export const TypeableFieldDimensions = style(FocusedEffects)`
  height: 80vh;
  width: 90vw;
  box-sizing: border-box;
`
// export const Background = style(Cover)`
//   background: url(${BG});
// `
export const Opacity = style(Cover)`
  background-color: rgba(0, 0, 0, ${pr => pr.isFocused ? '0.9' : '0.7'});
  opacity: ${pr => pr.isFocused};
`

export const OnlineMark = style.div`
  width: 20px;
  height: 20px;
  background-color: ${pr => {
    switch(pr.isOnline) {
      case false: return onlineRed
      case true: return onlineGreen
      default: return 'transparent'
    }
  }}
`

export const OnlineOuter = style.div`
  position: fixed;
  display: flex;
  right: 10px;
  top: 10px;
  align-item: center;
  z-index: 1;
`

export const OnlineMarkText = style.h3`
  margin: 0;
  margin-left: 10px;
`