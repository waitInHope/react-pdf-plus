
const Proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        Proxy.createProxyMiddleware('/api/pdf', {
            target: 'http://localhost:9090',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}
