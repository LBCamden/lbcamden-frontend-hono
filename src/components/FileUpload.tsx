import { GovUKFileUpload, type GovUKFileUploadProps } from "../upstream/govuk";

export interface FileUploadProps
  extends Omit<GovUKFileUploadProps, "formGroup"> {}

export function FileUpload(props: FileUploadProps) {
  return <GovUKFileUpload {...props} />;
}
