--------------------------------------------------------
--  DDL for Package Body CONTACT_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."CONTACT_PKG" AS 

PROCEDURE GetAll AS
        c_item SYS_REFCURSOR;
    BEGIN
        OPEN c_item FOR 
        SELECT * FROM contactus;

        DBMS_SQL.RETURN_RESULT(c_item);
    END GetAll;


    PROCEDURE UpdateContact(p_Id IN NUMBER, contact_email IN VARCHAR2, contact_phone IN VARCHAR2, contact_address IN varchar2) AS
    BEGIN
        UPDATE contactus 
        SET contactemail = contact_email, 
            contactphone = contact_phone, 
            contactaddress = contact_address
        WHERE Id = p_Id;

        COMMIT;
    END UpdateContact;

END contact_pkg;

/
