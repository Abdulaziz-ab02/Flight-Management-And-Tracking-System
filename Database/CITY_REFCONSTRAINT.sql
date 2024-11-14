--------------------------------------------------------
--  Ref Constraints for Table CITY
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."CITY" ADD FOREIGN KEY ("COUNTRYID")
	  REFERENCES "C##FLIGHT"."COUNTRY" ("ID") ON DELETE CASCADE ENABLE;
