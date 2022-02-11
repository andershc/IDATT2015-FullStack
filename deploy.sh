#!/usr/bin/env sh

#Remove previous build

rm -rf dist

#Build
set -e
npm run build

#Add CNAME file
cp CNAME dist/
cd dist

#Git
git init
git add -A
git commit -m 'deploy'



#Push to gh-pages branch
git push -f https://github.com/andershc/IDATT2015-FullStack.git master:gh-pages


cd -