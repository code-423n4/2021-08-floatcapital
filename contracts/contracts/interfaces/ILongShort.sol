// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.8.3;

interface ILongShort {
  /*╔════════════════════════════╗
    ║           EVENTS           ║
    ╚════════════════════════════╝*/

  event LongShortV1(address admin, address tokenFactory, address staker);

  event SystemStateUpdated(
    uint32 marketIndex,
    uint256 updateIndex,
    int256 underlyingAssetPrice,
    uint256 longValue,
    uint256 shortValue,
    uint256 longPrice,
    uint256 shortPrice
  );

  event SyntheticMarketCreated(
    uint32 marketIndex,
    address longTokenAddress,
    address shortTokenAddress,
    address paymentToken,
    int256 initialAssetPrice,
    string name,
    string symbol,
    address oracleAddress,
    address yieldManagerAddress
  );

  event NextPriceRedeem(
    uint32 marketIndex,
    bool isLong,
    uint256 synthRedeemed,
    address user,
    uint256 oracleUpdateIndex
  );

  event NextPriceSyntheticPositionShift(
    uint32 marketIndex,
    bool isShiftFromLong,
    uint256 synthShifted,
    address user,
    uint256 oracleUpdateIndex
  );

  event NextPriceDeposit(
    uint32 marketIndex,
    bool isLong,
    uint256 depositAdded,
    address user,
    uint256 oracleUpdateIndex
  );

  event OracleUpdated(uint32 marketIndex, address oldOracleAddress, address newOracleAddress);

  event NewMarketLaunchedAndSeeded(uint32 marketIndex, uint256 initialSeed);

  event ExecuteNextPriceMintSettlementUser(address user, uint32 marketIndex, bool isLong, uint256 amount);

  event ExecuteNextPriceRedeemSettlementUser(address user, uint32 marketIndex, bool isLong, uint256 amount);

  event ExecuteNextPriceMarketSideShiftSettlementUser(
    address user,
    uint32 marketIndex,
    bool isShiftFromLong,
    uint256 amount
  );

  event ExecuteNextPriceSettlementsUser(address user, uint32 marketIndex);

  function updateSystemState(uint32 marketIndex) external;

  function updateSystemStateMulti(uint32[] calldata marketIndex) external;

  function getUsersConfirmedButNotSettledSynthBalance(
    address user,
    uint32 marketIndex,
    bool isLong
  ) external view returns (uint256 confirmedButNotSettledBalance);

  function executeOutstandingNextPriceSettlementsUser(address user, uint32 marketIndex) external;

  function shiftPositionNextPrice(
    uint32 marketIndex,
    uint256 amountSyntheticTokensToShift,
    bool isShiftFromLong
  ) external;

  function shiftPositionFromLongNextPrice(uint32 marketIndex, uint256 amountSyntheticTokensToShift) external;

  function shiftPositionFromShortNextPrice(uint32 marketIndex, uint256 amountSyntheticTokensToShift) external;

  function getAmountSyntheticTokenToMintOnTargetSide(
    uint32 marketIndex,
    uint256 amountSyntheticTokenShiftedFromOneSide,
    bool isShiftFromLong,
    uint256 priceSnapshotIndex
  ) external view returns (uint256 amountSynthShiftedToOtherSide);

  function mintLongNextPrice(uint32 marketIndex, uint256 amount) external virtual;

  function mintShortNextPrice(uint32 marketIndex, uint256 amount) external virtual;
}
