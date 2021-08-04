open LetOps;
open StakerHelpers;
open Mocha;
open Globals;

let getRequiredAmountOfBitShiftForSafeExponentiation = (number, exponent) => {
  let amountOfBitShiftRequired = ref(bnFromInt(0));
  let targetMaxNumberSizeBinaryDigits = bnFromInt(256)->div(exponent);

  // Note this can be optimised, this gets a quick easy to compute safe upper bound, not the actuall upper bound.
  let targetMaxNumber = twoBn->pow(targetMaxNumberSizeBinaryDigits);

  while (number
         ->div(twoBn->pow(amountOfBitShiftRequired.contents))
         ->bnGt(targetMaxNumber)) {
    amountOfBitShiftRequired := amountOfBitShiftRequired.contents->add(oneBn);
  };
  amountOfBitShiftRequired.contents;
};

let test =
    (
      ~contracts: ref(Helpers.coreContracts),
      ~accounts: ref(array(Ethers.Wallet.t)),
    ) => {
  let marketIndex = 1;

  let (kVal, longPrice, shortPrice, randomValueLocked1, randomValueLocked2) =
    Helpers.Tuple.make5(Helpers.randomTokenAmount);

  describe("calculateFloatPerSecond", () => {
    let calculateFloatPerSecondPerPaymentTokenLocked =
        (
          ~underBalancedSideValue,
          ~exponent,
          ~equilibriumOffsetMarket,
          ~totalLocked,
          ~requiredBitShifting,
        ) => {
      let overflowProtectionDivision = twoBn->pow(requiredBitShifting);

      let numerator =
        underBalancedSideValue
        ->sub(equilibriumOffsetMarket)
        ->div(overflowProtectionDivision->div(twoBn))
        ->pow(exponent);
      let denominator =
        totalLocked
        ->div(overflowProtectionDivision)
        ->pow(exponent)
        ->div(tenToThe18);

      let overBalancedSideRate = numerator->div(denominator)->div(twoBn);
      let underBalancedSideRate = tenToThe18->sub(overBalancedSideRate);
      Chai.expectTrue(underBalancedSideRate->bnGte(overBalancedSideRate));
      (overBalancedSideRate, underBalancedSideRate);
    };

    let balanceIncentiveCurve_exponent = ref(None->Obj.magic);

    before_each(() => {
      let%Await _ =
        deployAndSetupStakerToUnitTest(
          ~functionName="_calculateFloatPerSecond",
          ~contracts,
          ~accounts,
        );
      let%Await balanceIncentiveCurve_exponentFetched =
        contracts^.staker->Staker.balanceIncentiveCurve_exponent(marketIndex);
      balanceIncentiveCurve_exponent := balanceIncentiveCurve_exponentFetched;

      StakerSmocked.InternalMock.mock_getKValueToReturn(kVal);
    });

    let testHelper = (~longPrice, ~shortPrice, ~longValue, ~shortValue) => {
      let totalLocked = longValue->add(shortValue);

      let requiredBitShifting = bnFromInt(52);

      let%Await result =
        contracts^.staker
        ->Staker.Exposed._calculateFloatPerSecondExposed(
            ~marketIndex,
            ~longPrice,
            ~shortPrice,
            ~longValue,
            ~shortValue,
          );

      let longFloatPerSecond: Ethers.BigNumber.t = result.longFloatPerSecond;
      let shortFloatPerSecond: Ethers.BigNumber.t = result.shortFloatPerSecond;
      if (longValue->bnGte(shortValue)) {
        let (longRate, shortRate) =
          calculateFloatPerSecondPerPaymentTokenLocked(
            ~underBalancedSideValue=shortValue,
            ~exponent=balanceIncentiveCurve_exponent^,
            ~equilibriumOffsetMarket=CONSTANTS.zeroBn,
            ~totalLocked,
            ~requiredBitShifting,
          );

        let longRateScaled =
          longRate->mul(kVal)->mul(longPrice)->div(tenToThe18);
        let shortRateScaled =
          shortRate->mul(kVal)->mul(shortPrice)->div(tenToThe18);
        longFloatPerSecond->Chai.bnEqual(longRateScaled);
        shortFloatPerSecond->Chai.bnEqual(shortRateScaled);
      } else {
        let (shortRate, longRate) =
          calculateFloatPerSecondPerPaymentTokenLocked(
            ~underBalancedSideValue=longValue,
            ~exponent=balanceIncentiveCurve_exponent^,
            ~equilibriumOffsetMarket=CONSTANTS.zeroBn,
            ~totalLocked,
            ~requiredBitShifting,
          );

        let longRateScaled =
          longRate->mul(kVal)->mul(longPrice)->div(tenToThe18);
        let shortRateScaled =
          shortRate->mul(kVal)->mul(shortPrice)->div(tenToThe18);
        longFloatPerSecond->Chai.bnEqual(longRateScaled);
        shortFloatPerSecond->Chai.bnEqual(shortRateScaled);
      };
    };

    describe(
      "returns correct longFloatPerSecond and shortFloatPerSecond for each market side and calls getKValue correctly",
      () => {
        it("longValue > shortValue", () => {
          let%Await _ =
            testHelper(
              ~longValue=randomValueLocked1->add(randomValueLocked2),
              ~shortValue=randomValueLocked2,
              ~longPrice,
              ~shortPrice,
            );
          ();
        });
        it("longValue < shortValue", () => {
          let%Await _ =
            testHelper(
              ~longValue=randomValueLocked1,
              ~shortValue=randomValueLocked1->add(randomValueLocked2),
              ~longPrice,
              ~shortPrice,
            );
          ();
        });
      },
    );
    it("calls getKValue correctly", () => {
      StakerSmocked.InternalMock.mock_getKValueToReturn(kVal);

      let%Await _result =
        contracts^.staker
        ->Staker.Exposed._calculateFloatPerSecondExposed(
            ~marketIndex,
            ~longPrice,
            ~shortPrice,
            ~longValue=randomValueLocked1,
            ~shortValue=randomValueLocked2,
          );

      let call =
        StakerSmocked.InternalMock._getKValueCalls()->Array.getUnsafe(0);
      call->Chai.recordEqualFlat({marketIndex: marketIndex});
    });
    it("reverts for empty markets", () => {
      Chai.expectRevertNoReason(
        ~transaction=
          contracts^.staker
          ->Staker.Exposed._calculateFloatPerSecondExposed(
              ~marketIndex,
              ~longPrice=CONSTANTS.zeroBn,
              ~shortPrice=CONSTANTS.zeroBn,
              ~longValue=CONSTANTS.zeroBn,
              ~shortValue=CONSTANTS.zeroBn,
            )
          ->Obj.magic,
      )
    });
  });
};
