# w3ui - FrontEnd Template [![Build Status](https://secure.travis-ci.org/yeoman/generator-angular.png?branch=master)](http://travis-ci.org/yeoman/generator-angular) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


## Prerequisite

Install `sass`:
```
sudo gem install sass
```

Install `compass`:
```
gem install compass
```

Install `nodeJS`:
[nodeJS](http://nodejs.org/)

Install `bower`:
```
npm install -g grunt-cli bower
```

## Usage

* [bower](http://bower.io) - the package management tool
* [grunt](http://gruntjs.com) - the build tool


###Bower

Bower is a package manager for the web which allows you to easily manage dependencies for your projects. This includes assets such as JavaScript, images and CSS. It is maintained by Twitter and the open-source community.

Managing packages using Bower can be done using the following commands:

```
# Search for a dependency in the Bower registry.
bower search <dep>

# Install one or more dependencies.
bower install <dep>..<depN>

# List out the dependencies you have installed for a project.
bower list

# Update a dependency to the latest version available.
bower update <dep>
```

###Grunt

Grunt is a task-based command-line tool for JavaScript projects. It can be used to build projects, but also exposes several commands which you will want to use in your workflow. Many of these commands utilize Grunt tasks under the hood which are maintained by the Yeoman team.

```
# Preview an app you have generated (with Livereload).
grunt server

# Run the unit tests for an app.
grunt test

# Build an optimized, production-ready version of your app.
grunt
```

####Grunt w3UI-Template Helper
```
# Create a new state(view, controller, style).
grunt create-state:myState

# Create a new service.
grunt create-service:myService

# Create a new factory.
grunt create-factory:myFactory

# Create a new provider.
grunt create-provider:myProvider

# Create a new directives.
grunt create-directives:myDirectives

# Create a new filter.
grunt create-filter:myFilter
```

