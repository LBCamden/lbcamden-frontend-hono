// @ts-ignore
import Layout from './layout.njk'
import nunjucksComponent from "../lib/nunjucks-jsx";
import { FC } from "hono/jsx";

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
  pageTitle?: string
}

export default nunjucksComponent(Layout) as FC<PageLayoutProps>