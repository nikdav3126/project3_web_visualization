--Total Records: 182 
SELECT * FROM happiestcities
ORDER BY Overall_Rank ASC

--Total Records: 29,786
SELECT * FROM MasterCity

--Total Records: 182 Reords 
SELECT hc.Overall_Rank
,hc.City AS CityState
,hc.Total_Score
,hc.Emotional_Physical
,hc.Income_Employment
,hc.Community_Environment
,mc.Latitude
,mc.Longitude
FROM HappiestCities hc
JOIN MasterCity mc ON hc.City=mc.primary_city
ORDER BY Overall_Rank ASC

--(Gotta look for the special chars in names - missing 10 records)
--Total Records: 10 - These are the special city names 
SELECT * FROM happiestcities
WHERE Overall_Rank IN (2,3,4,46,81,86,100,129,138,161)
ORDER BY Overall_Rank ASC

--Total Records 10: Identify the missing Cities in the Master City Table
SELECT * FROM MasterCity mc
WHERE mc.Primary_City IN ('Columbia MD','San Francisco CA','San Jose CA','St. Paul MN','St. Louis MO','West Valley City UT','Port St. Lucie FL','St. Petersburg FL','Winston-Salem NC','Lexington-Fayette KY')

--Total Records: 3 - 3 Records need update in Happiest City Table - remove "[...]"
SELECT * FROM MasterCity mc
WHERE mc.Primary_City IN ('Columbia MD','San Francisco CA','San Jose CA')

--Total Records: 1  Records need update in Happiest City Table- Remove the hyphen
SELECT * FROM MasterCity mc
WHERE mc.Primary_City IN ('Winston Salem NC')

--Total Records: 1 -Records need update in Happiest City Table- Remove the hyphenfayette 
SELECT * FROM MasterCity mc
WHERE mc.Primary_City IN ('Lexington KY')

--Total Records: 4 Records need to be updated in Happiest City Table - Change "st." to "Saint"
SELECT * FROM MasterCity mc
WHERE mc.Primary_City IN ('Saint Paul MN','Port Saint Lucie FL','Saint Petersburg FL','Saint Louis MO' )

--Total Records: 1 Records need to be added to Master City Table -'West Valley City UT' - DOES NOT EXIST OTHERWISE!!! 
SELECT * FROM MasterCity mc
WHERE mc.Primary_City like '%UT%'

--Total Records: 2 - These Cities are both 115
SELECT * FROM happiestcities
WHERE Overall_Rank IN (115)
ORDER BY Overall_Rank ASC

-------------------------
--BEGIN UPDATE STATEMENTS
-------------------------
/*
SELECT * FROM happiestcities WHERE Overall_Rank=2 
UPDATE happiestcities SET City='Columbia MD' WHERE Overall_Rank=2
SELECT * FROM happiestcities WHERE Overall_Rank=2 

SELECT * FROM happiestcities WHERE Overall_Rank=3 
UPDATE happiestcities SET City='San Francisco CA' WHERE Overall_Rank=3
SELECT * FROM happiestcities WHERE Overall_Rank=3 

SELECT * FROM happiestcities WHERE Overall_Rank=4 
UPDATE happiestcities SET City='San Jose CA' WHERE Overall_Rank=4
SELECT * FROM happiestcities WHERE Overall_Rank=4 


SELECT * FROM happiestcities WHERE Overall_Rank=129
UPDATE happiestcities SET City='Winston Salem NC' WHERE Overall_Rank=129
SELECT * FROM happiestcities WHERE Overall_Rank=129 

SELECT * FROM happiestcities WHERE Overall_Rank=138
UPDATE happiestcities SET City='Lexington KY' WHERE Overall_Rank=138
SELECT * FROM happiestcities WHERE Overall_Rank=138 

SELECT * FROM happiestcities WHERE Overall_Rank=46
UPDATE happiestcities SET City='Saint Paul MN' WHERE Overall_Rank=46
SELECT * FROM happiestcities WHERE Overall_Rank=46 

SELECT * FROM happiestcities WHERE Overall_Rank=86
UPDATE happiestcities SET City='Port Saint Lucie FL' WHERE Overall_Rank=86
SELECT * FROM happiestcities WHERE Overall_Rank=86 

SELECT * FROM happiestcities WHERE Overall_Rank=100
UPDATE happiestcities SET City='Saint Petersburg FL' WHERE Overall_Rank=100
SELECT * FROM happiestcities WHERE Overall_Rank=100 

SELECT * FROM happiestcities WHERE Overall_Rank=161
UPDATE happiestcities SET City='Saint Louis MO' WHERE Overall_Rank=161
SELECT * FROM happiestcities WHERE Overall_Rank=161 

SELECT * FROM MasterCity mc WHERE mc.Primary_City ='West Valley City UT'
INSERT INTO MasterCity (Primary_City,Latitude,Longitude) VALUES ('West Valley City UT',40.69,-112.00)
SELECT * FROM MasterCity mc WHERE mc.Primary_City ='West Valley City UT'
-----------------------
--END UPDATE STATEMENTS
-----------------------
*/

--Total Records: 10 Reords Corrected Final Update Review Checkscript
SELECT hc.Overall_Rank
,hc.City
,hc.Total_Score
,hc.Emotional_Physical
,hc.Income_Employment
,hc.Community_Environment
,mc.Latitude
,mc.Longitude
FROM HappiestCities hc
JOIN MasterCity mc ON hc.City=mc.primary_city
WHERE Overall_Rank IN (2,3,4,46,81,86,100,129,138,161) 
ORDER BY Overall_Rank ASC
