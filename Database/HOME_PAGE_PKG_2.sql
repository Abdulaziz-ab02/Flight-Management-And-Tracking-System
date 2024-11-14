--------------------------------------------------------
--  DDL for Package Body HOME_PAGE_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."HOME_PAGE_PKG" AS 

PROCEDURE GetAll AS
        c_item SYS_REFCURSOR;
    BEGIN
        OPEN c_item FOR 
        SELECT * FROM home;

        DBMS_SQL.RETURN_RESULT(c_item);
    END GetAll;


    PROCEDURE UpdateHome(p_Id IN NUMBER, home_title IN VARCHAR2, home_content IN VARCHAR2, home_image IN varchar2) AS
    BEGIN
        UPDATE home 
        SET hometitle = home_title, 
            homecontent = home_content, 
            homeimage = home_image
        WHERE Id = p_Id;

        COMMIT;
    END UpdateHome;

END home_page_pkg;

/
