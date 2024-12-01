from fastapi import FastAPI
from fastapi.responses import JSONResponse
from googleapiclient.discovery import build
from google.oauth2 import service_account
from flask import Flask, jsonify, request

app = FastAPI()

@app.get("/get_sheet_data")
def get_sheet_data():
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    SERVICE_ACCOUNT_FILE = "api/keysheet.json"

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )

    # Replace with your spreadsheet ID
    SAMPLE_SPREADSHEET_ID = "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY"