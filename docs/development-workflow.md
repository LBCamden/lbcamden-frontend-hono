# Development Workflow

💡 Refer to the [Motivation & Context]('./motivation-and-context.md') document before reading this.

In general, your job when implementing a new component is to:

- Make sure that upstream libraries and generated interface files are up to date
- Use the `scaffold` command to generate the boilerplate for your component
- Amend the typescript interfaces to accept hono's `Child` type instead of html strings
- In the component's implementation, map through your component's props and render any jsx children to html before passing through to nunjucks.

## Syncing with upstream changes

Whenever an upstream dependency is updated, you will need to re-generate the typed interface to the nunjucks templates.

To do this:

```bash
npm run codegen
```

This will update files in `src/upstream` so that:

- Each component has a matching typescript interface generated from the component's `macro-options.json` file
- Each nunjucks template is imported and given typescript types allowing it to be used as a jsx component with the correct typings.

Note that the codegen command will overwrite these files, so don't make any modifications to them.

## Scaffolding a new component and story

Although we're not able to completely automate the generation of hono-friendly components, there is a script included that will generate most of the component boilerplate for you:

```bash
npm run scaffold -- [library]/[component]
```

for example:

```bash
npm run scaffold -- lbcamden/button
```

This will:

- Create a [component].tsx file that calls straight through to the underlying upstream component, ready for you to adapt.
- Create a [component].stories.tsx file, containing stories generated from the upstream component's `fixtures.json` file.

Both of these files will be typed. You'll now want to:

- Look for any typescript errors and fix them. These will usually indicate either a bug or lack of precision in the upstream `macro-options.json` file.
- Start the storybook (`npm run storybook`) and ensure that the stories all behave as expected.

## Adapt the component API

Once you have a working component, you'll want to adapt both the component and story file to make the API more jsx-friendly.

You'll mostly be concerned with ensuring that child html fragments can be expressed in jsx, but there may be other small changes needed to expose a nice jsx api.

The relationship between this library's conventions with child html fragments and how they relate to upstream conventions are documented in [Motivation & Context]('./motivation-and-context.md').

You will find the helper functions in `src/lib/hono-jsx-utils.ts` useful for this.

## Running tests

We don't currently have any automated tests. In the future, we could support these by comparing the rendered html output of this library's stories to the html fragments in upstream `fixtures.json` files.

For now, you'll need to manually check that storybook stories render as expected by visually comparing them to the upstream storybook.

## Publishing changes

We currently don't publish to npm. Downstream users of this library reference it directly on github. Ensure that before pushing changes to main, you build the library:

```bash
npm run build
```
