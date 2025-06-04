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


notes to self:
- create comment component, comment model, comment view and comment url
- in userData.js create a second api call to fetch the comments data
- The data from both api calls should be stored in two different variables, so we can use it in Home and Comment components
- Create comment structure in react way!
- the same with reply
- comment component will be displayed in the home page here, maybe using map: <section class="comments">




