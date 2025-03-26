
import { HtmlEscapedString } from "hono/utils/html";

// @ts-ignore
import Layout from './layout.njk'

export interface PageLayoutProps {
  assetPath?: string;
  assetUrl?: string;

  headIcons?: string;
  head?: string;
  bodyStart?: string;
  skipLink?: string;
  header?: string;
  main?: string;
  beforeContent?: string;
  content?: string;
  postContent?: string;
  afterContent?: string;
  footer?: string;
  bodyEnd?: string;
}

export default Layout as (props: PageLayoutProps) => HtmlEscapedString