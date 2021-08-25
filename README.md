![](https://naologic.com/assets/images/nav/logo.svg)
# Naologic - Ecommerce




<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#roadmap">SCSS files</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>





### Examples of project structure
(@Barbara here you have a few snipets from where you could copy and write everything in `project structure`)

    .
    ├── build                   # Compiled files (alternatively `dist`)
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (alternatively `spec` or `tests`)
    ├── tools                   # Tools and utilities
    ├── LICENSE
    └── README.md


    ├── ...
    ├── docs                    # Documentation files (alternatively `doc`)
    │   ├── TOC.md              # Table of contents
    │   ├── faq.md              # Frequently asked questions
    │   ├── misc.md             # Miscellaneous information
    │   ├── usage.md            # Getting started guide
    │   └── ...                 # etc.
    └── ...


    .
    ├── ...
    ├── test                    # Test files (alternatively `spec` or `tests`)
    │   ├── benchmarks          # Load and stress tests
    │   ├── integration         # End-to-end, integration tests (alternatively `e2e`)
    │   └── unit                # Unit tests
    └── ...

todos for project structure:
  - write documentation on all modules/components, what they do, on location where they are used
  - BTW, i just realise that in `account` > `_parts` you have all the pages and components
  - so in `_parts` keep only `address-card` and everything else that has a route, should be moved outside of `_parts`
  - (rule of thumb, in parts you don't have a component that has a route, only components that are used) - check the remaining files too

<!-- ABOUT THE PROJECT -->
## Project structure

note: here you would have the whole structure (including libs + testing project) 
- apps
  - ecomm3
    - src
    - assets
    - enviroments
    - ...
- libs
  - nao-http2
  - nao-interface
  - ...

### App directory
note: (remove notes at the end) - first thing write the structure for the whole projects (just modules and what a module does)

### Routing schema
note: try writing a schema how the modules are connected, on what URL, and how the pages are connected

### Account
then break all modules, and add documentation for each individual component


### Default pages

### Home

### Interfaces

### layout

### Services

### Shared

### shop

### Site


<!-- ABOUT THE PROJECT -->
## About The Project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.


<!-- project-structure -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

## Development server

Run `nx serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment on Vercel

[comment]: <> (The first step is to set up the Environment Variables listed below:)

[comment]: <> (Navigate to `Project Settings` > `Environment Variables`)

[comment]: <> ( 1. Add  `API_URL` : api-v2-xxx.naologic.com)

[comment]: <> ( 2. Add `NAO_TOKEN` : naoprodxxxxxxxxxxxxxxxxxxxxx)

[comment]: <> (Then you need to go in the `Build & Development Settings` and change the `OUTPUT DIRECTORY` to `dist/apps/ecomm3`)

[comment]: <> (That's it, your ecommerce store is up and running :rocket:)

You need to go in the `Build & Development Settings` and change the `OUTPUT DIRECTORY` to `dist/apps/ecomm3`
That's it, your ecommerce store is up and running :rocket:

