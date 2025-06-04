from os.path import dirname, join

# == Path configuration ==
CUR_DIR = dirname(__file__)
DATA_DIR = join(CUR_DIR, '../data')

# == Data paths and Models ==
EMBEDDING_PATHS = {
    "scibert" : join(DATA_DIR, 'arxiv_scibert_embeddings.npy'),
    "specter" : join(DATA_DIR, 'arxiv_specter_embeddings.npy'),
    "minilm" : join(DATA_DIR, 'arxiv_minilm_embeddings.npy')
}

CSV_PATHS = {
    "scibert" : join(DATA_DIR, 'arxiv_scibert_embeddings.csv'),
    "specter" : join(DATA_DIR, 'arxiv_specter_embeddings.csv'),
    "minilm" : join(DATA_DIR, 'arxiv_minilm_embeddings.csv')
}

MODELS = ["scibert", "specter", "minilm"]