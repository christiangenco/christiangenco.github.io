mkdir -p build/css

# mkdir -p build/fonts
# rsync -av assets/fonts/ build/fonts/

# mkdir -p build/images
# rsync -av assets/images/ build/images/

rsync -av -exclude='.DS_Store' assets/ build/

# set NODE_ENV=production to get minified styles

NODE_ENV=production node_modules/postcss-cli/bin/postcss assets/css/style.css -o build/css/style.css

# node_modules/postcss-cli/bin/postcss assets/css/style.css -o build/css/style.css

echo "style-`md5 -q build/css/style.css | head -c 4`.css" > build/css/latestStyleBasename.txt
cp build/css/style.css build/css/`cat build/css/latestStyleBasename.txt`

# node_modules/postcss-cli/bin/postcss assets/css/style.css -o build/css/style.css

