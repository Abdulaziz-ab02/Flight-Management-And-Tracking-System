--------------------------------------------------------
--  DDL for Package Body CITY_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."CITY_PKG" AS 

    PROCEDURE CREATE_CITY(p_CityName IN VARCHAR2, p_CityImage IN VARCHAR2, p_CountryId IN NUMBER) AS
    BEGIN
        INSERT INTO City (CityName, CityImage, CountryId)
        VALUES (p_CityName, p_CityImage, p_CountryId);

        COMMIT;
    END CREATE_CITY;

    PROCEDURE UPDATE_CITY(p_Id IN NUMBER, p_CityName IN VARCHAR2, p_CityImage IN VARCHAR2, p_CountryId IN NUMBER) AS
    BEGIN
        UPDATE City 
        SET CityName = p_CityName, 
            CityImage = p_CityImage, 
            CountryId = p_CountryId
        WHERE Id = p_Id;

        COMMIT;
    END UPDATE_CITY;

    PROCEDURE DELETE_CITY(p_Id IN NUMBER) AS
    BEGIN
        DELETE FROM City WHERE Id = p_Id;

        COMMIT;
    END DELETE_CITY;

    PROCEDURE GET_ALL_CITIES AS
        v_Cities SYS_REFCURSOR;
    BEGIN
        OPEN v_Cities FOR 
        SELECT * FROM City;

        DBMS_SQL.RETURN_RESULT(v_Cities);
    END GET_ALL_CITIES;

    PROCEDURE GET_CITY_BY_ID(p_Id IN NUMBER) AS
        c_all SYS_REFCURSOR;
    BEGIN
        open c_all for
        SELECT CityName, CityImage, CountryId
        FROM City 
        WHERE Id = p_Id;

        DBMS_SQL.RETURN_RESULT(c_all);
    END GET_CITY_BY_ID;

    PROCEDURE GET_CITIES_BY_COUNTRY(p_CountryId IN NUMBER) AS
        v_Cities SYS_REFCURSOR;
    BEGIN
        OPEN v_Cities FOR 
        SELECT * FROM City
        WHERE CountryId = p_CountryId;

        DBMS_SQL.RETURN_RESULT(v_Cities);
    END GET_CITIES_BY_COUNTRY;

END CITY_PKG;

/
