import { Child } from "hono/jsx";
import {
  GovUKErrorMessage,
  type GovUKErrorMessageProps,
} from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface ErrorMessageProps
  extends Omit<GovUKErrorMessageProps, "text" | "html"> {
  children?: Child;
}

export async function ErrorMessage(props: ErrorMessageProps) {
  return (
    <GovUKErrorMessage
      {...props}
      {...await honoTextOrHtmlToGovUK(props.children)}
    />
  );
}
