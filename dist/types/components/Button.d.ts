import { Child } from "hono/jsx";
import { type LBCamdenButtonProps } from "../upstream/lbcamden";
export interface ButtonProps extends Omit<LBCamdenButtonProps, "text" | "html"> {
    children?: Child;
}
export declare const Button: ({ children, ...props }: ButtonProps) => Promise<import("hono/utils/html").HtmlEscapedString>;
