import resolve from "@rollup/plugin-node-resolve";
import ts from "@rollup/plugin-typescript";
import cjs from "@rollup/plugin-commonjs";
import shebang from "rollup-plugin-preserve-shebang";

export default [
  {
    input: "src/harx.ts",
    output: [
      { file: "dist/harx.js", format: "es" },
      { file: "dist/harx.cjs", format: "cjs" }
    ],
    plugins: [ts({ tsconfig: "./tsconfig.json" }), cjs(), resolve()],
  },
  {
    input: "src/cli.ts",
    output: { file: "dist/cli.js", format: "es" },
    plugins: [shebang(), ts({ tsconfig: "./tsconfig.json" })],
  },
];
