--------------------------------------------------------
--  DDL for Package USER_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."USER_PKG" 
as 
procedure CreateUser( p_FirstName IN VARCHAR2, p_LastName IN VARCHAR2, p_Email IN VARCHAR2, p_Phone IN VARCHAR2, 
p_DateOfBirth IN DATE, p_Image IN VARCHAR2, p_NationalNumber IN VARCHAR2,p_Username IN VARCHAR2,  p_Password IN VARCHAR2, p_RoleId IN NUMBER); 

PROCEDURE UpdateUser(p_ID IN NUMBER ,
    p_FirstName IN VARCHAR2,
    p_LastName IN VARCHAR2,
    p_Email IN VARCHAR2,
    p_Phone IN VARCHAR2,
    p_DateOfBirth IN DATE,
    p_Image IN VARCHAR2,
    p_NationalNumber IN VARCHAR2,
    p_Username IN VARCHAR2,       
    p_Password IN VARCHAR2         
     ); 
PROCEDURE CheckUserExists (
    p_Username IN VARCHAR2,
    p_Email IN VARCHAR2,
    p_Result OUT VARCHAR2
);

PROCEDURE GetAllUsers;
PROCEDURE GetUserById(U_ID IN NUMBER); 

end USER_PKG;

/
