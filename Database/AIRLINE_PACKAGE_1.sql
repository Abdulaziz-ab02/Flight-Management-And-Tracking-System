--------------------------------------------------------
--  DDL for Package AIRLINE_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."AIRLINE_PACKAGE" AS
PROCEDURE GetAllAirline;
PROCEDURE GetAirlineById(a_id in number);
PROCEDURE CreateAirline(Airline_Name in varchar2, Airline_image in varchar2,
Airline_Email in varchar2, Airline_Address in varchar2, Activation_Status in varchar2,
a_username in varchar2, a_pass in varchar2, a_roleid in number);
PROCEDURE UpdateAirline(a_id in number, Airline_Name in varchar2, Airline_image in varchar2,
Airline_Email in varchar2, Airline_Address in varchar2, Activation_Status in varchar2,
a_username in varchar2, a_pass in varchar2);
PROCEDURE Change_Activation_Status(a_id in number, Activation_Status in varchar2);
END airline_Package ;

/
