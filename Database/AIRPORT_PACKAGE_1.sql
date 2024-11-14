--------------------------------------------------------
--  DDL for Package AIRPORT_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."AIRPORT_PACKAGE" AS

    PROCEDURE CreateAirport(
        p_AirportName VARCHAR2,
        p_IATACode VARCHAR2,
        p_Longitude NUMBER,
        p_Latitude NUMBER,
        p_AirportImage VARCHAR2,
        p_CityId NUMBER
    );

    -- Procedure to update an airport
    PROCEDURE UpdateAirport(
        p_ID NUMBER,
        p_AirportName VARCHAR2,
        p_IATACode VARCHAR2,
        p_Longitude NUMBER,
        p_Latitude NUMBER,
        p_AirportImage VARCHAR2,
        p_CityId NUMBER
    );

    PROCEDURE DeleteAirport(p_ID NUMBER);

    PROCEDURE FetchAirportByID(p_ID NUMBER);

    PROCEDURE FetchAllAirports;

END AirPort_Package;

/
