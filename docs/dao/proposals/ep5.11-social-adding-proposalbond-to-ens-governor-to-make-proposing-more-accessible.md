| description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ## Abstract

The proposal threshold for propose new executable ENS proposals is high, and rightly so. ENS is one of the most popular DAOs and community in the Web3 community and keeping the quality bar of proposals to the highest standard is very important. However, ENS also has the treasury and the desire to expand the community and make proposing easier and more accessible to enable more builders to come and build in ENS.

Agora proposes adding the functionality of the ProposalBond to the ENS DAO Governor that would allow a proposer to propose with a lower threshold, and then the community could vote [For, Against, Against No Return,Abstain]. If the weight of Against No Return > Against, then the proposer does not get their bond back and the proposal does not pass.

## Specification

A discussion in the DAO Meta-Gov working group titled: [Seeking Feedback: ENS Governor Upgrade to make proposing more accessible](https://discuss.ens.domains/t/seeking-feedback-ens-governor-upgrade-to-make-proposing-more-accessible/19296), Agora proposed the following PR on the ENS Governor: [Proposal Bond Pull Request](https://github.com/voteagora/ens-governance-contracts/pull/1) which outlines the code needed to make this change happen. 

Since the time of that PR and during the follow up discussions, the community has asked for the following additions:
* Ensure that the ProposalBond work proposed by Agora works with the new Veto rules and security council. This covers the case of a proposal being vetod from within the timelock therefore making sure we have the code to handle that case. The default case here being that the bond would not be returned.
* Work with OpenZeppelin to see if we can bring this functionality into OZ Governance Core

Agora is committed to building public goods and is already working closely with OpenZeppelin to bring innovations of Agora's Governor into OZ Governance Core.

Given that the proposal threshold of this new functionality will be the most important piece, there is a general consensus in the discussion group that 1,000 ENS is the right initial value. This parameter can later be set governance and moved up and down as we see fit. 

## Voting

We are putting this to a simple, for/again/abstain vote

## Next Steps

Should the vote pass, we will be closing out the implementation, working with the ENS Security Council to chose auditors for the changes, and then putting up an executable vote to `setImplementation` of a new governor, with these changes once the code has been approved and reviewed by the security council. 

## Success Criteria
For this social proposal to pass, the following quorum and voting requirements must be met:

**Quorum**: The proposal must receive a minimum of 1% of the total supply of $ENS (1 million votes) in the form of "Yes" and "Abstain" votes combined. "No" votes do not count towards quorum.

**Approval**: Once the quorum is reached, the proposal requires a simple majority (>50%) of "Yes" votes among the "Yes" and "No" votes to pass. "Abstain" votes do not count towards the approval calculation. |

# [EP5.11][Social] Adding ProposalBond to ENS Governor to make proposing more accessible


  | **Status**            | Pending                                                                                                                                      |
  | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
  | **Discussion Thread** |  [Discourse](https://discuss.ens.domains/t/seeking-feedback-ens-governor-upgrade-to-make-proposing-more-accessible/19296)                                                                                              |
  | **Discussion Temp Check** |  [Discourse](https://discuss.ens.domains/t/seeking-feedback-ens-governor-upgrade-to-make-proposing-more-accessible/19296)                                                                                              |
  | **Votes**             | [Snapshot](https://snapshot.org/#/ens.eth/proposal/388)                                                                                                                                     |
  

# Description 
 ## Abstract

The proposal threshold for propose new executable ENS proposals is high, and rightly so. ENS is one of the most popular DAOs and community in the Web3 community and keeping the quality bar of proposals to the highest standard is very important. However, ENS also has the treasury and the desire to expand the community and make proposing easier and more accessible to enable more builders to come and build in ENS.

Agora proposes adding the functionality of the ProposalBond to the ENS DAO Governor that would allow a proposer to propose with a lower threshold, and then the community could vote [For, Against, Against No Return,Abstain]. If the weight of Against No Return > Against, then the proposer does not get their bond back and the proposal does not pass.

## Specification

A discussion in the DAO Meta-Gov working group titled: [Seeking Feedback: ENS Governor Upgrade to make proposing more accessible](https://discuss.ens.domains/t/seeking-feedback-ens-governor-upgrade-to-make-proposing-more-accessible/19296), Agora proposed the following PR on the ENS Governor: [Proposal Bond Pull Request](https://github.com/voteagora/ens-governance-contracts/pull/1) which outlines the code needed to make this change happen. 

Since the time of that PR and during the follow up discussions, the community has asked for the following additions:
* Ensure that the ProposalBond work proposed by Agora works with the new Veto rules and security council. This covers the case of a proposal being vetod from within the timelock therefore making sure we have the code to handle that case. The default case here being that the bond would not be returned.
* Work with OpenZeppelin to see if we can bring this functionality into OZ Governance Core

Agora is committed to building public goods and is already working closely with OpenZeppelin to bring innovations of Agora's Governor into OZ Governance Core.

Given that the proposal threshold of this new functionality will be the most important piece, there is a general consensus in the discussion group that 1,000 ENS is the right initial value. This parameter can later be set governance and moved up and down as we see fit. 

## Voting

We are putting this to a simple, for/again/abstain vote

## Next Steps

Should the vote pass, we will be closing out the implementation, working with the ENS Security Council to chose auditors for the changes, and then putting up an executable vote to `setImplementation` of a new governor, with these changes once the code has been approved and reviewed by the security council. 

## Success Criteria
For this social proposal to pass, the following quorum and voting requirements must be met:

**Quorum**: The proposal must receive a minimum of 1% of the total supply of $ENS (1 million votes) in the form of "Yes" and "Abstain" votes combined. "No" votes do not count towards quorum.

**Approval**: Once the quorum is reached, the proposal requires a simple majority (>50%) of "Yes" votes among the "Yes" and "No" votes to pass. "Abstain" votes do not count towards the approval calculation.



# Voting Strategy 
 basic

# Voting Dates 
 Thu Aug 29 2024 00:00:00 GMT+0000 (Coordinated Universal Time) - Tue Sep 03 2024 00:00:00 GMT+0000 (Coordinated Universal Time)

# Voting options 
 For, Against, Abstain

