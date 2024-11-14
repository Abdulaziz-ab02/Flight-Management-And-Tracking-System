--------------------------------------------------------
--  DDL for Package Body ABOUT_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."ABOUT_PKG" AS 

PROCEDURE GetAll AS
        c_item SYS_REFCURSOR;
    BEGIN
        OPEN c_item FOR 
        SELECT * FROM aboutus;

        DBMS_SQL.RETURN_RESULT(c_item);
    END GetAll;


    PROCEDURE UpdateAbout(p_Id IN NUMBER, about_title IN VARCHAR2, about_content IN VARCHAR2, about_image IN VARCHAR2) AS
    BEGIN
        UPDATE aboutus 
        SET abouttitle = about_title, 
            aboutcontent = about_content, 
            aboutimage = about_image
        WHERE Id = p_Id;

        COMMIT;
    END UpdateAbout;

END about_pkg;

/
