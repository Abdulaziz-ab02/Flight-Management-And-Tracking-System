--------------------------------------------------------
--  DDL for Package FLIGHT_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."FLIGHT_PACKAGE" AS
    PROCEDURE GetAllFlightsData;
    
    PROCEDURE CreateFlight(
        p_FlightNumber       VARCHAR2,     
        p_Capacity           NUMBER,
        p_price              NUMBER,
        p_Departure_Date     DATE,
        p_Destination_Date   DATE,
        p_DiscountValue      NUMBER,
        p_AirLineID          NUMBER,
        p_DepartureAirportID NUMBER,
        p_DestinationAirportID NUMBER,
        p_DegreeID           NUMBER
    );
    
    PROCEDURE UpdateFlight(
        p_ID                NUMBER,
        p_FlightNumber      VARCHAR2,     
        p_Capacity          NUMBER,
        p_price             NUMBER,
        p_Departure_Date    DATE,
        p_Destination_Date  DATE,
        p_DiscountValue     NUMBER,
        p_AirLineID         NUMBER,
        p_DepartureAirportID NUMBER,
        p_DestinationAirportID NUMBER,
        p_DegreeID          NUMBER
    );
    
    PROCEDURE DeleteFlight(p_ID IN NUMBER);  -- 
    PROCEDURE FetchFlightByID(p_ID IN NUMBER); 
    PROCEDURE FetchFlightByFlightNumber(p_FlightNumber IN VARCHAR2); 
    PROCEDURE FetchAllFlights;
     PROCEDURE SearchForFlights(
    p_DepartureCityID IN NUMBER,
    p_DestinationCityID IN NUMBER,
    p_DepartureDate IN DATE,
    p_ClassTypeID IN NUMBER
);
PROCEDURE FetchAllFacilitesByDegreeId (p_Degreeid Number);
PROCEDURE GetAllFlightsByAirlineID(p_AirlineID IN NUMBER);

END Flight_Package;

/
