--------------------------------------------------------
--  DDL for Package CITY_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."CITY_PKG" AS 

    PROCEDURE CREATE_CITY(p_CityName IN VARCHAR2, p_CityImage IN VARCHAR2, p_CountryId IN NUMBER);
    PROCEDURE UPDATE_CITY(p_Id IN NUMBER, p_CityName IN VARCHAR2, p_CityImage IN VARCHAR2, p_CountryId IN NUMBER);
    PROCEDURE DELETE_CITY(p_Id IN NUMBER);
    PROCEDURE GET_ALL_CITIES;
    PROCEDURE GET_CITY_BY_ID(p_Id IN NUMBER);
    PROCEDURE GET_CITIES_BY_COUNTRY(p_CountryId IN NUMBER);

END CITY_PKG;

/
