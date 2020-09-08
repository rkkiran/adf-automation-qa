const dotenv = require("dotenv").config;
const { existsSync } = require("fs-extra");
const { resolve } = require("path");

process.env.TS_NODE_TRANSPILE_ONLY = true;
function addPath(addDir) {
  if (!(addDir instanceof Array)) {
    addDir = [addDir];
  }
  for (const dir of addDir) {
    const envFiles = [".env", ".env.local"];
    for (const file of envFiles) {
      const envPath = resolve(dir, file);
      if (existsSync(envPath)) {
        dotenv(file);
      }
    }
    require("app-module-path").addPath(dir);
  }
}
function registerTSConfig(dir) {
  const configPath = resolve(dir, "tsconfig.json");
  if (existsSync(configPath)) {
    const tsconfig = require(configPath);
    require("ts-node").register({
      transpileOnly: true,
      compilerOptions: tsconfig.compilerOptions,
    });
    require("tsconfig-paths").register({
      baseUrl: tsconfig.compilerOptions.baseUrl,
      paths: tsconfig.compilerOptions.paths,
    });
  } else {
    throw new Error(`Can't register TypeScript, ${configPath} doesn't exist`);
  }
}
const currentDir = process.env.CWD || process.cwd();
addPath(currentDir);
registerTSConfig(currentDir);

module.exports = (dir, setEnv = true, setTSConfig = true) => {
  if (setEnv) {
    addPath(dir);
  }
  if (setTSConfig) {
    registerTSConfig(dir);
  }
 };
