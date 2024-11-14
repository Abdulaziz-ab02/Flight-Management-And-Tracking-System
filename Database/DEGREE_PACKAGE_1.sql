--------------------------------------------------------
--  DDL for Package DEGREE_PACKAGE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."DEGREE_PACKAGE" AS
PROCEDURE CreateDegree(Degree_Name in varchar2);
PROCEDURE UpdateDegree(degid in NUMBER, Degree_Name in varchar2);
PROCEDURE DeleteDegree(degid IN NUMBER);
PROCEDURE GetAllDegrees;
END degree_Package ;

/
