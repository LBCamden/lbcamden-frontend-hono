export interface AssetPathOpts {
    prodAssetPath: string;
    devAssetPath: string;
    isDev: boolean;
    jsMain: string;
    styleMain: string;
    clientRoot?: string;
}
export declare function getAssetPaths(opts: AssetPathOpts): {
    assetPath: string;
    head: import("hono/jsx/jsx-dev-runtime").JSX.Element;
    bodyEnd: import("hono/jsx/jsx-dev-runtime").JSX.Element;
};
