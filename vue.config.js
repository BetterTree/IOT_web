const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    publicPath: '/',
    // eslint保存时检查
    lintOnSave: false,
    devServer: {
        port: 8088,
        open: true,
        proxy: {
            '/api': {
                target: process.env.API,
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 192,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        // svg rule loader
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.exclude.add(/node_modules/)
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

        // #region
        if (isProd) {
            var externals = {
                vue: 'Vue',
                vuex: 'Vuex',
                axios: 'axios',
                'element-ui': 'ELEMENT',
                'vue-router': 'VueRouter'
            }
            const cdn = {
                css: [
                    // element-ui css
                    // '//unpkg.com/element-ui/lib/theme-chalk/index.css'
                ],
                js: [
                    '//cdn.staticfile.org/vue/2.6.10/vue.min.js',
                    '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
                    '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
                    '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
                    '//unpkg.com/element-ui@2.12.0/lib/index.js'
                ]
            }
            config.externals(externals)
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn
                    return args
                })
        }
        // #endregion
    },
    configureWebpack: config => {
        if (isProd) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
            config.plugins.push(
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        }
                    }
                })
            )
        }
    },
    productionSourceMap: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                resolve('src/styles/color.less'),
                resolve('src/styles/mixin.less')
            ]
        }
    }
}