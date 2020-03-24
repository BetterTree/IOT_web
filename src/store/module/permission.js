const permission = {
    state: {
        menus: JSON.parse(sessionStorage.getItem('menus')) || [],
        buttons: JSON.parse(sessionStorage.getItem('buttons')) || []
    },
    mutations: {
        SET_MENUS(state, menus) {
            state.menus = menus
            sessionStorage.setItem('menus', JSON.stringify(menus))
        },
        SET_BUTTONS(state, buttons) {
            state.buttons = buttons
            sessionStorage.setItem('buttons', JSON.stringify(buttons))
        }
    },
    actions: {}
}

export default permission