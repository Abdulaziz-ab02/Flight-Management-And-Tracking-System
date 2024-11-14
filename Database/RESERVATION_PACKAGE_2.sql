--------------------------------------------------------
--  DDL for Package Body RESERVATION_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."RESERVATION_PACKAGE" AS

    PROCEDURE CreateReservation(
        p_ReservationDate DATE,
        p_TotalPrice NUMBER,
        p_NumOfPassengers NUMBER,
        p_UserID NUMBER,
        p_FlightID NUMBER
    ) AS
    BEGIN
        INSERT INTO RESERVATION (
            RESERVATIONDATE,
            TOTALPRICE,
            NUMOFPASSENGERS,
            USERID,
            FLIGHTID
        ) VALUES (
            p_ReservationDate,
            p_TotalPrice,
            p_NumOfPassengers,
            p_UserID,
            p_FlightID
        );
        COMMIT;
    END CreateReservation;

    PROCEDURE FetchReservationsByUserID(p_UserID NUMBER) IS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            r.ID,
            r.RESERVATIONDATE,
            r.TOTALPRICE,
            r.NUMOFPASSENGERS,
            u.FirstName,
            u.LastName,
            f.FlightNumber,
            f.DepartureDate,
            f.DestinationDate
        FROM RESERVATION r
        JOIN USERS u ON r.USERID = u.ID
        JOIN FLIGHT f ON r.FLIGHTID = f.ID
        WHERE r.USERID = p_UserID;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END FetchReservationsByUserID;
    
    
        PROCEDURE FetchReservationsByID(p_id NUMBER)
        IS
          c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            r.ID,
            r.RESERVATIONDATE,
            r.TOTALPRICE,
            r.NUMOFPASSENGERS,
            u.FirstName,
            u.LastName,
            f.FlightNumber,
            f.DepartureDate,
            f.DestinationDate
        FROM RESERVATION r
        JOIN USERS u ON r.USERID = u.ID
        JOIN FLIGHT f ON r.FLIGHTID = f.ID
        WHERE r.id = p_id;
        DBMS_SQL.RETURN_RESULT(c_cursor);
        END FetchReservationsByID;
        


    -- Procedure to fetch all reservations
    PROCEDURE FetchAllReservations IS
        c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            r.ID,
            r.RESERVATIONDATE,
            r.TOTALPRICE,
            r.NUMOFPASSENGERS,
            u.FirstName,
            u.LastName,
            f.FlightNumber,
            f.DepartureDate,
            f.DestinationDate
        FROM RESERVATION r
        JOIN USERS u ON r.USERID = u.ID
        JOIN FLIGHT f ON r.FLIGHTID = f.ID;

        DBMS_SQL.RETURN_RESULT(c_cursor);
    END FetchAllReservations;
    PROCEDURE SearchReservation(fName in varchar2 , lName in varchar2, flightNum in varchar2, DateFrom in date , DateTo in date)
As
    Get_Cur SYS_REFCURSOR;
    Begin
    open Get_Cur for 
    select 
            r.ID,
            r.RESERVATIONDATE,
            r.TOTALPRICE,
            r.NUMOFPASSENGERS,
            u.FirstName,
            u.LastName,
            f.FlightNumber,
            f.DepartureDate,
            f.DestinationDate
    from RESERVATION r
    join USERS u ON r.USERID = u.ID
    join FLIGHT f ON r.FLIGHTID = f.ID
    where (upper(u.FirstName) like '%'||upper(fName) ||'%') -- null
    And (upper(u.LastName) like '%' || upper( lName) || '%') -- S
    And (flightNum is null or upper(f.FlightNumber) = upper(flightNum))
    And ((DateFrom IS NULL AND DateTo IS NULL) -- If both dates are NULL, return all
        OR (DateFrom IS NOT NULL AND DateTo IS NULL AND r.RESERVATIONDATE >= DateFrom) -- From specific date onwards
        OR (DateTo IS NOT NULL AND DateFrom IS NULL AND r.RESERVATIONDATE <= DateTo) -- Up to specific date
        OR (DateFrom IS NOT NULL AND DateTo IS NOT NULL AND r.RESERVATIONDATE BETWEEN DateFrom AND DateTo) -- Between DateFrom and DateTo
    );
    dbms_sql.return_result(Get_Cur);
End SearchReservation;
 PROCEDURE GetMonthlyTotalPrice (
    from_date IN DATE,
    to_date IN DATE
)
AS
    Get_Cur SYS_REFCURSOR;
BEGIN
    OPEN Get_Cur FOR
    SELECT 
        TO_CHAR(RESERVATIONDATE, 'YYYY-MM') AS month,
        SUM(TOTALPRICE) AS total_price
    FROM 
        Reservation
    WHERE 
        RESERVATIONDATE BETWEEN from_date AND to_date
    GROUP BY 
        TO_CHAR(RESERVATIONDATE, 'YYYY-MM')
    ORDER BY 
        TO_CHAR(RESERVATIONDATE, 'YYYY-MM');
    
    -- Use DBMS_SQL.RETURN_RESULT to return the cursor result to the caller
    DBMS_SQL.RETURN_RESULT(Get_Cur);
    
END;
PROCEDURE GetEntityCounts(
    p_airports OUT NUMBER,
    p_users OUT NUMBER,
    p_reservations OUT NUMBER,
    p_airlines OUT NUMBER
) AS
BEGIN
    -- Assign values directly to the OUT parameters
    SELECT COUNT(*) INTO p_airports FROM airport;
    SELECT COUNT(*) INTO p_users FROM Users;
    SELECT COUNT(*) INTO p_reservations FROM Reservation;
    SELECT COUNT(*) INTO p_airlines FROM Airlines;
END;
 PROCEDURE FetchReservationsByAirline(p_id NUMBER)
        IS
          c_cursor SYS_REFCURSOR;
    BEGIN
        OPEN c_cursor FOR
        SELECT 
            r.ID,
            r.RESERVATIONDATE,
            r.TOTALPRICE,
            r.NUMOFPASSENGERS,
            u.FirstName,
            u.LastName,
            f.FlightNumber,
            f.DepartureDate,
            f.DestinationDate
        FROM RESERVATION r
        JOIN USERS u ON r.USERID = u.ID
        JOIN FLIGHT f ON r.FLIGHTID = f.ID
        JOIN AIRLINES a ON f.AIRLINEID = a.ID
        WHERE a.id = p_id;
        DBMS_SQL.RETURN_RESULT(c_cursor);
        
END FetchReservationsByAirline;



END Reservation_Package;

/
