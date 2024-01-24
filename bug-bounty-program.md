# Bug Bounty Program

The ENS bug bounty program rewards anyone who finds a bug in covered ENS smart contracts.

## Rules and Rewards

* Issues that have already been submitted by another user or are already known to the ENS team are not eligible for bounty rewards.
* Public disclosure of a vulnerability makes it ineligible for a bounty. This includes exploiting the bug on mainnet or any public test network.
* The ENS team, employees and all other people paid by ENS project, directly or indirectly, are not eligible for rewards.
* Only the smart contracts listed below are eligible for rewards. Websites and other infrastructure are not covered by the bounty program.
* The ENS bounty program considers a number of variables in determining rewards. Determinations of eligibility, score and all terms related to an award are at the sole and final discretion of the ENS team.

The value of rewards paid out will vary depending on Severity. The severity is calculated according to the OWASP risk rating model based on Impact and Likelihood :

![](<.gitbook/assets/owasp\_w600 (1).png>)

Reward sizes are _guided_ by the rules below, but are in the end, determined at the sole discretion of the ENS team

* **Critical**: up to $250,000 USD
* **High**: up to $150,000 USD
* **Medium**: up to $100,000 USD
* **Low**: up to $20,000 USD
* **Note**: up to $5,000 USD

The ENS team reserves the right to adjust bounty amounts at any time in the future.

Where the contract in our GitHub repository differs from the one deployed on Ethereum, due to changes having been made since the last deployment, the following rules apply:

1. If the bug exists in the contract deployed on Ethereum, the full bounty amount is payable.
2. If the bug is only in the version on GitHub, the ENS team will decide at is discretion an appropriate proportion of the bounty to award based on the state of the code (from 0% for code that was never intended to be deployed, to 100% for code that is considered final).

In addition to Severity, other variables are also considered when the ENS team decides the score, including (but not limited to):

* Quality of description. Higher rewards are paid for clear, well-written submissions.
* Quality of reproducibility. Please include test code, scripts and detailed instructions. The easier it is for us to reproduce and verify the vulnerability, the higher the reward.
* Quality of fix, if included. Higher rewards are paid for submissions with clear description of how to fix the issue.

## Covered Contracts

The following smart contracts are covered by the bounty:

* All non-test contracts in [ensdomains/ens-contracts](https://github.com/ensdomains/ens-contracts).

## Important Legal Information

The bug bounty program is a discretionary rewards program for the ENS community to encourage and reward those who are helping to improve the platform. It is not a competition. You should know that we can cancel the program at any time, and awards are at the sole discretion of the ENS team. In addition, we are not able to issue awards to individuals who are on sanctions lists or who are in countries on sanctions lists (e.g. North Korea, Iran, etc). You are responsible for all taxes. All awards are subject to applicable law. Any patches must be offered under the same license as the repository they affect. Finally, your testing must not violate any law or compromise any data that is not yours.

## Submitting a Bug

Bugs should be submitted via email to bugs@ens.domains, or on Keybase to @arachnid.
