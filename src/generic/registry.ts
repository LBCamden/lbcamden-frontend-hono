/// <reference types="vite/client" />

import { FC } from "hono/jsx"

type ComponentMap = Record<string, { default: FC }>

const lbcamdenComponents = import.meta.glob(
    "../../node_modules/lbcamden-frontend/lbcamden/components/*/template.njk",
    {
        eager: true,
    }
) as ComponentMap

const govukComponents = import.meta.glob(
    "../../node_modules/govuk-frontend/dist/govuk/components/*/template.njk",
    {
        eager: true,
    }
) as ComponentMap

export const componentRegistry = new Map([
    ...createComponentMap("lbcamden", lbcamdenComponents),
    ...createComponentMap("govuk", govukComponents),
])

function getComponentSlug(key: string) {
    return key.split('/').at(-2)!
}

function createComponentMap(namespace: string, importGlob: ComponentMap) {
    return Object.entries(importGlob).map(([moduleId, mod]) => [`${namespace}-${getComponentSlug(moduleId)}` as string, mod.default] as const)
}
