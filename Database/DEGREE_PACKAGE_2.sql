--------------------------------------------------------
--  DDL for Package Body DEGREE_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."DEGREE_PACKAGE" as
PROCEDURE CreateDegree(Degree_Name in varchar2)
AS
BEGIN
    INSERT INTO degree (id , DegreeName ) 
    VALUES(default, Degree_Name);
    COMMIT;
END CreateDegree;
--
PROCEDURE UpdateDegree(degid in NUMBER, Degree_Name in varchar2)
AS
    BEGIN
    Update degree SET DegreeName = Degree_Name
    WHERE id = degid;
    COMMIT;
END UpdateDegree;
--
PROCEDURE DeleteDegree(degid IN NUMBER)
AS
    BEGIN
    DELETE degree WHERE id = degid;
    COMMIT;
END DeleteDegree;
PROCEDURE GetAllDegrees
AS
    c_all SYS_REFCURSOR;
BEGIN
    OPEN c_all FOR
    SELECT d.id, d.DEGREENAME 
    FROM Degree d;
    
    DBMS_SQL.RETURN_RESULT(c_all);
END GetAllDegrees;

End degree_Package;

/
