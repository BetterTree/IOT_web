/**正则表达式 */

/**手机*/
export const phoneReg = /^1[3|4|5|7|8|9][0-9]\d{8}$/

/**邮编*/
export const postCode = /^[0-9][0-9]{5}$/

export const dateReg = /^[1-2]\\d{3}-(0?[1-9]||1[0-2])-(0?[1-9]||[1-2][1-9]||3[0-1])$/

/**数字*/
export const numberReg = /^(\d+)$/

export const userName = /^[0-9A-Za-z]{4,29}$/

/**Id */
export const IdReg = /[A-Z][0-9]/

function required(data = '必须输入', trigger = 'blur') {
    return [{
        required: true,
        trigger,
        message: data
    }]
}

function min(min = 6, type = '密码') {
    return [{
        min: min,
        message: `${type}长度不小于${min}位`,
        trigger: 'blur'
    }]
}

function pattern(reg, message, trigger = 'blur') {
    return [{
        pattern: reg,
        message: message,
        trigger: trigger
    }]
}


/**必填 */
export const requiredInput = (data, trigger) => {
    return required(data, trigger)
}


/**
 * 验证手机号
 */
export const phone = () => {
    var valid = required('请输入手机号')
        //测试期间注释本句代码
        //valid = valid.concat(pattern(phoneReg, '手机号格式不正确'))
    return valid
}

/**
 * 必填数字
 */
export const isNumberRequire = (type = '价格', msg = '请输入正确的数字格式') => {
    var valid = required(`${type}不能为空`)
    valid = valid.concat([{
        type: 'number',
        trigger: 'change',
        message: msg,
        transform(value) {
            return Number(value);
        }
    }])
    return valid
}

/**
 * 不必填数字
 */
export const isNumber = (msg = '请输入正确的数字格式') => {
    var valid = [{
        type: 'number',
        trigger: 'change',
        message: msg,
        transform(value) {
            return Number(value);
        }
    }]
    return valid
}

/**
 * 密码验证
 */
export const password = () => {
        var valid = required('请输入密码')
        valid = valid.concat(min());
        return valid
    }
    /**
     * @type {Array}
     */
    //请至少输入10个字，说明原因
export const reasonsInput = (min = 10, max = 250, ev = "blur") => [
    { required: true, message: `请填写至少${min}个字符`, trigger: ev },
    { min: min, message: `请填写至少${min}个字符`, trigger: "change" },
    { max: max, message: `字符不能超过${max}个`, trigger: "change" },
]

/**
 * @type {Array}
 */
//日期验证
export const dateInput = () => [
    { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
]

/**
 * @type {Array}
 */
//最多输入50字符
export const maxInput = (name, max = 50) => [
    { required: true, message: `${name}不能为空`, trigger: 'blur' },
    { max: max, message: `字符不能超过${max}个`, trigger: "change" },
]

/**
 * @type {Array}
 */
//验证坐在地区长度
export const validateArea = (rule, value, callback) => {
        if (value && value.length < 2) {
            callback(new Error('所在地区填写不完整'));
        } else {
            callback();
        }
    }
    /**
     * 验证手机号
     * @type {Array}
     */
export const phoneNumInput = [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: phoneReg, message: '手机号格式不正确', trigger: 'change' }
];
/**
 * 验证邮编
 * @type {Array}
 */
export const validatePostCode = [
    { required: true, message: '请输入邮编', trigger: 'change' },
    { pattern: /^[0-9][0-9]{5}$/, message: '邮编格式不正确', trigger: 'change' }
];
/**
 * 验证邮箱
 * @type {Array}
 */
export const mail = [
    { required: true, message: '邮箱不能为空', trigger: 'change' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
];

export const isUserName = () => {
    var valid = required('用户名不能为空')
    valid = valid.concat([
        { pattern: userName, message: '只能包含数字或字母,长度4-30位', trigger: 'blur' }
    ])
    return valid
}

export const ID = [
    { required: true, message: 'ID不能为空', trigger: 'change' },
    { pattern: IdReg, message: 'ID格式有误', trigger: 'change' }
];