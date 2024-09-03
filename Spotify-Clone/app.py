from flask import Flask, send_from_directory, send_file, request, jsonify
from recommendations.recommender import getRecommendations
import json
import io
import os
import dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from yt_dlp import YoutubeDL
from ytmusicapi import YTMusic
from contextlib import redirect_stdout


# For environment variables
dotenv.load_dotenv()

app = Flask(__name__, 
            static_url_path='/', 
            static_folder='frontend/build/')

# Spotify API Setup
spotify_client_id = os.getenv('SPOTIFY_CLIENT_ID')
spotify_client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret))

# Youtube Search API setup
ytmusic = YTMusic()

"""
Get audio features for a track using the spotify track id
"""
def get_audio_features(trackId):
    results = sp.audio_features(trackId)
    # print(results)
    return results[0]

"""
Get track metadata details for a list of tracks using track id
"""
def get_track_metadata(trackId_list):
    results = sp.tracks(trackId_list)

    data = []
    for track in results["tracks"]:
        track_name = track['name']
        track_id = track['id']
        track_type = track['album']['album_type']
        preview_url = track['preview_url']
        artist_name = track['artists'][0]['name']
        thumbnail_url=track['album']['images'][0]['url']
        data.append({
            "title": track_name,
            "artist": artist_name,
            "image": thumbnail_url,
            "type": "artist" if track_type == "single" else "album",
            "id": track_id,
            "preview_url": preview_url
        })

    if not data:
        print(f"No results on Spotify.")
    
    with open("recommendations_processed_results.json", "w") as file:
        json.dump(data, file, indent=2)
        
    return data

"""
Search songs from spotify using a search term that is the name of the song
"""
def search_songs(song_name):
    results = sp.search(q=song_name, type='track', limit=10)  
    # print(results)
    with open("spotify_results.json", "w") as file:
        json.dump(results, file, indent=2)
    
    data = []
    for track in results['tracks']['items']:
        track_name = track['name']
        track_id = track['id']
        track_type = track['album']['album_type']
        preview_url = track['preview_url']
        artist_name = track['artists'][0]['name']
        thumbnail_url=track['album']['images'][0]['url']
        data.append({
            "title": track_name,
            "artist": artist_name,
            "image": thumbnail_url,
            "type": "artist" if track_type == "single" else "album",
            "id": track_id,
            "preview_url": preview_url
        })

    if not data:
        print(f"No results found for '{song_name}' on Spotify.")
    
    with open("processed_results.json", "w") as file:
        json.dump(data, file, indent=2)
        
    return data

"""
Get the youtube id of the song from the song title and artist name
"""
def get_youtube_link(track_name, artist_name):

    youtube_query = f"{track_name} {artist_name}"
    search_results = ytmusic.search(youtube_query, "songs")

    if not search_results:
        return "No results found on YouTube."

    with open("youtube_results.json", "w") as file:
        json.dump(search_results, file, indent=2)

    # print(search_results[0])
    return search_results[0]['videoId']

@app.route('/')
def home():
   return send_from_directory('frontend/build', 'index.html')

@app.route('/api/search', methods=['POST'])
def search():
    search = request.form['search_box']
    search_results = search_songs(search)
    return jsonify(search_results), 200

@app.route('/api/stream')
def stream():
    artist = request.args.get("artist")
    song = request.args.get("song")
    print(song)
    print(artist)
    song_yt_id = get_youtube_link(song, artist)
    youtube_url = f"https://www.youtube.com/watch?v={song_yt_id}"
    ctx = {
        "outtmpl": "-",
        'logtostderr': True,
        'format': 'mp3/bestaudio/best',
        'postprocessors': [{  # Extract audio using ffmpeg
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }]
    }

    buffer = io.BytesIO()
    with redirect_stdout(buffer), YoutubeDL(ctx) as foo:
        foo.download([youtube_url])

    print(buffer.getbuffer().nbytes)
    buffer.seek(0)  # Move the buffer position to the beginning
    return send_file(buffer, mimetype='audio/mpeg')

@app.route('/api/recommend/<trackId>')
def recommend(trackId):
    audio_features = get_audio_features(trackId)
    keys = ['acousticness', 'danceability',
       'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness',
       'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']
    feature_vector = [audio_features.get(key) for key in keys]
    recommendations = getRecommendations(feature_vector)

    with open("recommendation_results.json", "w") as file:
        json.dump(recommendations, file, indent=2)

    song_data = get_track_metadata([track.get("id") for track in recommendations])
    return jsonify(song_data)

if __name__ == '__main__':
    app.run(debug=True)