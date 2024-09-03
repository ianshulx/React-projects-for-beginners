from sklearn.neighbors import NearestNeighbors
import pandas as pd
import pickle
df_songs = pd.read_csv(r'./data/mergedFile.csv')

"""
Preprocessing
"""
df_features = df_songs.iloc[:,4:17]
df_features.dropna(inplace=True)

"""
Creation of model
"""
model = NearestNeighbors(n_neighbors=15, metric='cosine')
model.fit(df_features.values)

"""
Dumping the model into a pickle file for further use
"""
filename = r'./model/recommendation_model.pkl'
pickle.dump(model, open(filename, 'wb'))

"""
Loading the model and using it for demonstration purposes
"""
loaded_model = pickle.load(open(filename, 'rb'))
query_vector = [0.0555,0.754,142301.0,0.663,0.0,6.0,0.101,-6.311,0.0,0.427,90.195,4.0,0.207]
distances, indices = loaded_model.kneighbors([query_vector])
print(distances)
print(indices)
print(df_songs.loc[indices.flatten()].values)