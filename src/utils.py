import pandas as pd
import numpy as np
import src.config as config

def load_embedding(model):
    """
    Load the precomputed embeddings and metadata for a specified model.
   
    Args:
        model (str): The model name to load embeddings for. Must be one of the keys in config.MODELS.
    Returns:
        tuple: A tuple containing:
            - pd.DataFrame: The metadata DataFrame.
            - np.ndarray: The embeddings array.
    Raises:
        ValueError: If the model is not recognized or if there is an error loading the data.
    """

    if model not in config.MODELS:
        raise ValueError(f"Model {model} not recognized. Available models: {config.MODELS}")
    
    try:
        data = pd.read_csv(config.CSV_PATHS[model])
        embeddings = np.load(config.EMBEDDING_PATHS[model])
        return data, embeddings
    except Exception as e:
        raise ValueError(f"Error loading data for model {model}: {e}")
    
def get_pdf_url(id):
    """
    Generate an arxiv PDF URL for a given paper ID.
    
    Args:
        id (str): The paper ID.
        
    Returns:
        str: The URL to the PDF of the paper.
    """
    return f"https://arxiv.org/pdf/{id}.pdf"