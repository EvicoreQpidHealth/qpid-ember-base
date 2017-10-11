# QPID Ember Base Addon

## Installation

```
ember install qpid-ember-base
```

This will install this addon into your application and list it in your package.json.

## Contributing Installation

### Install Homebrew

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install NVM

```
brew update && brew install nvm
```

### Install Node

```
nvm install $(cat .nvmrc)
```

Note: This will install the node version specified in the projects `.nvmrc` file.

### Fork and Clone the project

First, you'll want to fork the project. Once you fork the project, you'll
need to clone your fork:

```
git clone git@github.com:USERNAME/qpid-ember-base.git
```

NOTE: `USERNAME` is a placeholder for the location of your fork.

### Install Ember globally

```
npm i -g ember-cli@$(./.ember-cli-version)
```

Note: `./.ember-cli-version` is a node scrip that retrieves the `ember-cli` version from the `package.json` file.

### Install Bower globally

```
npm i -g bower
```

### Install project dependencies

While in the project, run:

```
npm i
```

## Running / Development

```
ember s
```

Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)