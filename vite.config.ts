import { type Plugin, defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-build/node";
import { execSync } from "child_process";

const DEV_PLUGINS = [
  devServer({
    entry: "src/index.tsx",
  }),
];

const BUILD_PLUGINS = [
  build({
    entry: "src/index.tsx",
    port: 3000,
  }),
];

const PLUGINS = [tailwindBundler()];

let plugins: (Plugin<any> | Plugin<any>[])[] = [...PLUGINS];

console.log("Mode: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  plugins = [...plugins, ...DEV_PLUGINS];
} else {
  plugins = [...plugins, ...BUILD_PLUGINS];
}

export default defineConfig({
  plugins,
  server: {
    port: 3000,
    watch: {
      ignored: ["public/main.css"],
    },
  },
});

function tailwindBundler() {
  return {
    name: "tailwind-bundler",
    configureServer() {
      execSync("npm run build:tailwind", { stdio: "inherit" });
    },
    watchChange(id: string) {
      if (id.includes("public/main.css")) {
        return;
      }
      execSync("npm run build:tailwind", { stdio: "inherit" });
    },
  };
}
