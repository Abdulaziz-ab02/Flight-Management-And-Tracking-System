--------------------------------------------------------
--  DDL for Package Body AIRLINE_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."AIRLINE_PACKAGE" as

PROCEDURE GetAllAirline
AS
    c_all sys_refcursor;
    BEGIN
    open c_all for select a.id, a.airlinename, a.airlineimage, a.airlineemail,
                          a.airlineaddress, a.activationstatus,
                          l.username 
    from Airlines a
    join login l
    on a.id = l.airlineid;
    Dbms_sql.return_result(c_all);
END GetAllAirline;
--
PROCEDURE GetAirlineById(a_id in number)
AS
    c_item sys_refcursor;
    BEGIN
    open c_item for select a.id, a.airlinename, a.airlineimage, a.airlineemail,
                          a.airlineaddress, a.activationstatus,
                          l.username, l.password
    from Airlines a
    join login l
    on a.id = l.airlineid
    where a.id = a_id;
    Dbms_sql.return_result(c_item);
END GetAirlineById;
--
PROCEDURE CreateAirline(Airline_Name in varchar2, Airline_image in varchar2,
Airline_Email in varchar2, Airline_Address in varchar2, Activation_Status in varchar2,
a_username in varchar2, a_pass in varchar2, a_roleid in number)
AS
    v_airid NUMBER;
BEGIN
    INSERT INTO Airlines (id, AirlineName, AirlineImage, AirlineEmail, AirlineAddress, ActivationStatus) 
    VALUES(default, Airline_Name, Airline_image, Airline_Email, Airline_Address, Activation_Status)
    RETURNING ID INTO v_airid;

    INSERT INTO Login (id, username, password, roleid, userid, airlineid)
    VALUES(default, a_username, a_pass, a_roleid, null, v_airid);

    COMMIT;
END CreateAirline;
--
PROCEDURE UpdateAirline(a_id in number, Airline_Name in varchar2, Airline_image in varchar2,
Airline_Email in varchar2, Airline_Address in varchar2, Activation_Status in varchar2,
a_username in varchar2, a_pass in varchar2)
AS
    BEGIN
    Update Airlines SET AirlineName = Airline_Name, AirlineImage = Airline_image, AirlineEmail = Airline_Email,
                    AirlineAddress = Airline_Address, ActivationStatus = Activation_Status
    WHERE id = a_id;

    Update Login SET username = a_username, password = a_pass
    WHERE airlineid = a_id;


    COMMIT;
END UpdateAirline;
--
PROCEDURE Change_Activation_Status(a_id in number, Activation_Status in varchar2)
AS
    BEGIN
    Update Airlines SET ActivationStatus = Activation_Status
    WHERE id = a_id;
    COMMIT;
END Change_Activation_Status;

End airline_Package;

/
