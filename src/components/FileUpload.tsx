import GovUKFileUpload, {
  type GovUKFileUploadProps,
} from "govuk-frontend/dist/govuk/components/file-upload/template.njk";

export interface FileUploadProps
  extends Omit<GovUKFileUploadProps, "formGroup"> {}

export function FileUpload(props: FileUploadProps) {
  return <GovUKFileUpload {...props} />;
}
