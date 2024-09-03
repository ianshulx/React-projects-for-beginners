import pandas as pd
import os
import pickle
module_path = os.path.dirname(__file__)
df_songs = pd.read_csv(os.path.join(module_path, r'data/mergedFile.csv'))
loaded_model = pickle.load(open(os.path.join(module_path, r'model/recommendation_model.pkl'), 'rb'))

def getRecommendations(query_vector):
    distances, indices = loaded_model.kneighbors([query_vector])
    similarity_scores = 1 - distances.flatten()
    df_recommended = df_songs.loc[indices.flatten()]
    df_recommended["similarity"] = similarity_scores
    print(df_recommended[["id", "similarity"]].to_dict(orient="records"))
    return df_recommended[["id", "similarity"]].to_dict(orient="records")
