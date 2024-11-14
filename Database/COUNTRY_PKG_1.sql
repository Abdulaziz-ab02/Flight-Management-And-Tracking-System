--------------------------------------------------------
--  DDL for Package COUNTRY_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."COUNTRY_PKG" AS 


    PROCEDURE CREATE_COUNTRY(p_CountryName IN VARCHAR2);
    PROCEDURE UPDATE_COUNTRY(p_Id IN NUMBER, p_CountryName IN VARCHAR2);
    PROCEDURE DELETE_COUNTRY(p_Id IN NUMBER);
    PROCEDURE GET_ALL_COUNTRIES;
    PROCEDURE GET_COUNTRY_BY_ID(p_Id IN NUMBER);

END COUNTRY_PKG;

/
