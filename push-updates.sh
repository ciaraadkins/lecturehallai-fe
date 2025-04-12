#!/bin/bash
# Make this script executable with: chmod +x push-updates.sh

echo "Adding changes to git..."
git add .

echo "Committing changes..."
git commit -m "Redesign homepage and standardize header/footer across pages"

echo "Pushing to GitHub..."
git push origin main

echo "Done! Your changes should now be live on Vercel soon."
