export interface ServiceHeaderProps {
    productName?: string;
    homepageUrl?: string;
    attributes?: Record<string, unknown>;
}
export declare function ServiceHeader(props: ServiceHeaderProps): Promise<import("hono/utils/html").HtmlEscapedString>;
