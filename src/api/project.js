import fetch from '@/utils/fetch'

export const getProjectById = (data) => fetch(`/project/${data}`, {}, 'GET')

export const getProjectList = (page, rows, name) => fetch(`/project?page=${page}&rows=${rows}&name=${name}`)

export const addProject = (data) => fetch(`/project`, data, 'POST')

export const editProject = (data) => fetch('/project', data, 'PUT')

export const deleteProject = (data) => fetch(`/project/${data}`, {}, 'DELETE')

export const getCode = () => fetch('/code', {}, 'GET')

export const runProject = (data) => fetch(`/project/run/${data}`, {}, 'GET')

export const stopProject = (data) => fetch(`/project/stop/${data}`, {}, 'GET')
