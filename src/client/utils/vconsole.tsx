import Vconsole from 'vconsole'

let vConsole = {}

const isMobile = () => {
  const ua = navigator.userAgent
  console.error(ua)
  return ua.indexOf('Android') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1
}

if (isMobile()) {
  vConsole = new Vconsole()
}

export default vConsole