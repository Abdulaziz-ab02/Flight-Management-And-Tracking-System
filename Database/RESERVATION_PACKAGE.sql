--------------------------------------------------------
--  DDL for Package RESERVATION_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."RESERVATION_PACKAGE" AS

    PROCEDURE CreateReservation(
        p_ReservationDate DATE,
        p_TotalPrice NUMBER,
        p_NumOfPassengers NUMBER,
        p_UserID NUMBER,
        p_FlightID NUMBER
    );

    PROCEDURE FetchReservationsByUserID(p_UserID NUMBER);
    PROCEDURE FetchReservationsByID(p_id NUMBER);
    PROCEDURE FetchAllReservations;
    PROCEDURE SearchReservation(fName in varchar2 , lName in varchar2, flightNum in varchar2, DateFrom in date , DateTo in date);
PROCEDURE GetMonthlyTotalPrice (
    from_date IN DATE,
    to_date IN DATE
);
 PROCEDURE GetEntityCounts(
    p_airports OUT NUMBER,
    p_users OUT NUMBER,
    p_reservations OUT NUMBER,
    p_airlines OUT NUMBER
);
 PROCEDURE FetchReservationsByAirline(p_id NUMBER);

END Reservation_Package;

/
