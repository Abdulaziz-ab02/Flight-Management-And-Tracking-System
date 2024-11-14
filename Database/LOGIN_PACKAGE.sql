--------------------------------------------------------
--  DDL for Package LOGIN_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."LOGIN_PACKAGE" 
AS
PROCEDURE User_Login(user_name IN VARCHAR,pass IN VARCHAR);
PROCEDURE Airline_Login(user_name IN VARCHAR,pass IN VARCHAR);

END Login_Package;

/
