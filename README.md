# China Unofficial Archives

This is the frontend of the [China Unoffical Archives](https://minjian-danganguan.org).

## Deployment

```
podman compose up --build -d

```

## Developing

Once you've cloned this repository and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### PDF.JS

For pdf.js to work properly in development copy some directories into `/static`. For production this handled in the compose file.

```
cp -r node_modules/pdfjs-dist/maps static
cp -r node_modules/pdfjs-dist/wasm static
cp -r node_modules/pdfjs-dist/standard_fonts static
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.
