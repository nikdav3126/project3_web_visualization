SELECT cbsa.ZipCode,im.AbsoluteUpwardMobility,zips.Latitude,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
	WHERE cbsa.ZipCode IN (SELECT ZipCode FROM ZipCodeCounts
	WHERE RecordCount =1)
UNION ALL
SELECT cbsa.ZipCode,MAX(im.AbsoluteUpwardMobility) AS AbsoluteUpwardMobility,zips.Latitude,zips.Longitude
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
	WHERE cbsa.ZipCode IN (SELECT ZipCode FROM ZipCodeCounts
	WHERE RecordCount >1)
	GROUP BY cbsa.ZipCode,zips.Latitude,zips.Longitude