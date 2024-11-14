--------------------------------------------------------
--  DDL for Package Body USER_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."USER_PKG" 
as
PROCEDURE CreateUser (
        p_FirstName IN VARCHAR2,
        p_LastName IN VARCHAR2,
        p_Email IN VARCHAR2,
        p_Phone IN VARCHAR2,
        p_DateOfBirth IN DATE,
        p_Image IN VARCHAR2,
        p_NationalNumber IN VARCHAR2,
        p_Username IN VARCHAR2,         
        p_Password IN VARCHAR2,         
        p_RoleId IN NUMBER 
      
        
    ) AS
        v_UserId NUMBER;
    BEGIN

        INSERT INTO Users (FirstName, LastName, Email, Phone, DateOfBirth, Image, NationalNumber)
        VALUES (p_FirstName, p_LastName, p_Email, p_Phone, p_DateOfBirth, p_Image, p_NationalNumber)
        RETURNING ID INTO v_UserId;  


        DBMS_OUTPUT.PUT_LINE('Generated UserId: ' || v_UserId);

        -- Insert into Login table using the generated UserId
        INSERT INTO Login (Username, Password, RoleId, userid)
        VALUES (p_Username, p_Password, p_RoleId, v_UserId);

        COMMIT;
    END CreateUser;


 PROCEDURE  UpdateUser(
    p_ID IN NUMBER,            
    p_FirstName IN VARCHAR2,
    p_LastName IN VARCHAR2,
    p_Email IN VARCHAR2,
    p_Phone IN VARCHAR2,
    p_DateOfBirth IN DATE,
    p_Image IN VARCHAR2,
    p_NationalNumber IN VARCHAR2,  
    p_Username IN VARCHAR2,        
    p_Password IN VARCHAR2       

) AS
BEGIN
    -- Update Users table
    UPDATE users
    SET
        FirstName = p_FirstName,
        LastName = p_LastName,
        Email = p_Email,
        Phone = p_Phone,
        DateOfBirth = p_DateOfBirth,
        Image = p_Image,
        NationalNumber = p_NationalNumber
    WHERE ID = p_ID;     

    UPDATE Login
    SET
        Username = p_Username,
        Password = p_Password
    WHERE userid = p_ID;       

    COMMIT;                       
END  UpdateUser;

PROCEDURE GetAllUsers AS
    U_all SYS_REFCURSOR;
BEGIN
    OPEN U_all FOR
    SELECT 
        u.ID,
        u.FirstName,
        u.LastName,
        u.Email,
        u.Phone,
        u.DateOfBirth,
        u.Image,
        u.NationalNumber,
        l.Username  
    FROM 
        Users u
    JOIN 
        Login l ON u.ID = l.Userid
        where l.roleid = 2;
    DBMS_SQL.RETURN_RESULT(U_all);
END GetAllUsers;



PROCEDURE GetUserById(U_ID IN NUMBER) AS
    U_all SYS_REFCURSOR;
BEGIN
    OPEN U_all FOR
    SELECT 
     u.ID,
        u.FirstName,
        u.LastName,
        u.Email,
        u.Phone,
        u.DateOfBirth,
        u.Image,
        u.NationalNumber,
        l.Username ,
        l.password,
        l.roleid
    FROM 
        Users u
    JOIN 
        Login l ON u.ID = l.Userid  
    WHERE 
        u.ID = U_ID;

    DBMS_SQL.RETURN_RESULT(U_all);
END GetUserById;
PROCEDURE CheckUserExists (
    p_Username IN VARCHAR2,
    p_Email IN VARCHAR2,
    p_Result OUT VARCHAR2
) AS
    v_Temp VARCHAR2(1); -- Temporary variable to hold query results
BEGIN
    BEGIN
        -- Try to select the username in the Login table
        SELECT 'X' INTO v_Temp
        FROM Login
        WHERE username = p_Username;

        -- If no exception was raised, username exists
        p_Result := 'username';
        RETURN;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            NULL; -- Username doesn't exist, continue to check email
    END;

    BEGIN
        -- Try to select the email in the Users table
        SELECT 'X' INTO v_Temp
        FROM Users
        WHERE email = p_Email;

        -- If no exception was raised, email exists
        p_Result := 'email';
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Neither username nor email exists
            p_Result := 'none';
    END;
END CheckUserExists;




end user_pkg;

/
