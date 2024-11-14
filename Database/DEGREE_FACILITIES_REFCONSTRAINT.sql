--------------------------------------------------------
--  Ref Constraints for Table DEGREE_FACILITIES
--------------------------------------------------------

  ALTER TABLE "C##FLIGHT"."DEGREE_FACILITIES" ADD FOREIGN KEY ("DEGREEID")
	  REFERENCES "C##FLIGHT"."DEGREE" ("ID") ON DELETE SET NULL ENABLE;
  ALTER TABLE "C##FLIGHT"."DEGREE_FACILITIES" ADD FOREIGN KEY ("FACILITYID")
	  REFERENCES "C##FLIGHT"."FACILITY" ("ID") ON DELETE SET NULL ENABLE;
