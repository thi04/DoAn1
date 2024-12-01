import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Khởi tạo Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Khởi tạo biến môi trường từ file .env
load_dotenv()

# Lấy thông tin từ file .env
SERVICE_ACCOUNT_FILE = os.getenv("SERVICE_ACCOUNT_FILE")
SPREADSHEET_ID = os.getenv("GOOGLE_SHEET_ID")
DRIVE_FOLDER_ID = os.getenv("GOOGLE_DRIVE_FOLDER_ID")

# Xác định phạm vi cho Google Sheets và Drive APIs
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# Xác thực và khởi tạo API clients
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
sheets_service = build("sheets", "v4", credentials=credentials)
drive_service = build("drive", "v3", credentials=credentials)



# Google Sheets: Lấy dữ liệu từ Google Sheets
@app.route("/sheet", methods=["GET"])
def get_sheet_data():
    RANGE_NAME = "Sheet1!A2:Z"
    result = sheets_service.spreadsheets().values().get(
        spreadsheetId = SPREADSHEET_ID,
        range = RANGE_NAME
    ).execute()
    rows = result.get("values", [])
    return jsonify(rows)

# Google Sheets: Danh sách các tệp trong thư mục
@app.route("/drive/file", methods=["GET"])
def list_drive_files():
    query = f"'{DRIVE_FOLDER_ID}' in parents"
    results = drive_service.files().list(q=query, pageSize=10).execute()
    files = results.get("files", [])
    file_list = [{"name": file["name"], "id": file["id"]} for file in files]
    return jsonify(file_list)

# Google Drive: Tải tệp lên Google Drive
@app.route("/drive/upload", methods=["POST"])
def upload_drive_file():
    # Lấy dữ liệu từ request
    uploaded_file = request.files.get["file"]
    if uploaded_file:
        file_metadata = {
            "name": uploaded_file.filename,
            "parents": [DRIVE_FOLDER_ID] # Nếu muốn lưu vào thư mục cụ thể
        }
        media = MediaFileUpload(uploaded_file, resumable=True)
        file = drive_service.files().create(body=file_metadata, media_body=media, fields="id").execute()
        return jsonify({"message": "File uploaded", "file_id": file['id']})
    else:
        return jsonify({"message": "No file uploaded"}), 400
    
# Chạy ứng dụng
if __name__ == "__main__":
    app.run(debug=True)
    
   
