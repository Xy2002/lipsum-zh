import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';

export default {
  input: "src/index.ts", // 打包入口
  output: [{
    file: "dist/index.js",
    format: "umd",
    name: "lipsumzh", 
    sourcemap: true,
  },{
    file: "dist/index.cjs.js",
    format: "cjs",
  },{
    file: "dist/index.esm.js",
    format: "esm",
  }],
  plugins: [
    typescript(),
    babel({ babelHelpers: "bundled" }), 
  ],
};
