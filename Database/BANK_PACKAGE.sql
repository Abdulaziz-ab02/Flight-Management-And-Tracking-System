--------------------------------------------------------
--  DDL for Package BANK_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."BANK_PACKAGE" AS
    PROCEDURE PaymentCheck(
        p_CardNumber IN NUMBER,
        p_CVV IN NUMBER,
        p_ExpiryDate IN DATE,
        p_Balance IN NUMBER,
        p_Result OUT BOOLEAN
    );
END BANK_PACKAGE;

/
