import fetch from '@/utils/fetch'


export const login = (data) => fetch('/login', data, 'POST')

export const logout = () => fetch('/logout', {}, 'POST')
