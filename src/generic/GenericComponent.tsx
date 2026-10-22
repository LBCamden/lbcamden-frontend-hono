import { raw } from "hono/html"
import { componentRegistry } from "./registry"

export interface GenericComponentProps {
    content: GenericComponentContent
}

export interface GenericComponentContent {
    __type__: string
}
interface HtmlContent {
    __type__: "html"
    html: string
}

export function GenericComponent({ content }: GenericComponentProps) {
    if (isHtmlComponent(content)) {
        return raw(content.html)
    }

    const { __type__: componentType, ...props } = content

    const Component = componentRegistry.get(componentType)
    if (!Component) {
        throw new Error(`Unknown component: ${componentType}`)
    }

    return <Component {...props} />
}

function isHtmlComponent(c: GenericComponentContent): c is HtmlContent {
    return c.__type__ === "html"
}