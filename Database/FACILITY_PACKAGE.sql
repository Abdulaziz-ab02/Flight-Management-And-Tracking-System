--------------------------------------------------------
--  DDL for Package FACILITY_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."FACILITY_PACKAGE" AS
PROCEDURE GetAllFacility;
PROCEDURE CreateFacility(Facility_Name in varchar2, Facility_image in varchar2);
PROCEDURE UpdateFacility(facid in NUMBER, Facility_Name in varchar2, Facility_image in varchar2);
PROCEDURE DeleteFacility(facid IN NUMBER);
END facility_Package ;

/
