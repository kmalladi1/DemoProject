# Contributing

Please be familiar and follow the guidelines outlined in these references:

* [Idiomatic Git](http://thief.factset.com/idiomatic-git/)
* [Web Guidlines](https://github.factset.com/web-guidance/web-guidance/tree/master)

## Getting Started

Fork the repository to your own account.

Clone the repository to a suitable location on your local machine.

```bash
git clone https://github.factset.com/[GITLAB USERNAME/GROUP]/qa-test-pa3.git
```

**Note:** This will clone the entire contents of the repository at the HEAD revision.

To update the project from within the project's folder you can run the following command:

```bash
git pull --rebase
```

### Building

Install the project's dependencies.

```bash
npm install
```

Though it's not necessary to build the contents of this project into a single artifact, it's still possible to execute a standard set of tasks that run unit tests and check for lint errors.

```bash
npm run build
```

### Testing

Install the project's dependencies.

```bash
npm install
```

Next, run the project's tests.

```bash
npm run test
```

## Feature Requests

We're always looking for suggestions to improve this project. If you have a suggestion for improving an existing feature, or would like to suggest a completely new feature, please file an issue with our [GitLab repository](https://github.factset.com/app-qa-automation/qa-test-pa3/issues).

## Bug Reports

Our project isn't always perfect, but we strive to always improve on that work. You may file bug reports on the [GitLab repository](https://github.factset.com/app-qa-automation/qa-test-pa3/issues) site.

## Pull Requests

Along with our desire to hear your feedback and suggestions, we're also interested in accepting direct assistance in the form of new code or documentation.

Please feel free to file merge requests against our [GitLab repository](https://github.factset.com/app-qa-automation/qa-test-pa3/merge_requests).
