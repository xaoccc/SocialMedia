# DjangoRestReactGoogleAuth
A self-descriptive app, focused on using google auth using Django and React

1. Install  
    1.1. Backend  
    - Run new terminal in the main dir AND  
    - Create new virtual environment: `py -m venv venv`
    - Activate the backend environment: `venv\Scripts\activate`
    - Install dependencies: `pip install -r requirements.txt`
    - OR install manually each dependence from requirements.txt into your current virtual environment  

    1.2. Front-End  
    - Run new terminal in the frontend dir
    - Install dependencies: `npm i`

2. Setup
    Create a google client ID in the google cloud console. Make sure GOOGLE_OAUTH_CALLBACK_URL from the .env file is there.  
    1.1. Backend:  
    add the appropriate data in the .env file:
    - SECRET_KEY
    - DB_NAME
    - DB_USER
    - DB_PWD
    - DB_PORT
    - DB_HOST
    - GOOGLE_OAUTH_CLIENT_ID
    - GOOGLE_OAUTH_CLIENT_SECRET
    - GOOGLE_OAUTH_CALLBACK_URL

    1.2. Front-End  
    - Add VITE_GOOGLE_OAUTH_CLIENT_ID in the .env file


3. Run  
    1.1. Backend  
    - Run new terminal in the backend dir  
    - Migrate the database: `py manage.py migrate`
    - Run the backend server: `py manage.py runserver`

    1.2. Front-End  
    - Use the open terminal in the frontend dir
    - Run the front-end server: `npm run dev` 


Notes to self:
- Manage likes for replies and make them use the same views and urls as these for the comments
- Improve validation and security
- fix `hook.js:608 No HydrateFallback element provided` error
- Improve CSS




