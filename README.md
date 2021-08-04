# ⭐️ Float Capital ⭐️

![float capital](/marketing-assets/float-saver.gif)

# Float Capital contest details

- $45,000 main award pot
- $5,000 gas optimization award pot
- Join [C4 Discord](https://discord.gg/EY5dvm3evD) to register
- Submit findings [using the C4 form](https://code423n4.com/2021-08-float-capital-contest/submit)
- [Read our guidelines for more details](https://code423n4.com/compete)
- Starts 2021-08-05 00:00 UTC
- Ends 2021-08-11 23:59 UTC

## Hello Wardens 👋

Yes! You're here! Awesome. We are super excited for your journey on unpacking and dissecting our code. We will do our best to be available around the clock for all your questions, small, big, silly or severe.

For a verbose walkthrough of the system be sure to watch the [videos](https://www.youtube.com/playlist?list=PL7RT-0ybd7joiqKeGklvFxcc8dNWpPBCk) that will take you through the system in finer details. We recommend starting here and playing around with the currently deployed mumbai [testnet](https://float.capital/app/markets) version.

We wish you luck on your audit.

Happy hunting 🕵

_Float Capital team_

## Useful links

- [Testnet Application](https://float.capital/app/markets) (on Mumbai Testnet)
- [Docs](https://docs.float.capital/)
- [Discord](https://discord.gg/6yXy45Yhj9)
- [Twitter](https://twitter.com/float_capital)

## Video walk-throughs of smart-contracts

- [Youtube playlist](https://www.youtube.com/playlist?list=PL7RT-0ybd7joiqKeGklvFxcc8dNWpPBCk)

We are open to requests to create videos on specific parts of the code that you feel you need more clarity on.

## Known trade-offs in the current design

- **System does not allow price updates that are greater than 100%.**

  _Mitigation_ - if the price moves more than 100% in our code we action a price movement of 99.99% which wipes out almost all the liquidity on one side of the market. But it doesn't destroy the market.

- **Oracles are unreliable, faulty, manipulatable etc**

  _Mitigation_ - we use a reputable 3rd party to handle this difficult part for us - namely Chainlink.

- **The underlying yield mechanism might undergo breaking changes or updates**

  _Mitigation_ - we use a 'yield manager' per market so this can evolve and develop over time.

- **The oracle interface may change over time**

  _Mitigation_ - we use a 'oracle manager' per market so this can be updated when necessary.

## Preemptive questions and answers

- **Why do a lot of the functions have `virtual` modifiers?**

The virtual modifiers exist as part of our development test environment framework. It allows us to unit test core code by overriding these functions in code generated mocks.

- **Why don't you check boolean return status for erc20 methods?**

We only check the return boolean (success) for erc20 methods on the payment token not for the synthetic token - this is safe since the synthetic token is written to never return false.

- **Why is long & short represented as a boolean and not an enum?**

[Enum's within mappings break hardhat stack traces](https://github.com/nomiclabs/hardhat/issues/1564)

## Other notes and thoughts

- Currently our synthetic tokens are inheriting from the open zeppelin `ERC20PresetMinterPauser` contract, but the pause functionality has been stripped out by our use of `_beforeTokenTransfer`. We have left the contracts inheriting from the MinterPauser because there is some chance we will add pause functionality before launch - we just want to make sure we don't expose the system to unnecessary external risk - results from various audits will guide this decision. If we don't launch a pausable synth token we will inherit from a more basic ERC20 implementation.

- All our floating point arithmetic is using base 1e18. Additionally, in solidity, integer division rounds down - this is a potential source of bugs! For example, things to look out for, `(a+b+c)/d != a/d+b/d+c/d` in solidity, rather `(a+b+c)/d >= a/d+b/d+c/d`. Also when composing and optimising division and multiplication operations using, canceling out the `1e18` can lead to different output for different input - `(numerator / 1e18) * 1e18 / denominator != numerator / denominator` if the numerator is < 1e18 (as seen in the `_getEquivalentAmountSyntheticTokensOnTargetSide` function).

- We use mappings of single values almost everywhere. There are lots of places that structs could potentially be used. Our initial version of these contracts used structs, however it became quite unwieldy. Examples include `batched_*` and `userNextPrice_` variables in LongShort.sol and `stakerTokenShiftIndex_*`, `userNextPrice_*` variables in Staker.sol.

- We use a unique method for unit testing. If you are interested in how we unit test you can watch [this youtube video](https://youtu.be/E08d87QHrOo) - the framework is a WIP - but it does its job. We use [smock](https://github.com/ethereum-optimism/optimism/tree/develop/packages/smock) for smocking and some auto-generated code to unit test internal functions (see `contracts/testing/generated/LongShortForInternalMocking.sol` and `contracts/testing/generated/LongShortMockable.sol` as an example). This is why we make almost all of our functions `virtual` - this doesn't affect the security of our contracts once deployed, but it does mean that users who inherit these contracts must take extra care. The `virtual` keyword was added to [solidity 0.6](https://docs.soliditylang.org/en/v0.6.1/060-breaking-changes.html#explicitness-requirements) to make it clear to developers what functions should or shouldn't be inherited.

- FLT token issuance rate [maths](https://www.overleaf.com/read/jpyhjgrvhfkr) is here in latex. This is quite a beast and we are working on a youtube video explaining the logic behind it. The premise is the side supplying more valuable liquidity (the underbalanced side) should earn more FLT by staking per dollar staked as opposed to overbalanced side liquidity being staked. This is to incentivize equal liquidity in long and short positions. The purpose of this function is that it has a horizontal offset and exponent that basically allow us 'tweak' these incentives as we understand how the market reacts to them. The horizontal offset allows us to account for an asymmetric demand and supply, where even at 50/50 liquidity, we might reward one side more due to natural tendency to favour that position. The exponent dictates how strong we want the incentive to be.

- The contracts are intended to be used with DAI and potentially other ERC20 payment tokens with 18 decimal places.

- Internal governance will be managed by a Gnosis Safe with 3 signers of 5 owners affording diversified security and sufficient recoverability.

## How to run the tests

`cd contracts`
`yarn test`

To test deploying this code to a testnet run `truffle develop` then inside the integrated terminal run `migrate`.

**Note on tests** Some of the test are written in truffle (those are the very old tests - most of them can be deprecated), the rest are written with hardhat-waffle (written with [Rescript](https://rescript-lang.org/) but with vendored javascript for convenience).

# Scope

The following contracts are in scope (with their line counts):
| File | Blank lines | comments | All lines of code (excluding Blank Lines and Comments) | statements | branches | functions | Lines (excluding global variable declarations, function signatures , run over lines and event definitions) |
| -------------------- | ----------- | -------- | ------------------------------------------------------ | ---------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| LongShort.sol | 167 | 332 | 739 | 214 | 70 | 45 | 217 |
| Staker.sol | 153 | 272 | 552 | 184 | 64 | 41 | 188 |
| TokenFactory.sol | 13 | 31 | 33 | 9 | 2 | 3 | 10 |
| YieldManagerAave.sol | 40 | 79 | 97 | 42 | 10 | 8 | 43 |
| FloatToken.sol | 9 | 30 | 30 | 10 | 2 | 3 | 10 |
| SyntheticToken.sol | 12 | 60 | 60 | 16 | 6 | 7 | 16 |
| TOTAL | 394 | 804 | 1511 | 475 | 154 | 107 | 484 |

- counted using [cloc](https://github.com/AlDanial/cloc) and [solidity-coverage](https://github.com/sc-forks/solidity-coverage))

### External calls made by our contracts:

- Aave:

  - Deposit into Aave lending pool

  - Withdraw from Aave lending pool

- Chainlink:

  - ‘latestRoundData’ on Chainlink V3 aggregator contracts (via OracleManager - a very very thin wrapper around chainlink oracles - implemented this way for flexibility and evolving oracles)

**Base contracts**

We use OpenZeppelin where possible.

**External Risks**

We use ChainLink as our oracle.

**Network**

We intend to deploy these contracts to Polygon. Existing testnet is deployed to Mumbai at https://float.capital.

## Setup

See Contracts [README.md](/contracts/README.md)
