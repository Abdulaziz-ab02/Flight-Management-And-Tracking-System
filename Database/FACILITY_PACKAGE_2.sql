--------------------------------------------------------
--  DDL for Package Body FACILITY_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."FACILITY_PACKAGE" as

PROCEDURE GetAllFacility
AS
    c_all sys_refcursor;
    BEGIN
    open c_all for select * from Facility;
    Dbms_sql.return_result(c_all);
END GetAllFacility;

PROCEDURE CreateFacility(Facility_Name in varchar2, Facility_image in varchar2)
AS
BEGIN
    INSERT INTO Facility (id , FacilityName, FacilityImage) 
    VALUES(default, Facility_Name, Facility_image);
    COMMIT;
END CreateFacility;
--
PROCEDURE UpdateFacility(facid in NUMBER, Facility_Name in varchar2, Facility_image in varchar2)
AS
    BEGIN
    Update Facility SET FacilityName = Facility_Name, FacilityImage = Facility_image
    WHERE id = facid;
    COMMIT;
END UpdateFacility;
--
PROCEDURE DeleteFacility(facid IN NUMBER)
AS
    BEGIN
    DELETE Facility WHERE id = facid;
    COMMIT;
END DeleteFacility;

End facility_Package;

/
