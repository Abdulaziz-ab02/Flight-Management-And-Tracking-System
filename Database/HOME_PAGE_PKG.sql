--------------------------------------------------------
--  DDL for Package HOME_PAGE_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."HOME_PAGE_PKG" AS 
    PROCEDURE GetAll;
    PROCEDURE UpdateHome(p_Id IN NUMBER, home_title IN VARCHAR2, home_content IN VARCHAR2, home_image IN varchar2);
END home_page_pkg;

/
