module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Espacio Estelar - Mauro Dollinger'
                return args
            })
    }
}