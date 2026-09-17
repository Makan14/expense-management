# 💰 Expense Management

Application de gestion de dépenses : suivi des transactions, catégories et statistiques.

## 🧱 Architecture

| Partie | Technologie | Rôle |
|---|---|---|
| `backend/` | Django + Django REST Framework + SQLite | L'API (le cerveau 🧠) — port 8000 |
| `frontend/` | Next.js (React + TypeScript) | L'interface (le visage 🎨) — port 3000 |

## 🚀 Démarrage

### 1. Le backend (terminal 1)

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver     # → http://127.0.0.1:8000