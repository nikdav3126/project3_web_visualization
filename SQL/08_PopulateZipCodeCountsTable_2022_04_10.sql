-- Insert Statement to populate All ZipCode Counts for identifying single versus duplicate records on CBSA vs ZipCode
INSERT INTO ZipCodeCounts 
(ZipCode,RecordCount)
SELECT cbsa.ZipCode 
,COUNT(cbsa.ZipCode) AS ZipCodeRecordCount
FROM IntergenerationalMobility im 
JOIN ZipCode_CBSA_Mapping cbsa ON im.CBSA=cbsa.CBSA
JOIN Zips zips ON cbsa.ZipCode=zips.US_Zip_Code
GROUP BY cbsa.ZipCode
ORDER BY COUNT(cbsa.ZipCode) DESC