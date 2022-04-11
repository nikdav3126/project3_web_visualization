-- Total Records: 100 Records
SELECT df.Overall_rank
,df.City
,df.Total_Score
,df.Pet_Budget
,df.Pet_Health
,df.Outdoor_Friendliness
FROM DogFriendly df


--Total Records: 29,786
SELECT * FROM MasterCity

-- Total Records: 100 Records
SELECT df.Overall_rank
,df.City
,df.Total_Score
,df.Pet_Budget
,df.Pet_Health
,df.Outdoor_Friendliness
FROM DogFriendly df
JOIN MasterCity mc ON df.City=mc.Primary_City
ORDER BY df.Overall_Rank


-- Total Records: 100 Records
SELECT df.Overall_rank
,df.City
,df.Total_Score
,df.Pet_Budget
,df.Pet_Health
,df.Outdoor_Friendliness
FROM DogFriendly df
WHERE Overall_rank IN (6,7,33,37,41)





