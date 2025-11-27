import { Child } from "hono/jsx";
import { GovUKLabel, type GovUKLabelProps } from "../upstream/govuk";
import { isJsxChild, renderChildFragment } from "../lib/hono-jsx-utils";

export interface LabelProps extends BaseLabelOpts {
  children?: Child;
}

export interface LabelOpts extends BaseLabelOpts {
  content?: Child;
}

export interface BaseLabelOpts extends Omit<GovUKLabelProps, "text" | "html"> {}

export async function Label({ children, ...props }: LabelProps) {
  return <GovUKLabel {...await labelOpts({ content: children, ...props })} />;
}

export async function labelOpts(props: LabelOpts | Child) {
  if (isJsxChild(props)) {
    props = {
      content: props,
    };
  }

  const { content, ...rest } = props;

  return {
    ...(await renderChildFragment(content)),
    ...rest,
  };
}
