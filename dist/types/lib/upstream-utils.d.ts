interface UpstreamOpts {
    dir: string;
    outPath: string;
    componentNamespace?: string;
    importSourcePrefix: string;
    only?: string[];
    exclude?: string[];
}
interface MacroOpt {
    name: string;
    type?: string;
    required?: string;
    description?: string;
    params?: MacroOpt[];
}
export declare function scaffoldComponents(conf: UpstreamOpts): Promise<void>;
export declare function genInterfaces(conf: UpstreamOpts): Promise<void>;
export declare function readComponents({ dir, only, exclude }: Pick<UpstreamOpts, 'dir' | "only" | 'exclude'>): AsyncGenerator<{
    component: string;
    opts: any;
}, {
    component: string;
    opts: MacroOpt;
}[], unknown>;
export declare function getComponentName(component: string, { componentNamespace }: Pick<UpstreamOpts, 'componentNamespace'>): string;
export declare function getComponentPropsName(component: string, opts: Pick<UpstreamOpts, 'componentNamespace'>): string;
export declare function getComponentUpstreamSource(component: string, { importSourcePrefix }: Pick<UpstreamOpts, 'importSourcePrefix'>): string;
export {};
