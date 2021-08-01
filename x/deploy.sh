nvm use 15

echo "cleaning up..."
rm -rf build
rm -rf docs
mkdir build

# echo "building assets..."
# x/buildAssets.sh

# echo "building html..."
# x/render.js

echo "building production CSS..."
NODE_ENV=production x/buildAssets.sh

echo "building production HTML..."
x/render.js

echo "checking docs into git..."
mv build docs
git add docs
git commit -m "deploying"

echo "pushing to github..."
git push

echo "deployed"
