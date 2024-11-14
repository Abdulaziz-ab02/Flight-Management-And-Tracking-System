--------------------------------------------------------
--  DDL for Package ABOUT_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."ABOUT_PKG" AS 
    PROCEDURE GetAll;
    PROCEDURE UpdateAbout(p_Id IN NUMBER, about_title IN VARCHAR2, about_content IN VARCHAR2, about_image IN VARCHAR2);
END about_pkg;

/
