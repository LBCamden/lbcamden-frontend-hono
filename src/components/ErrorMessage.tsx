import { Child } from "hono/jsx";
import {
  GovUKErrorMessage,
  type GovUKErrorMessageProps,
} from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface ErrorMessageProps
  extends Omit<GovUKErrorMessageProps, "text" | "html"> {
  children?: Child;
}

export async function ErrorMessage(props: ErrorMessageProps) {
  return (
    <GovUKErrorMessage
      {...props}
      {...await renderChildFragment(props.children)}
    />
  );
}
