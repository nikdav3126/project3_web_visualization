--SELECT df.city,df.overall_rank,df.total_Score FROM DogFriendly df

--SELECT z.primary_city,z.latitude,z.longitude FROM Zips z

-- Dan's 95 records query
SELECT mastercity.primary_city
, mastercity.latitude
, mastercity.longitude
, dogfriendly.total_score
, dogfriendly.overall_rank
FROM mastercity INNER JOIN dogfriendly 
ON mastercity.primary_city=dogfriendly.city
ORDER BY Overall_Rank ASC

--The missing 5 cities (special characters in the city names)
SELECT df.city,df.overall_rank,df.total_Score FROM DogFriendly df
WHERE Overall_Rank IN(6,7,33,37,41)

