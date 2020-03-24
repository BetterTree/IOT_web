import fetch from '@/utils/fetch'

export const getLoginUser = () => fetch(`/user/id`, {}, 'GET', {}, false)

export const getUserByUserId = (data) => fetch(`/login/userId/${data}`, {}, 'GET')

export const register = (data) => fetch(`/login/register`, data, 'POST')

export const editUser = (data) => fetch('/user', data, 'PUT')

export const isExistUser = (data) => fetch(`/login/checkUser/${data}`, {}, 'GET')

export const chgPwd = (data) => fetch(`/login/chgPwd`, data, 'PUT')