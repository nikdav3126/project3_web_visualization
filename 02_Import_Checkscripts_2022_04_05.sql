---- Generic Select statement
--SELECT * FROM ZIPCode_CBSA_Mapping

---- Should be 47,484 Records Returned
--SELECT COUNT(ZipCode) FROM ZIPCode_CBSA_Mapping

---- Generic Count statement
--SELECT COUNT(CBSA) FROM ZIPCode_CBSA_Mapping

---- Generic Select statement
--SELECT * FROM  IntergenerationalMobility

---- Should Be 381 Records
--SELECT COUNT(CBSA) FROM  IntergenerationalMobility

----Should be 26,490 Total Records pulled Back
--SELECT COUNT(im.AbsoluteUpwardMobility) AS RecordCount FROM IntergenerationalMobility im JOIN 
--ZIPCode_CBSA_Mapping map on im.CBSA=map.CBSA

---- See how many Zip Codes are associated with a given CBSA
--SELECT CBSA,Count(ZipCode) As CountZips FROM ZIPCode_CBSA_Mapping
--GROUP By CBSA
--ORDER BY Count(ZipCode) DESC

---- See the Abs Upward Mobility for a given CBSA area
--SELECT * FROM  IntergenerationalMobility
--WHERE CBSA ='35620' -- EXAMPLE - NYC/Newark/Jersey City

----Final Data Pull Query (ZipCode/AbsoluteUpwardMobility Values) 26,490 Total Records
SELECT map.ZipCode, im.AbsoluteUpwardMobility FROM IntergenerationalMobility im JOIN 
ZIPCode_CBSA_Mapping map on im.CBSA=map.CBSA
ORDER BY map.ZipCode ASC
