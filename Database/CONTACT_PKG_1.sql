--------------------------------------------------------
--  DDL for Package CONTACT_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."CONTACT_PKG" AS 
    PROCEDURE GetAll;
    PROCEDURE UpdateContact(p_Id IN NUMBER, contact_email IN VARCHAR2, contact_phone IN VARCHAR2, contact_address IN varchar2);
END contact_pkg;

/
