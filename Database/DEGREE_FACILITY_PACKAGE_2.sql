--------------------------------------------------------
--  DDL for Package Body DEGREE_FACILITY_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."DEGREE_FACILITY_PACKAGE" as

PROCEDURE CreateDegreeFacility(Degree_id in number, Facility_id in number)
AS
BEGIN
    INSERT INTO degree_facilities (id , DegreeId, FacilityId) 
    VALUES(default, Degree_id, Facility_id);
    COMMIT;
END CreateDegreeFacility;
--
PROCEDURE UpdateDegreeFacility(dfid in NUMBER, Degree_id in number, Facility_id in number)
AS
    BEGIN
    Update degree_facilities SET DegreeId = Degree_id, FacilityId = Facility_id
    WHERE id = dfid;
    COMMIT;
END UpdateDegreeFacility;
--
PROCEDURE DeleteDegreeFacility(dfid IN NUMBER)
AS
    BEGIN
    DELETE degree_facilities WHERE id = dfid;
    COMMIT;
END DeleteDegreeFacility;



End degree_facility_Package;

/
