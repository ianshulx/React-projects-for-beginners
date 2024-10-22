from flask import Flask, jsonify, send_file , request , g
from pymongo.errors import PyMongoError
from database import db_connection 
from bson import ObjectId
from datetime import datetime
from flask_cors import CORS , cross_origin
import numpy
from create_pdf import create_pdf
from create_pdf1 import create_pdf_notes
app = Flask(__name__)
CORS(app)

@app.route("/testServer",methods=["GET"])
def testServer() :
    return jsonify({"ok" : "ok"})

@app.route("/getAllNotes",methods=["POST"])
def getFile() : 
    return jsonify({"ok" : "ok"})

        
@app.route('/fetchANote', methods=["POST"])
def fetch_a_note():
    try:
        print("API called")
        note = request.get_json()
        print(note)
        print(note['user'])
        note_data = {
        'title': note['title'],
        'description': note['description'],
        'tag': note['tag'],
        'email' : note['email'],
        'date': datetime(2024, 10, 17, 16, 16, 12, 551000),  
        }

        logo_path = "C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\public\\assets\\logo2.png"
        pdf_path = create_pdf(note_data, logo_path)  
        return send_file(pdf_path, as_attachment=True)
    except Exception as error:
        print(error)
        return jsonify({"error": "some error occurred"}), 400

    except Exception as error:
        print(error)
        return jsonify({"error": "some error occurred"}), 400
@app.route("/downloadAllNotes",methods=["POST"])
def downLoadAllNotes() :
    try : 
        print("All Downloading Called")
        notesData = request.get_json()
        print(notesData)
        logo_path = "C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\public\\assets\\logo2.png"
        pdf_path = create_pdf_notes(notes_data=notesData,logo_path=logo_path)
        return send_file(pdf_path, as_attachment=True)
    except Exception as error : 
        print(error)
        return jsonify({"error": "some error occurred"}), 400
def testServer() :
    return jsonify({"ok" : "ok"})

if __name__ == "__main__":
    app.run(debug=True)