--------------------------------------------------------
--  Ref Constraints for Table PARTNER
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."PARTNER" ADD FOREIGN KEY ("USERID")
	  REFERENCES "C##FLIGHT"."USERS" ("ID") ON DELETE SET NULL ENABLE;
