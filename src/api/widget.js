import fetch from '@/utils/fetch'

export const getWidgetByProjectId = (id) => fetch(`project/info/${id}`, {}, 'GET')

export const getWidgetByCode = (projectId, code) => fetch(`widget/code/${projectId}/${code}`, {}, 'GET')

export const checkWidgetExistByCode = (projectId, code) => fetch(`widget/check/${projectId}/${code}`, {}, 'GET')

export const addWidget = (id, data) => fetch(`/widget/${id}`, data, 'POST')

export const editWidget = (data) => fetch('/widget', data, 'PUT')

export const editWidgets = (data) => fetch('/project/widgets', data, 'PUT')

export const deleteWidget = (data) => fetch(`/widget/${data}`, {}, 'DELETE')

export const runWidget = (data) => fetch(`/widget/run/${data}`, {}, 'GET')

export const stopWidget = (data) => fetch(`/widget/stop/${data}`, {}, 'GET')

export const getWidgetCommand = (projectCode, widgetCode, key) => fetch(`widget/cmd/${projectCode}/${widgetCode}/${key}`, {}, 'GET', {}, false)
