// 向本地储存放放入token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
// 读取本地token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}
// 删除本地token
export const delToken = () => [
    localStorage.removeItem('TOKEN')
]