from sklearn.metrics.pairwise import cosine_similarity

class Recommender:
    def __init__(self, df, embeddings, model):
        self.df = df
        self.embeddings = embeddings
        self.model = model

    def query(self, text, top_n=5):
        match = self.df[self.df['title'].str.contains(text, case=False, na=False)] 
        if match.empty:
            self.df[self.df['abstract'].str.contains(text, case=False, na=False)]
        if not match.empty:
            idx = match.index[0]    
            query_embedding = self.embeddings[idx].reshape(1, -1)
            similarities = cosine_similarity(query_embedding, self.embeddings).flatten()
            top_indices = similarities.argsort()[-top_n:][::-1]
            results = self.df.iloc[top_indices].copy()
            results['similarity'] = similarities[top_indices]
            return results[['id', 'title', 'authors', 'abstract', 'categories', 'main_category', 'similarity']].to_dict(orient='records')
        else:
            raise ValueError(f"No papers found with title containing '{text}'.")
        
    def get_by_category(self, category, top_n=10):
        if category not in self.df['main_category'].unique():
            raise ValueError(f"Category '{category}' not found in the dataset.")
        
        category_df = self.df[self.df['main_category'] == category]
        category_embeddings = self.embeddings[category_df.index]
        
        similarities = cosine_similarity(category_embeddings, self.embeddings).mean(axis=0)
        top_indices = similarities.argsort()[-top_n:][::-1]
        
        results = self.df.iloc[top_indices].copy()
        results['similarity'] = similarities[top_indices]
        return results[['id', 'title', 'authors', 'abstract', 'categories', 'main_category', 'similarity']].to_dict(orient='records')