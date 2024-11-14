--------------------------------------------------------
--  DDL for Package Body BANK_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."BANK_PACKAGE" AS
  PROCEDURE PaymentCheck(
        p_CardNumber IN NUMBER,
        p_CVV IN NUMBER,
        p_ExpiryDate IN DATE,
        p_Balance IN NUMBER,
        p_Result OUT BOOLEAN
    ) IS
        v_AccountBalance NUMBER;
    BEGIN
        -- Check if account with provided details exists and fetch balance
        SELECT balance INTO v_AccountBalance
        FROM BANK
        WHERE CARDNUMBER = p_CardNumber
          AND cvv = p_CVV
          AND TRUNC(EXPIRYDATE) = TRUNC(p_ExpiryDate);

        -- Check if balance is sufficient for withdrawal
        IF v_AccountBalance >= p_Balance THEN
            -- Withdraw amount from account
            UPDATE BANK
            SET balance = balance - p_Balance
            WHERE CARDNUMBER = p_CardNumber
              AND cvv = p_CVV
              AND TRUNC(EXPIRYDATE) = TRUNC(p_ExpiryDate);

            -- Commit the transaction
            COMMIT;

            -- Indicate successful transaction
            p_Result := TRUE;
        ELSE
            -- Insufficient balance
            p_Result := FALSE;
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Account does not exist or details do not match
            p_Result := FALSE;
        WHEN OTHERS THEN
            -- Handle any other errors
            p_Result := FALSE;
    END PaymentCheck;

END BANK_PACKAGE;

/
