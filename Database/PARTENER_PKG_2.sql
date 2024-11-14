--------------------------------------------------------
--  DDL for Package Body PARTENER_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."PARTENER_PKG" AS

 PROCEDURE CreatePartner(
    F_Name IN VARCHAR2,
    L_NAME IN VARCHAR2,
    NATIONAL_NUM IN VARCHAR2,
    U_ID IN NUMBER
) AS
BEGIN
    INSERT INTO Partner(FIRSTNAME, LASTNAME,NATIONALNUMBER,USERID)
    VALUES (F_NAME,L_NAME,NATIONAL_NUM,U_ID);

    COMMIT;
END CreatePartner;




 PROCEDURE GetPartnersByUser(
    p_UserId IN NUMBER
) AS
    v_partners SYS_REFCURSOR;
BEGIN
    OPEN v_partners FOR
        SELECT
        p.id,
        P.FIRSTNAME AS PartnerFirstName,
        P.LASTNAME AS PartnerLastName,
        P.NATIONALNUMBER,
        U.FIRSTNAME AS UserFirstName,
        U.LASTNAME AS UserLastName,
        p.userid

        FROM Partner P 
        JOIN USERS U ON U.ID= P.USERID

        WHERE P.UserId = p_UserId;

    DBMS_SQL.RETURN_RESULT(v_partners);
END GetPartnersByUser;



END PARTENER_PKG;

/
