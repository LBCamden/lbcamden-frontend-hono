import { Child } from "hono/jsx";
import { GovUKWarningText, type GovUKWarningTextProps } from "../upstream";
import { childOrContentObject } from "../lib/hono-jsx-utils";

export interface WarningTextProps
  extends Omit<GovUKWarningTextProps, "html" | "text"> {
  children?: Child;
}

export async function WarningText({ children, ...props }: WarningTextProps) {
  return (
    <GovUKWarningText {...props} {...await childOrContentObject(children)} />
  );
}
