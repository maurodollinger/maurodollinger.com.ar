module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Mauro Dollinger - Web Portfolio'
                return args
            })
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}