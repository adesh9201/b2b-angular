# B2bMarketplace

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building (production)

Build an optimized production bundle:

```bash
npm run build
```

Artifacts are output to `dist/b2b-marketplace`. The build uses file replacements for environments:

- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

Set your API base via `environment.apiBaseUrl`.

## Run with Docker (production)

Build and run the Docker image with Nginx serving the app:

```bash
docker build -t b2b-marketplace:prod .
docker run -p 8080:80 b2b-marketplace:prod
```

Open `http://localhost:8080`.

To proxy API requests, edit `nginx.conf` and configure the `/api/` block to point to your backend, or serve the frontend behind your existing gateway and set `environment.prod.ts` `apiBaseUrl` accordingly.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
