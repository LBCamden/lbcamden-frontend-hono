export interface AssetPathOpts {
  prodAssetPath: string;
  devAssetPath: string;
  isDev: boolean;
  jsMain: string;
  styleMain: string;
  clientRoot?: string;
}

export function getAssetPaths(opts: AssetPathOpts) {
  const assetBase = (opts.isDev ? opts.devAssetPath : opts.prodAssetPath) + "/";
  const js = assetBase + replaceExt(opts.jsMain, opts.isDev);
  const css = assetBase + replaceExt(opts.styleMain, opts.isDev);

  return {
    assetPath: opts.isDev ? opts.devAssetPath : opts.prodAssetPath,
    head: <link rel="stylesheet" href={css} />,
    bodyEnd: <script type="module" src={js} />,
  };
}

const extMap: Record<string, string | undefined> = {
  jsx: "js",
  tsx: "js",
  ts: "js",
  scss: "css",
};
const EXT = /\.([a-z]+)$/;

function replaceExt(path: string, isDev: boolean) {
  if (isDev) {
    return path;
  }

  const ext = EXT.exec(path);
  if (!ext) return path;

  const mappedExt = extMap[ext[1]];
  if (!mappedExt) return path;

  return path.replace(EXT, "." + mappedExt);
}
