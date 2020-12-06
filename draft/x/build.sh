mkdir -p build/css

cp src/index.html build/index.html

mkdir -p build/fonts
rsync -av assets/fonts/ build/fonts/

mkdir -p build/images
rsync -av assets/images/ build/images/


# set NODE_ENV=production to get minified styles

# NODE_ENV=production node_modules/postcss-cli/bin/postcss assets/css/style.css -o build/css/style.css

node_modules/postcss-cli/bin/postcss assets/css/style.css -o build/css/style.css

