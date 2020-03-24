import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })



const LOGIN_PAGE_NAME = 'login'
const WHITE_LIST = ['forgetPwd', 'regeister']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta) {
        //  document.title = to.meta.title || to.name
    }
    let data = JSON.parse(window.sessionStorage.getItem('user'))
    if (!data && to.name !== LOGIN_PAGE_NAME && !WHITE_LIST.includes(to.name)) {
        next({ name: LOGIN_PAGE_NAME })
    } else {
        if (to.path) {
            next()
        } else {
            next({ name: '404' })
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})