--SELECT * FROM NaturalDisasters

--SELECT state, COUNT(FY_Declared) AS DisasterCount
--FROM NaturalDisasters
--GROUP BY NaturalDisasters.State
--ORDER BY NaturalDisasters.State ASC

--42522 Records 
SELECT zips.state
, zips.primary_city
, zips.latitude
, zips.longitude 
FROM zips 
--limit 10

--59,392 Records
SELECT naturaldisasters.state
,naturaldisasters.declaration_title 
FROM naturaldisasters
--limit 10

----checkscript Total Pop: 4,520,380
SELECT * FROM income_and_population
WHERE ZipCode='0'
AND State='GA'

----checkscript Total Pop: 4,522,270
SELECT COUNT(ZipCode), SUM(Total_Pop) As TotalPop FROM income_and_population
WHERE State='GA'
AND ZipCode <>'0'

----checkscript Total Pop: 4,522,270
SELECT * FROM income_and_population
WHERE State='GA'
AND ZipCode <>'0'

----checkscript Ordering up Populations - looking for 1,890 discrepancy
SELECT * FROM income_and_population
WHERE State='GA'
AND ZipCode <>'0'
ORDER BY Total_Pop ASC


--SELECT DISTINCT(State) FROM NaturalDisasters

/*
SELECT zips.primary_city
, naturaldisasters.state
, zips.latitude
, zips.longitude
, naturaldisasters.declaration_title 
FROM zips INNER JOIN naturaldisasters on zips.state = naturaldisasters.state
*/