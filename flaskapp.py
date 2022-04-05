from flask import Flask, jsonify
from sqlalchemy import create_engine
import os
import numpy as np
import json
from decimal import Decimal 


# Connect to POSTGRES
##################################
rds_connection_string = "postgres:postgres@localhost:5432/ziproject"
engine = create_engine(f'postgresql://{rds_connection_string}')



# Flask Setup
##################################

app = Flask(__name__)



# Flask Routes
###################################

@app.route("/")
def welcome():
    '''List Available API Routes'''
    return(
        f'<h2>Available Routes: </h2><br>'
        f'<h3>/api/v1.0/zip-populations</h3>'
        f'<h3>/api/v1.0/populations-latlongs</h3>'
    )


@app.route("/api/v1.0/zip-populations")
def zip_pops():
    # Create our session (link) from Python to the DB


    data = engine.execute("SELECT us_zip_code, estimated_population FROM zips")
    result = json.dumps([dict(r) for r in data])
    return result

@app.route("/api/v1.0/populations-latlongs")

def poplocs():
    
    data = engine.execute("SELECT latitude, longitude, estimated_population FROM zips")
    result = json.dumps([dict(r) for r in data])
    return result

if __name__ == '__main__':
    app.run(debug=True)