--------------------------------------------------------
--  DDL for Package Body TESTIMONIALS_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "C##FLIGHT"."TESTIMONIALS_PKG" AS 

PROCEDURE CREATE_TESTIMONIAL(T_content in VARCHAR2, T_rating in number , T_date in date, T_status in VARCHAR2, User_id in number)as
begin 
INSERT INTO Testimonial ( testimonialcontent, rating  , testimonialdate, testimonialstatus, Userid)
    VALUES ( T_content,T_rating ,T_date, T_status, User_id);

    COMMIT;
end CREATE_TESTIMONIAL;

PROCEDURE DELETE_TESTIMONIAL(T_id in number)
as
begin 
DELETE FROM Testimonial WHERE id = T_id;

    COMMIT;
end DELETE_TESTIMONIAL;

PROCEDURE GET_ALL_TESTIMONIALS as 
T_all SYS_REFCURSOR ;
begin 
open T_all for
select 
T.ID,
T.TESTIMONIALCONTENT,
T.RATING ,
T.TESTIMONIALDATE,
T.TESTIMONIALSTATUS, 
U.FIRSTNAME,
U.LASTNAME,
U.IMAGE
from testimonial T 
JOIN USERS U ON U.ID= T.USERID;
DBMS_SQL.RETURN_RESULT(T_all);
end GET_ALL_TESTIMONIALS;


PROCEDURE CHANGE_TESTIMONIAL_STATUS(T_id in  number, T_status in VARCHAR2) AS
BEGIN 
 UPDATE Testimonial
    SET TestimonialStatus = T_status
    WHERE id = T_id;

    COMMIT;
END CHANGE_TESTIMONIAL_STATUS;

end TESTIMONIALS_PKG;

/
