import { type GovUKFileUploadProps } from "../upstream/govuk";
export interface FileUploadProps extends Omit<GovUKFileUploadProps, "formGroup"> {
}
export declare function FileUpload(props: FileUploadProps): import("hono/jsx/jsx-dev-runtime").JSX.Element;
