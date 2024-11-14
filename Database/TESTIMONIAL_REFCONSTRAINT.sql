--------------------------------------------------------
--  Ref Constraints for Table TESTIMONIAL
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."TESTIMONIAL" ADD FOREIGN KEY ("USERID")
	  REFERENCES "C##FLIGHT"."USERS" ("ID") ON DELETE SET NULL ENABLE;
