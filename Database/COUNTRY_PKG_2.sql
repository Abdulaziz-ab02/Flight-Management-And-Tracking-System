--------------------------------------------------------
--  DDL for Package Body COUNTRY_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."COUNTRY_PKG" AS 

    PROCEDURE CREATE_COUNTRY(p_CountryName IN VARCHAR2) AS
    BEGIN
        INSERT INTO Country (CountryName) 
        VALUES (p_CountryName);

        COMMIT;
    END CREATE_COUNTRY;

    PROCEDURE UPDATE_COUNTRY(p_Id IN NUMBER, p_CountryName IN VARCHAR2) AS
    BEGIN
        UPDATE Country 
        SET CountryName = p_CountryName
        WHERE Id = p_Id;

        COMMIT;
    END UPDATE_COUNTRY;

    PROCEDURE DELETE_COUNTRY(p_Id IN NUMBER) AS
    BEGIN
        DELETE FROM Country 
        WHERE Id = p_Id;

        COMMIT;
    END DELETE_COUNTRY;

    PROCEDURE GET_ALL_COUNTRIES AS 
        T_all SYS_REFCURSOR;
    BEGIN
        OPEN T_all FOR
        SELECT * FROM Country;

        DBMS_SQL.RETURN_RESULT(T_all);
    END GET_ALL_COUNTRIES;

    PROCEDURE GET_COUNTRY_BY_ID(p_Id IN NUMBER) AS
        v_CountryName SYS_REFCURSOR;
    BEGIN
        open v_CountryName for
        SELECT CountryName 
        FROM Country 
        WHERE Id = p_Id;

        DBMS_SQL.RETURN_RESULT(v_CountryName);
    END GET_COUNTRY_BY_ID;

END COUNTRY_PKG;

/
