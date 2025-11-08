# PortfolioApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve


```

## pour deployer l'application procedure pas a pas:

1. Rebuilds et déployez
   ng build --configuration=production --base-href /portfolio-jovany/

2. Allez dans le dossier browser
   cd "dist\portfolio-app\browser"
3. Nettoyez l'ancien git
   Remove-Item .git -Recurse -Force -ErrorAction SilentlyContinue
4. Initialisez et déployez
   git init
   git add .
   git commit -m "Add Open Graph metadata for link previews"
   git remote add origin https://github.com/jovanylemoupa/portfolio-jovany.git
   git push -f origin HEAD:gh-pages
5. Retournez au dossier principal
   cd "..\..\.."

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

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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

# Sur dev, après modifications :

git add . && git commit -m "Vos modifications" && git push origin dev

# Build et deploy :

ng build --configuration=production --base-href /portfolio-jovany/
cd "dist\portfolio-app\browser"
Remove-Item .git -Recurse -Force -ErrorAction SilentlyContinue
git init && git add . && git commit -m "Deploy update"
git remote add origin https://github.com/jovanylemoupa/portfolio-jovany.git
git push -f origin HEAD:gh-pages
cd "..\..\.."

# Testez après 2-3 minutes :

# https://jovanylemoupa.github.io/portfolio-jovany/
