const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    "/api": {
      target: "目标服务器",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
});
