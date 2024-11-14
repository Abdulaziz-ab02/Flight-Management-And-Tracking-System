--------------------------------------------------------
--  Ref Constraints for Table RESERVATION
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."RESERVATION" ADD FOREIGN KEY ("USERID")
	  REFERENCES "C##FLIGHT"."USERS" ("ID") ON DELETE SET NULL ENABLE;
  ALTER TABLE "C##FLIGHT"."RESERVATION" ADD FOREIGN KEY ("FLIGHTID")
	  REFERENCES "C##FLIGHT"."FLIGHT" ("ID") ON DELETE CASCADE ENABLE;
