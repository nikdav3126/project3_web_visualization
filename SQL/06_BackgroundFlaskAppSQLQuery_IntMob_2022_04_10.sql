--Total Records: 381 - Table which has Mobility Data
SELECT * FROM IntergenerationalMobility

--Total Records: 47,484 - Table which maps Zip Codes to CBSA Codes
SELECT * FROM ZipCode_CBSA_Mapping

--Total Records: 42,522 - Table with Zip Code/Lat/Long Data
SELECT * FROM Zips

--Total Records: 26,454 (Down from 26,490)  All Zip Codes that have Mobility Data, and Lat/Long Data  (NOTE DUPLICATES)
SELECT cbsa.ZipCode
,cbsa.CBSA
,im.AbsoluteUpwardMobility
,zips.Latitude
,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code


--Total Records: 26,454 (Down from 26,490) 
SELECT cbsa.ZipCode
,cbsa.CBSA
,im.AbsoluteUpwardMobility
,zips.Latitude
,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code


--Total Records: 25,143 Distinct ZipCodes  (23,885 single zip code records / 1,258 duplicated zip codes - cross two or more CBSA areas)
SELECT DISTINCT(cbsa.ZipCode)
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code


--Total Records Grouped By Count (NOTE: 1,258 Duplicated Zip Codes)
SELECT cbsa.ZipCode 
,COUNT(cbsa.ZipCode) AS ZipCodeRecordCount
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
GROUP BY cbsa.ZipCode
ORDER BY COUNT(cbsa.ZipCode) DESC

--Create a temporary table to hold the count of zip codes versus CBSA codes
CREATE TEMPORARY TABLE ZipCodeCounts
(ZipCode VARCHAR(5)
,RecordCount INT)

-- Insert Statement to populate All ZipCode Counts
INSERT INTO ZipCodeCounts 
(ZipCode,RecordCount)
SELECT cbsa.ZipCode 
,COUNT(cbsa.ZipCode) AS ZipCodeRecordCount
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
GROUP BY cbsa.ZipCode
ORDER BY COUNT(cbsa.ZipCode) DESC

-- See all Zip Codes that are part of multiple CBSA Codes scenario (Identify the 1,258 Zip Codes for exclusion)
SELECT * FROM ZipCodeCounts
WHERE RecordCount >1

-- See all Zip Codes that have only 1 record
SELECT * FROM ZipCodeCounts
WHERE RecordCount =1

--CLEAN DATA
--Total Records: 23,885 Clean single Zip Code Records
SELECT cbsa.ZipCode
--,cbsa.CBSA
,im.AbsoluteUpwardMobility
,zips.Latitude
,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
	-- SubQuery for finding single Records
	WHERE cbsa.ZipCode IN (SELECT ZipCode FROM ZipCodeCounts
	WHERE RecordCount =1)


--WONKY RECORDS
--Total Records: 2,569 Total Records (NOTE: Duplicates on all 1,258 zips, from 2 to 4 duplicates per zip code))
SELECT cbsa.ZipCode
,cbsa.CBSA
,im.AbsoluteUpwardMobility
,zips.Latitude
,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
	-- SubQuery for finding Duplicated Records
	WHERE cbsa.ZipCode IN (SELECT ZipCode FROM ZipCodeCounts
	WHERE RecordCount >1)
	
	
-- CLEANED UP WONKY RECORDS AND RETURN SINGLE RECORD PER ZIP CODE By looking for max Upward Mobility value for a given Zip Code. 
--Total Records: 
SELECT cbsa.ZipCode
--,cbsa.CBSA
,MAX(im.AbsoluteUpwardMobility) AS AbsoluteUpwardMobility
,zips.Latitude
,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
	-- SubQuery for finding Duplicated Records
	WHERE cbsa.ZipCode IN (SELECT ZipCode FROM ZipCodeCounts
	WHERE RecordCount >1)
	--AND cbsa.zipCode ='01010'	
	GROUP BY cbsa.ZipCode,zips.Latitude,zips.Longitude
	
	
	

