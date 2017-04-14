**To run, follow these steps:**

1. Install dependencies with `npm install` in this directory (make sure it creates a local node_modules)
2. `npm start`
3. `Browse to http://localhost:3000`

**To build for production, follow these steps:**

1. Install git with command `sudo apt-get update && sudo apt-get install git`
2. Get last project from remote repo `git pull origin develop`
3. Install nodejs via nvm using cUrl: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash` or Wget: `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`
4. `nvm install node`
5. Install dependencies with `npm install` in this directory
6. `npm run build`
7. check "dist" folder
