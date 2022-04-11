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

-- Stitch the the Clean Records with the Cleaned Duplicated Records
UNION ALL
	
-- CLEANED UP WONKY RECORDS AND RETURN SINGLE RECORD PER ZIP CODE By looking for max Upward Mobility value for a given Zip Code. 
--Total Records: 1,258
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
	GROUP BY cbsa.ZipCode,zips.Latitude,zips.Longitude