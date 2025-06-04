import pandas as pd
import numpy as np
import src.config as config

def clean_text_column(series):
    """
    Clean a pandas Series containing text data by removing newlines and normalizing whitespace.
    Args:
        series (pd.Series): The Series to clean.
    Returns:
        pd.Series: The cleaned Series with newlines replaced by spaces and extra whitespace normalized.
    """

    return (
        series.astype(str)
        .str.replace(r"\\n", " ", regex=True)  # replace literal '\n' (escaped in CSV)
        .str.replace(r"\n", " ", regex=True)   # replace real newlines (if any)
        .str.replace(r"\s+", " ", regex=True)  # normalize whitespace
        .str.strip()
    )

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
        data = pd.read_csv(config.TOKENIZED_CSV_PATH)
        data['title'] = clean_text_column(data['title'])
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