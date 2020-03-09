import fetch from '@/utils/fetch'

export const getDeviceByProjectId = (data) => fetch(`/device?project_id=${data}`, {}, 'GET')

export const getDeviceList = (page, rows) => fetch(`/device?page=${page}&rows=${rows}`)

export const getDeviceStatus = (projectCode) => fetch(`device/status/${projectCode}`, {}, 'GET')

export const addDevice = (data) => fetch(`/device`, data, 'POST')

export const editDevice = (data) => fetch('/device', data, 'PUT')

export const deleteDevice = (data) => fetch(`/device/${data}`, {}, 'DELETE')