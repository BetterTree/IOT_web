import fetch from '@/utils/fetch'

export const getMessageCount = (data) => fetch('/activity/getNeedApprovalNum', data, 'GET', {}, false)
