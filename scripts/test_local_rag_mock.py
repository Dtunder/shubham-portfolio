import json
import re
from typing import List, Dict, Any

# =============================================================================
# MOCK LOCAL RAG PIPELINE SIMULATION
# =============================================================================
# This script demonstrates a secure, local-first Retrieval-Augmented Generation 
# pipeline. In a production environment, this would interface with a local LLM 
# (like Llama 3 via Ollama) and a Vector Database (like Milvus or ChromaDB).
# =============================================================================

# 1. MOCK KNOWLEDGE BASE
# Simulating data extracted from local PDFs.
MOCK_KNOWLEDGE_BASE = [
    {
        "id": "pdf-001",
        "source": "Corporate_Privacy_Policy_2024.pdf",
        "content": "Our organization ensures all client data is encrypted using AES-256 at rest. No data is transmitted to external cloud providers for processing.",
        "tags": ["security", "privacy", "encryption"]
    },
    {
        "id": "pdf-002",
        "source": "Technical_Architecture_v3.pdf",
        "content": "The RAG pipeline utilizes a local embedding model (all-MiniLM-L6-v2) to generate vectors. These vectors are stored in an encrypted local instance of FAISS.",
        "tags": ["architecture", "rag", "embeddings"]
    },
    {
        "id": "pdf-003",
        "source": "Compliance_Report_Q1.pdf",
        "content": "The system underwent a security audit in March 2024 and was found to be fully compliant with GDPR and CCPA regulations regarding local data processing.",
        "tags": ["compliance", "gdpr", "audit"]
    },
    {
        "id": "pdf-004",
        "source": "User_Manual_Pro.pdf",
        "content": "Users can query the system using natural language. The system retrieves the most relevant context before generating a response using the local model.",
        "tags": ["user-guide", "query", "functionality"]
    }
]

def mock_embedding_search(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """
    Simulates semantic search. 
    In a real RAG, this would convert the query to a vector and perform 
    cosine similarity against a vector database.
    Here, we use keyword overlap as a lightweight proxy.
    """
    query_words = set(re.findall(r'\w+', query.lower()))
    results = []

    for doc in MOCK_KNOWLEDGE_BASE:
        content_words = set(re.findall(r'\w+', doc['content'].lower()))
        # Calculate 'semantic' score based on word intersection
        score = len(query_words.intersection(content_words))
        if score > 0:
            results.append({**doc, "score": score})

    # Sort by score descending
    results.sort(key=lambda x: x['score'], reverse=True)
    return results[:top_k]

def secure_query_pipeline(query: str):
    """
    Simulates the full secure pipeline: 
    Query -> Semantic Search -> Context Retrieval -> Local Generation
    """
    print(f"\n[SECURE PIPELINE] Processing Query: '{query}'")
    print("-" * 60)

    # Step 1: Secure Retrieval
    # Simulate a 'secure' check (e.g., API key or local token)
    print("[SYSTEM] Verifying local access tokens... [OK]")
    
    retrieved_docs = mock_embedding_search(query)
    
    if not retrieved_docs:
        print("[SYSTEM] No relevant local context found.")
        return

    print(f"[SYSTEM] Found {len(retrieved_docs)} relevant document(s) in local vault.")

    # Step 2: Context Construction
    context_text = "\n".join([f"Source {i+1} ({d['source']}): {d['content']}" for i, d in enumerate(retrieved_docs)])
    
    # Step 3: Simulated Local LLM Generation
    # In reality, this context would be sent to a local LLM with a system prompt.
    print("[SYSTEM] Generating response using local LLM instance...")
    
    # Mock generation logic based on retrieved context
    sources = [d['source'] for d in retrieved_docs]
    
    response = "Based on our local records, "
    query_lower = query.lower()
    if any(word in query_lower for word in ["encryption", "encrypt", "security", "secure"]):
        response += "our organization uses AES-256 encryption for all data at rest, ensuring no external cloud exposure."
    elif any(word in query_lower for word in ["gdpr", "compliance", "compliant", "audit"]):
        response += "the system is fully compliant with GDPR and CCPA, as confirmed by the Q1 security audit."
    else:
        response += "the RAG system processes your data locally using embedding models and a secure vector store."

    # Final Output with Citations
    print("\n--- AI RESPONSE (SECURE LOCAL) ---")
    print(response)
    print("\n--- SOURCES & CITATIONS ---")
    for doc in retrieved_docs:
        print(f" - [{doc['source']}] (Relevance Score: {doc['score']})")
    print("-" * 60)

if __name__ == "__main__":
    # Example queries for demonstration
    demo_queries = [
        "How is my data encrypted?",
        "Is the system GDPR compliant?",
        "How do embeddings work in this RAG?"
    ]

    print("==========================================================")
    print("      LOCAL SECURE RAG PIPELINE DEMONSTRATION             ")
    print("==========================================================")
    
    for q in demo_queries:
        secure_query_pipeline(q)
