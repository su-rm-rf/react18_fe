import axios from 'axios'

export const instance1 = axios.create({
  baseURL: 'http://localhost:7570/wap_pc',
  withCredentials: true,
})
instance1.interceptors.request.use(config => {
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  return config
}, err => {
  return Promise.reject(err)
})
instance1.interceptors.response.use(res => {
  if (res.status != 200) return Promise.reject(res.data)
  handleAuthError(res.data.errCode)
  handleGeneralError(res.data.errCode, res.data.errMsg)
  return res
}, err => {
  handleNetworkError(err.response.status)
  return Promise.reject(err.response)
})

export const instance2 = axios.create({
  baseURL: 'http://localhost:7570/admin',
  withCredentials: true,
})
instance2.interceptors.request.use(config => {
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  return config
}, err => {
  return Promise.reject(err)
})
instance2.interceptors.response.use(res => {
  if (res.status != 200) return Promise.reject(res.data)
  handleAuthError(res.data.errCode)
  handleGeneralError(res.data.errCode, res.data.errMsg)
  return res
}, err => {
  handleNetworkError(err.response.status)
  return Promise.reject(err.response)
})


const handleChangeRequestHeader = (config) => {
  // config.headers['xxxx'] = 'xxx'
  return config
}

const handleConfigureAuth = (config) => {
  config.headers['token'] = localStorage.getItem('token') || ''
  return config
}
const authErrMap: any = {
  10031: '登录失效，需要重新登录', // token 失效
  10032: '您太久没登录，请重新登录~', // token 过期
  10033: '账户未绑定角色，请联系管理员绑定角色',
  10034: '该用户未注册，请联系管理员注册用户',
  10035: 'code无法获取对应第三方平台用户',
  10036: '该账户未关联员工，请联系管理员做关联',
  10037: '账号已无效',
  10038: '账号未找到',
}
const networkErrMap: any = {
  400: '错误的请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'HTTP版本不支持该请求',
}

const handleAuthError = (errCode): boolean => {
	if (authErrMap.hasOwnProperty(errCode)) {
		console.error(authErrMap[errCode])
		// 授权错误，登出账户
		// postSignout()
		return false
	}

	return true
}
const handleGeneralError = (errCode: number, errMsg: string): boolean => {
	if (errCode !== 200) {
		console.error(errMsg)
		return false
	}
	return true
}
const handleNetworkError = (errStatus?: number): void => {
  let errMessage = ''
  if (errStatus) {
    errMessage = networkErrMap[errStatus] ?? `其他连接错误 -- ${errStatus}`
  } else {
    errMessage = `无法连接到服务器！`
  }
  console.error(errMessage)
}