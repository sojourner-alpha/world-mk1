#!/usr/bin/env bash

# Build the project
npm run build

# Go to the dist folder
cd dist

# Create a .nojekyll file to prevent Jekyll processing
touch .nojekyll

# Initialize git
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Force push to the gh-pages branch
git push -f https://github.com/Sojourn-Insight-LLC/alpha.github.io.git main:gh-pages

# Go back to the previous directory
cd -

echo "Deployed to https://sojourn-insight-llc.github.io/alpha.github.io/"