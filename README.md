# Frndos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Amir's Notes

1. side bar where you have 2 choices : add , view :
    1. use routing to switch between these 
    1. Add: the form to add a new person to the network, the friends field may have auto-complete/suggestion
    1. View: search box for a person with auto-complete/suggestion, and graph once one is selected
1. alternative view: complete view of all the friends in the network
    1. we need to add details visualization to the nodes
1. as it is designed now, having feature modules is not useful

# TODO
1. naming the person a friend, then naming the connections/friends of the person as friends is very confusing
