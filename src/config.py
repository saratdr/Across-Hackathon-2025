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

TOKENIZED_CSV_PATH = join(DATA_DIR, 'arxiv_tokenized_balanced.csv')

MODELS = ["scibert", "specter", "minilm"]

ARXIV_MAIN_CATEGORIES = ["Computer Science (cs)", "Economics (econ)", "Electrical Engineering and Systems Science (eess)", "Mathematics (math)", "Physics (physics)", "Quantitative Biology (q-bio)", "Quantitative Finance (q-fin)", "Statistics (stat)"]