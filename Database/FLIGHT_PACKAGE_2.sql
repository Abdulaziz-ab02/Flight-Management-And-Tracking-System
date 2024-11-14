--------------------------------------------------------
--  DDL for Package Body FLIGHT_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."FLIGHT_PACKAGE" AS

    PROCEDURE GetAllFlightsData AS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            f.Id,
            f.FlightNumber,
            f.Capacity,
            f.PricePerPassenger,
            f.DepartureDate,
            f.DestinationDate,
            f.Status,
            f.DiscountValue,
            a.AirlineName,
            a.AirlineImage,
            dep_airport.AirportName,
            dep_airport.IATACode,
            dep_airport.Longitude,
            dep_airport.Latitude,
            dep_city.CityName,
            dest_airport.AirportName,
            dest_airport.IATACode,
            dest_airport.Longitude,
            dest_airport.Latitude,
            dest_city.CityName,
            d.DegreeName
        FROM Flight f
        JOIN Airlines a ON f.AirlineId = a.Id
        JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
        JOIN City dep_city ON dep_airport.CityId = dep_city.Id
        JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
        JOIN City dest_city ON dest_airport.CityId = dest_city.Id
        LEFT JOIN Degree d ON f.DegreeId = d.Id;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END GetAllFlightsData;

    PROCEDURE CreateFlight(
        p_FlightNumber VARCHAR2,
        p_Capacity NUMBER,
        p_price NUMBER,
        p_Departure_Date DATE,
        p_Destination_Date DATE,
        p_DiscountValue NUMBER,
        p_AirLineID NUMBER,
        p_DepartureAirportID NUMBER,
        p_DestinationAirportID NUMBER,
        p_DegreeID NUMBER
    ) AS
    BEGIN
        INSERT INTO FLIGHT (
            FLIGHTNUMBER,
            CAPACITY,
            PRICEPERPASSENGER,
            DEPARTUREDATE,
            DESTINATIONDATE,
            STATUS,
            DISCOUNTVALUE,
            AIRLINEID,
            DEPARTUREAIRPORTID,
            DESTINATIONAIRPORTID,
            DEGREEID
        ) VALUES (
            p_FlightNumber,
            p_Capacity,
            p_price,
            p_Departure_Date,
            p_Destination_Date,
            'Scheduled',
            p_DiscountValue,
            p_AirLineID,
            p_DepartureAirportID,
            p_DestinationAirportID,
            p_DegreeID
        );
        COMMIT;
    END CreateFlight;

    PROCEDURE UpdateFlight(
        p_ID NUMBER,
        p_FlightNumber VARCHAR2,
        p_Capacity NUMBER,
        p_price NUMBER,
        p_Departure_Date DATE,
        p_Destination_Date DATE,
        p_DiscountValue NUMBER,
        p_AirLineID NUMBER,
        p_DepartureAirportID NUMBER,
        p_DestinationAirportID NUMBER,
        p_DegreeID NUMBER
    ) AS
    BEGIN
        UPDATE FLIGHT
        SET
            FLIGHTNUMBER = p_FlightNumber,
            CAPACITY = p_Capacity,
            PRICEPERPASSENGER = p_price,
            DEPARTUREDATE = p_Departure_Date,
            DESTINATIONDATE = p_Destination_Date,
            DISCOUNTVALUE = p_DiscountValue,
            AIRLINEID = p_AirLineID,
            DEPARTUREAIRPORTID = p_DepartureAirportID,
            DESTINATIONAIRPORTID = p_DestinationAirportID,
            DEGREEID = p_DegreeID,
            STATUS = 'Scheduled'
        WHERE id = p_ID;
        COMMIT;
    END UpdateFlight;

    PROCEDURE DeleteFlight(p_ID IN NUMBER) AS
    BEGIN
        DELETE FROM FLIGHT WHERE ID = p_ID;
        COMMIT;
    END DeleteFlight;

    PROCEDURE FetchFlightByID(p_ID IN NUMBER) IS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            f.Id,
            f.FlightNumber,
            f.Capacity,
            f.PricePerPassenger,
            f.DepartureDate,
            f.DestinationDate,
            f.Status,
            f.DiscountValue,
            a.AirlineName,
            a.AirlineImage,
            dep_airport.AirportName AS DepartureAirportName,
            dep_airport.IATACode AS DepartureIATACode,
            dep_airport.Longitude AS DepartureLongitude,
            dep_airport.Latitude AS DepartureLatitude,
            dep_city.CityName AS DepartureCityName,
            dest_airport.AirportName AS DestinationAirportName,
            dest_airport.IATACode AS DestinationIATACode,
            dest_airport.Longitude AS DestinationLongitude,
            dest_airport.Latitude DestinationLatitude,
            dest_city.CityName DestinationCityName,
            d.DegreeName
        FROM Flight f
        JOIN Airlines a ON f.AirlineId = a.Id
        JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
        JOIN City dep_city ON dep_airport.CityId = dep_city.Id
        JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
        JOIN City dest_city ON dest_airport.CityId = dest_city.Id
        JOIN Degree d ON f.DegreeId = d.Id
        WHERE f.Id = p_ID;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END FetchFlightByID;

    PROCEDURE FetchFlightByFlightNumber(p_FlightNumber IN VARCHAR2) IS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            f.Id, 
            f.FlightNumber,
            f.Capacity,
            f.PricePerPassenger,
            f.DepartureDate,
            f.DestinationDate,
            f.Status,
            f.DiscountValue,
            a.AirlineName,
            a.AirlineImage,
            dep_airport.AirportName AS DepartureAirportName,
            dep_airport.IATACode AS DepartureIATACode,
            dep_airport.Longitude AS DepartureLongitude,
            dep_airport.Latitude AS DepartureLatitude,
            dep_city.CityName AS DepartureCityName,
            dest_airport.AirportName AS DestinationAirportName,
            dest_airport.IATACode AS DestinationIATACode,
            dest_airport.Longitude AS DestinationLongitude,
            dest_airport.Latitude DestinationLatitude,
            dest_city.CityName DestinationCityName,
            d.DegreeName
        FROM Flight f
        JOIN Airlines a ON f.AirlineId = a.Id
        JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
        JOIN City dep_city ON dep_airport.CityId = dep_city.Id
        JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
        JOIN City dest_city ON dest_airport.CityId = dest_city.Id
        JOIN Degree d ON f.DegreeId = d.Id
        WHERE f.FlightNumber = p_FlightNumber;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END FetchFlightByFlightNumber;
    
    
     PROCEDURE FetchAllFlights IS 
       c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            f.Id,
            f.FlightNumber,
            f.Capacity,
            f.PricePerPassenger,
            f.DepartureDate,
            f.DestinationDate,
            f.Status,
            f.DiscountValue,
            a.AirlineName,
            a.AirlineImage,
            dep_airport.AirportName AS DepartureAirportName,
            dep_airport.IATACode AS DepartureIATACode,
            dep_airport.Longitude AS DepartureLongitude,
            dep_airport.Latitude AS DepartureLatitude,
            dep_city.CityName AS DepartureCityName,
            dest_airport.AirportName AS DestinationAirportName,
            dest_airport.IATACode AS DestinationIATACode,
            dest_airport.Longitude AS DestinationLongitude,
            dest_airport.Latitude DestinationLatitude,
            dest_city.CityName DestinationCityName,
            d.DegreeName
        FROM Flight f
        JOIN Airlines a ON f.AirlineId = a.Id
        JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
        JOIN City dep_city ON dep_airport.CityId = dep_city.Id
        JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
        JOIN City dest_city ON dest_airport.CityId = dest_city.Id
        JOIN Degree d ON f.DegreeId = d.Id;
     DBMS_SQL.RETURN_RESULT(c_cursor);
     END FetchAllFlights;
     
     
PROCEDURE SearchForFlights(
    p_DepartureCityID IN NUMBER,
    p_DestinationCityID IN NUMBER,
    p_DepartureDate IN DATE,
    p_ClassTypeID IN NUMBER
) IS
    c_cursor SYS_REFCURSOR;
BEGIN
    OPEN c_cursor FOR
    SELECT 
        a.AirlineName,
        a.AirlineImage,
          dep_airport.AirportName AS DepartureAirportName,
        dep_airport.IATACode AS DepartureIATACode,
        dest_airport.IATACode AS DestinationIATACode,
        dest_airport.AirportName AS DestinationAirportName,
        dep_city.CityName AS DepartureCityName,
        dep_country.CountryName AS DepartureCountryName,
        dest_city.CityName AS DestinationCityName,
        dest_country.CountryName AS DestinationCountryName,
        d.DegreeName,
        f.PricePerPassenger AS Price,
        f.DepartureDate,
        f.DestinationDate,
        f.id AS FlightId,
        f.flightnumber AS FlightNumber,
        f.discountvalue AS Discountvalue,
        d.id AS DegreeId
    FROM Flight f
    JOIN Airlines a ON f.AirlineId = a.Id
    JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
    JOIN City dep_city ON dep_airport.CityId = dep_city.Id
    JOIN Country dep_country ON dep_city.CountryId = dep_country.Id -- Join for departure country
    JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
    JOIN City dest_city ON dest_airport.CityId = dest_city.Id
    JOIN Country dest_country ON dest_city.CountryId = dest_country.Id -- Join for destination country
    JOIN Degree d ON f.DegreeId = d.Id
    WHERE (p_DepartureCityID IS NULL OR dep_city.Id = p_DepartureCityID) -- Handle null for departure city
      AND (p_DestinationCityID IS NULL OR dest_city.Id = p_DestinationCityID) -- Handle null for destination city
      AND (p_DepartureDate IS NULL OR TRUNC(f.DepartureDate) = p_DepartureDate) -- Handle null for departure date
      AND (p_ClassTypeID IS NULL OR d.Id = p_ClassTypeID)-- Handle null for class type
      AND f.DepartureDate > SYSDATE;
    DBMS_SQL.RETURN_RESULT(c_cursor);
END SearchForFlights;


PROCEDURE FetchAllFacilitesByDegreeId (p_Degreeid Number)
AS 
c_all SYS_REFCURSOR;
BEGIN
open c_all for
Select f.facilityname 
,f.facilityimage 
From Facility f
JOIN Degree_Facilities df ON f.id = df.facilityid
JOIN Degree d ON d.id = df.degreeid
Where d.id = p_Degreeid;
DBMS_SQL.RETURN_RESULT(c_all);

END FetchAllFacilitesByDegreeId;
PROCEDURE GetAllFlightsByAirlineID(p_AirlineID IN NUMBER) IS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            f.Id,
            f.FlightNumber,
            f.Capacity,
            f.PricePerPassenger,
            f.DepartureDate,
            f.DestinationDate,
            f.Status,
            f.DiscountValue,
            a.AirlineName,
            a.AirlineImage,
            dep_airport.AirportName AS DepartureAirportName,
            dep_airport.IATACode AS DepartureIATACode,
            dest_airport.AirportName AS DestinationAirportName,
            dest_airport.IATACode AS DestinationIATACode,
            d.DegreeName
        FROM Flight f
        JOIN Airlines a ON f.AirlineId = a.Id
        JOIN Airport dep_airport ON f.DepartureAirportId = dep_airport.Id
        JOIN Airport dest_airport ON f.DestinationAirportId = dest_airport.Id
        LEFT JOIN Degree d ON f.DegreeId = d.Id
        WHERE f.AirlineId = p_AirlineID;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END GetAllFlightsByAirlineID;
        
    
END Flight_Package;

/
