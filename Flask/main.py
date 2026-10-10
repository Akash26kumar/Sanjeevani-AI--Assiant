import os
import sys
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

# Ensure 'src' is in the import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.app import app  # Import Flask app after setting up the path

# Load environment variables
load_dotenv()

def setup_pinecone():
    try:
        # Set up Pinecone connection
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        pc = Pinecone(api_key=pinecone_api_key)

        # Get index name from .env
        index_name = os.getenv("PINECONE_INDEX_NAME")

        # Delete existing index if it exists
        # if index_name in pc.list_indexes().names():
        #     pc.delete_index(index_name)
        #     print(f"Deleted existing index '{index_name}'")

        # Create a new index with 768 dimensions
        # pc.create_index(
        #     name=index_name,
        #     dimension=768, 
        #     metric='cosine', 
        #     spec=ServerlessSpec(
        #         cloud='aws',  
        #         region='us-east-1',
        #     ),
        # )
        print(f"Pinecone client ready (index: '{index_name}').")
    except Exception as err:
        print("Error setting up Pinecone:", err)

# Initialize Pinecone at import time
setup_pinecone()

# Expose the Flask app as 'application' for WSGI
application = app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))  # Fallback to 8000 if not set
    print(f"Server listening on port {port}")
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug, port=port, host="0.0.0.0")
