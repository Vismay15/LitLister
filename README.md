# Documentation

initial setup documentation

# Table of Contents

- [Command-Line](#command-line)
- [Directory](#directory)
  - [Back-End](#directory-back-end)
  - [Front-End](#directory-front-end)
- [To-Do](#to-do)
  - [Back-End](#to-do-back-end)
  - [Front-End](#to-do-front-end)

# <a name="command-line">Command-Line</a>

Initial start:  
`npm start`

Iterative start (no front-end update):  
`npm run start-server`

Iterative start (no back-end update):  
`cd front-end && npm run build && cd .. && npm run run-server`

Iterative start (no update):  
`npm run run-server`

# <a name="directory">Directory</a>

## <a name="directory-back-end">Back-End</a>

### directory workspace:

### `/`

### folders and files:

- `/`: root folder
  - `bin/`: contains main file
    - `www`: main file
  - `database/`: contains db api; we don't have any api yet
  - `front-end/`: ignore this folder; it only contains front-end stuff
  - `Milestones/`: ignore this folder; it doesn't contain any server file
  - `routes/`: express routing folder; contains api end-points
    - `api/`: endpoint api folder; we don't have any api yet
    - `middlewares/`: middlewares for the routes; we don't have any yet
    - `Default.js`: default path to fetch front-end files
    - `index.js`: compilation of all routes
  - `.gitignore`: ignore this file; list of git ignores
  - `app.js`: express application
  - `LICENSE`: ignore this file; sfsu license file
  - `package.json`: node package setup; contains npm scripts

## <a name="directory-front-end">Front-End</a>

### directory workspace:

### `/front-end/`

### folders and files:

- `/front-end/`: root folder
  - `public/`: contains main file
    - `favicon.ico`: react logo(?)
    - `index.html`: main file
  - `src/`: react classes folder to build the pages
    - `Containers/`: non-generic react classes
      - `About/`: about page folder
        - `About.js`: about class
        - `route.js`: about route
      - `Error/`: error page folder
        - `404/`: 404 folder
          - `NotFound.js`: notfound class (class name starts with non-number)
          - `route.js`: 404 route
      - `Home/`: home page folder
        - `Home.js`: home class
        - `route.js`: home route
    - `Generics/`: generic react classes; we don't have any generic yet
    - `index.js`: ignore this file; provide global css
    - `routes.js`: compilation of all page routes
    - `serviceWorker.js`: ignore this file; auto-generated react file
  - `.gitignore`: ignore this file; list of git ignores
  - `package.json`: node package setup; contains npm scripts

# <a name="to-do">To-Do</a>

## <a name="to-do-back-end">Back-End</a>

- Setup database
- Setup authentication middleware
- Setup endpoints

## <a name="to-do-front-end">Front-End</a>

- Setup pages
# LitLister
