import { UserConfig } from "vite";
import { DevServerOptions } from '@hono/vite-dev-server';
interface ConfigWithFrontendOpts extends UserConfig {
    hono: {
        devServer: DevServerOptions;
        build: any;
    };
    client: UserConfig & {
        /** Path of directory containing client sources. All client code (excluding node_modules must live here) */
        sourceDir: string;
        /** Entrypoint files (relative to sourceDir) for client-side code (typically js/ts and css/scss) */
        entrypoints: string[];
    };
}
export declare function defineConfig({ plugins, hono, client, ...conf }: ConfigWithFrontendOpts): import("vite").UserConfigFnObject;
export {};
