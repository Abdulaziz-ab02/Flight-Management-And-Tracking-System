--------------------------------------------------------
--  DDL for Package PARTENER_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."PARTENER_PKG" AS

PROCEDURE CreatePartner(F_NAME IN VARCHAR2, L_NAME IN VARCHAR2,NATIONAL_NUM IN VARCHAR2,U_ID IN NUMBER);

PROCEDURE GetPartnersByUser(  p_UserId IN NUMBER);


END  PARTENER_PKG;

/
