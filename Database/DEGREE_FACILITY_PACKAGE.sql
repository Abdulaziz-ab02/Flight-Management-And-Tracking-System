--------------------------------------------------------
--  DDL for Package DEGREE_FACILITY_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."DEGREE_FACILITY_PACKAGE" AS
PROCEDURE CreateDegreeFacility(Degree_id in number, Facility_id in number);
PROCEDURE UpdateDegreeFacility(dfid in NUMBER, Degree_id in number, Facility_id in number);
PROCEDURE DeleteDegreeFacility(dfid IN NUMBER);
END degree_facility_Package ;

/
