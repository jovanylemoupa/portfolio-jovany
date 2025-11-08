from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mon API",
    description="API pour mon application",
    version="0.1.0"
)

# Configuration CORS pour permettre les requêtes depuis votre frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Remplacer par l'URL de votre frontend Quasar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur mon API FastAPI"}

# Importez et incluez vos routers ici
# from app.api.api import api_router
# app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)