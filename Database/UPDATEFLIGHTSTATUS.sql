--------------------------------------------------------
--  DDL for Procedure UPDATEFLIGHTSTATUS
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "C##FLIGHT"."UPDATEFLIGHTSTATUS" AS
BEGIN
  -- Loop through each record in the FLIGHT table
  FOR flight_rec IN (
    SELECT ID, STATUS, DEPARTUREDATE, DESTINATIONDATE
    FROM FLIGHT
  ) LOOP
    -- Check if the status is 'Scheduled' and the current date is past the DEPARTUREDATE
    IF flight_rec.STATUS = 'Scheduled' AND SYSDATE >= flight_rec.DEPARTUREDATE THEN
      UPDATE FLIGHT
      SET STATUS = 'In Air'
      WHERE ID = flight_rec.ID
      AND STATUS = 'Scheduled' -- Double-check condition to ensure consistency
      AND SYSDATE >= DEPARTUREDATE;

    -- Check if the status is 'In Air' and the current date is past the DESTINATIONDATE
    ELSIF flight_rec.STATUS = 'In Air' AND SYSDATE >= flight_rec.DESTINATIONDATE THEN
      UPDATE FLIGHT
      SET STATUS = 'Landed'
      WHERE ID = flight_rec.ID
      AND STATUS = 'In Air' -- Double-check condition to ensure consistency
      AND SYSDATE >= DESTINATIONDATE;
    END IF;
  END LOOP;

  -- Commit the changes
  COMMIT;
END;

/
