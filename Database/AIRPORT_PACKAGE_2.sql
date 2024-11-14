--------------------------------------------------------
--  DDL for Package Body AIRPORT_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."AIRPORT_PACKAGE" AS

    -- Procedure to create an airport
    PROCEDURE CreateAirport(
        p_AirportName VARCHAR2,
        p_IATACode VARCHAR2,
        p_Longitude NUMBER,
        p_Latitude NUMBER,
        p_AirportImage VARCHAR2,
        p_CityId NUMBER
    ) AS
    BEGIN
        INSERT INTO AIRPORT (
            AIRPORTNAME,
            IATACODE,
            LONGITUDE,
            LATITUDE,
            AIRPORTIMAGE,
            CITYID
        )
        VALUES
        ( 
            p_AirportName,
            p_IATACode,
            p_Longitude,
            p_Latitude,
            p_AirportImage,
            p_CityId
        );
        COMMIT;
    END CreateAirport;

    PROCEDURE UpdateAirport(
        p_ID NUMBER,
        p_AirportName VARCHAR2,
        p_IATACode VARCHAR2,
        p_Longitude NUMBER,
        p_Latitude NUMBER,
        p_AirportImage VARCHAR2,
        p_CityId NUMBER
    ) AS
    BEGIN
        UPDATE AIRPORT
        SET
            AIRPORTNAME = p_AirportName,
            IATACODE = p_IATACode,
            LONGITUDE = p_Longitude,
            LATITUDE = p_Latitude,
            AIRPORTIMAGE = p_AirportImage,
            CITYID = p_CityId
        WHERE ID = p_ID;
        COMMIT;
    END UpdateAirport;

    PROCEDURE DeleteAirport(p_ID NUMBER) AS
    BEGIN
        DELETE FROM AIRPORT WHERE ID = p_ID;
        COMMIT;
    END DeleteAirport;

   PROCEDURE FetchAirportByID(p_ID NUMBER) IS
    c_cursor SYS_REFCURSOR;
BEGIN
    OPEN c_cursor FOR
    SELECT 
        a.ID,
        a.AIRPORTNAME,
        a.IATACODE,
        a.LONGITUDE,
        a.LATITUDE,
        a.AIRPORTIMAGE,
        c.cityname
    FROM AIRPORT a
    INNER JOIN CITY c ON a.cityid = c.id
    WHERE a.ID = p_ID;

    DBMS_SQL.RETURN_RESULT(c_cursor);
END FetchAirportByID;


    PROCEDURE FetchAllAirports IS
    c_cursor SYS_REFCURSOR;
BEGIN
    OPEN c_cursor FOR
        SELECT 
            a.ID,
            a.AIRPORTNAME,
            a.IATACODE,
            a.LONGITUDE,
            a.LATITUDE,
            a.AIRPORTIMAGE,
            c.cityname,
            a.cityid
        FROM AIRPORT a
        INNER JOIN CITY c ON a.cityid = c.id;

    DBMS_SQL.RETURN_RESULT(c_cursor);
END FetchAllAirports;


END AirPort_Package;

/
