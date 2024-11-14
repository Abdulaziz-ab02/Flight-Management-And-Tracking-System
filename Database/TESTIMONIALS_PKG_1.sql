--------------------------------------------------------
--  DDL for Package TESTIMONIALS_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "C##FLIGHT"."TESTIMONIALS_PKG" AS 

PROCEDURE CREATE_TESTIMONIAL(T_content in VARCHAR2, T_rating in number , T_date in date, T_status in VARCHAR2, User_id in number);

PROCEDURE DELETE_TESTIMONIAL(T_id in number); 

PROCEDURE GET_ALL_TESTIMONIALS;

PROCEDURE CHANGE_TESTIMONIAL_STATUS(T_id in  number, T_status in VARCHAR2); 

end TESTIMONIALS_PKG; 

/
