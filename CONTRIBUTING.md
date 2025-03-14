# Welcome to ENS docs contributing guide

Thank you for investing your time in contributing to our documentation! Any contribution you make will be reflected on [docs.ens.domains](https://docs.ens.domains) :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Getting started

This guide will walk you through the process of contributing to the ENS docs. If you are new to GitHub, you can checkout this [GitHub tutorial](https://guides.github.com/activities/hello-world/) to get started.

### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://github.com/ensdomains/docs/issues). If a related issue doesn't exist, you can [open a new issue](https://github.com/ensdomains/docs/issues/new).

#### Solve an issue

Scan through our [existing issues](https://github.com/ensdomains/docs/issues) to find one that interests you. As a general rule, we don't assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Make changes in the UI

Click **Make a contribution** at the bottom of any docs page to make small changes such as a typo, sentence fix, or a broken link. This takes you to the `.mdx` file where you can make your changes and [create a pull request](#pull-request) for a review.

#### Make changes locally

> [!NOTE]  
> Node.js version 20 or higher is required to build the docs.

1. Fork the repository via the GitHub UI.
2. Clone your forked repository to your local machine.
3. Create a working branch and make your changes!
4. Build the docs locally with `pnpm run build` to ensure your changes are valid.

### Commit your update

Commit the changes once you are happy with them. Upon creating a Pull Request your code will automatically be tested :zap:.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The ENS team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [ENS Docs](https://docs.ens.domains).
