export const question = [{
        value: 1,
        label: '你的生日是'
    },
    {
        value: 2,
        label: '你最喜欢的歌曲是'
    },
    {
        value: 3,
        label: '你最喜欢的体育运动是'
    }
]

export const widgetTypes = [{
        title: '数值显示',
        type: 0,
        icon: "icon-value",
        alias: '数值',
        color: '#F4BF1F',
        children: [{
                title: '土壤湿度',
                type: '16777217',
                unit: '%'
            },
            {
                title: '水温传感器',
                type: '16777218',
                unit: '℃'
            },
            {
                title: '温湿度传感器',
                type: '16777219',
                unit: ['℃', '%']
            }, {
                title: '声音传感器',
                type: '16777220',
                unit: 'dB'
            }, {
                title: '光敏传感器',
                type: '16777221',
                unit: 'lm'
            }, {
                title: '超声波模块',
                type: '16777222',
                unit: 'cm'
            }, {
                title: 'RFID传感器',
                type: '16777223'
            }, {
                title: '电位计',
                type: '16777224',
                unit: ['mV', 'V']
            }, {
                title: '脉搏传感器',
                type: '16777225',
                unit: '次/分'
            }, {
                title: '陀螺仪',
                type: '16777226'
            }, {
                title: '摇杆',
                type: '16777227'
            }, {
                title: '自定义',
                type: '16777216',
                unit: '%'
            }
        ]
    },
    {

        title: '布尔显示',
        type: 1,
        icon: "icon-boolean",
        alias: '布尔',
        color: '#E65208',
        children: [{
                title: '火焰传感器',
                type: '33554433',
                folder: '1'
            },
            {
                title: '烟雾传感器',
                type: '33554434',
                folder: '2'
            }, {
                title: '触碰开关',
                type: '33554435',
                folder: '3'
            }, {
                title: '人体红外传感器',
                type: '33554436',
                folder: '4'
            }, {
                title: '雨滴传感器',
                type: '33554437',
                folder: '5'
            }, {
                title: '红外循迹传感器',
                prefix: '循',
                type: '33554438',
                folder: '6'
            }, {
                title: '红外避障传感器',
                prefix: '避',
                type: '33554439',
                folder: '7'
            }
        ]
    },
    {

        title: '时间显示',
        type: 2,
        icon: "icon-time",
        alias: '时间',
        color: '#88BD45',
        children: [{
            title: '时钟模块',
            type: '50331649'
        }]
    },
    {

        title: '开关控制',
        type: 3,
        icon: "icon-switch",
        alias: '开关',
        color: '#42BFED',
        children: [{
                title: '继电器模块',
                type: '-2147483647',
                folder: '8'
            },
            {
                title: '语言录放模块',
                type: '-2147483646',
                folder: '8'
            },
            {
                title: '蜂鸣器',
                type: '-2147483645',
                folder: '8'
            },
            {
                title: 'RGB灯',
                type: '-2147483644',
                folder: '8'
            },
            {
                title: '自定义',
                type: '-2147483648',
                folder: '8'
            }
        ]
    },
    {

        title: '多功能组件控制',
        type: 4,
        icon: "icon-controller",
        alias: '多功能',
        color: '#DD272D',
        children: [{
                title: '点阵屏',
                type: '-2130706431'
            },
            {
                title: '四位数码管',
                type: '-2130706430'
            }
        ]
    },
    {

        title: '方向控制',
        type: 5,
        icon: "icon-direction",
        alias: '方向',
        color: '#0C64EB',
        children: [{
            title: '直流电机驱动模块',
            type: '-2113929215'
        }]
    },
    {

        title: '滚动条控制',
        type: 6,
        icon: "icon-scrollbar",
        alias: '滚动条',
        color: '#1CD0BD',
        children: [{
                title: 'LED灯',
                type: '-2097151999'
            },
            {
                title: '扬声器模块',
                type: '-2097151998'
            },
            {
                title: '多路舵机驱动模块',
                type: '-2097151997'
            },
            {
                title: '自定义',
                type: '-2097152000'
            }
        ]
    }
]

export const latticeTypes = [{
        src: '01',
        value: '0066999942241800',
        desc: '爱心'
    },
    {
        src: '02',
        value: '00183C5A18181800',
        desc: '上'
    },
    {
        src: '03',
        value: '001818185A3C1800',
        desc: '下'
    }, {
        src: '04',
        value: '0008047E7E040800',
        desc: '右'
    },
    {
        src: '05',
        value: '0010207E7E201000',
        desc: '左'
    }, {
        src: '06',
        value: '000010387C000000',
        desc: '三角'
    }
]