--Table to house the ZIPCode/CBSA Mapping
CREATE TABLE ZIPCode_CBSA_Mapping (
ZipCode VARCHAR(5),
CBSA VARCHAR(5))

--Table to house the Absolute Upward Mobility Value
CREATE TABLE IntergenerationalMobility (
CBSA VARCHAR(5) PRIMARY KEY,
AbsoluteUpwardMobility	DECIMAL)



