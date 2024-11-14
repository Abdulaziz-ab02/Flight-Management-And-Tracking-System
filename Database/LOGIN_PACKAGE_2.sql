--------------------------------------------------------
--  DDL for Package Body LOGIN_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."LOGIN_PACKAGE" 
AS
PROCEDURE User_Login(user_name IN VARCHAR,pass IN VARCHAR)
AS
c_all SYS_REFCURSOR;
BEGIN
    open c_all for
    SELECT username,roleid, userid, airlineid,u.email
    FROM LOGIN l
    JOIN Users u ON l.userid = u.id
    WHERE username = user_name AND password = pass;
    DBMS_SQL.RETURN_RESULT(c_all);
end User_Login;
PROCEDURE Airline_Login(user_name IN VARCHAR,pass IN VARCHAR)
AS
c_all SYS_REFCURSOR;
BEGIN
    open c_all for
    SELECT username,roleid, airlineid
    FROM LOGIN l 
    JOIN airlines a ON l.Airlineid = a.id
    WHERE username =user_name AND password = pass AND a.activationstatus = 'Approved';
    DBMS_SQL.RETURN_RESULT(c_all);
     END Airline_Login;

END Login_Package;

/
