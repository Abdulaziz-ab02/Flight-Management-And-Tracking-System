--------------------------------------------------------
--  Ref Constraints for Table AIRPORT
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."AIRPORT" ADD FOREIGN KEY ("CITYID")
	  REFERENCES "C##FLIGHT"."CITY" ("ID") ON DELETE CASCADE ENABLE;
