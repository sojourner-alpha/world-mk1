#!/usr/bin/env bash

# Build the project
npm run build

# Copy CNAME file to dist directory
cp public/CNAME dist/

# Go to the dist folder
cd dist

# Create a .nojekyll file to prevent Jekyll processing
touch .nojekyll

# Initialize git
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Force push to the gh-pages branch
git push -f https://github.com/sojourner-alpha/world-mk1.git main:gh-pages

# Go back to the previous directory
cd -

echo "Deployed to https://sojourner-alpha.github.io/world-mk1/ (or alpha.sojourninsight.com if domain is configured)"