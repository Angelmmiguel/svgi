#!/bin/bash -e

if ! which pkg >/dev/null; then
  echo -e  "pkg is required. Please install it before run this script: npm install -g pkg"
  exit 1
fi

# Install
rm -r ./build/*
pkg --out-dir ./build .

# Get the version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Rename and compress
cd build

echo "Compressing for Linux"
mv ./svgi-linux ./svgi
tar -zcf ./svgi-linux-x64-$PACKAGE_VERSION.tar.gz ./svgi
rm ./svgi

echo "Compressing for MacOS"
mv ./svgi-macos ./svgi
tar -zcf ./svgi-macos-x64-$PACKAGE_VERSION.tar.gz ./svgi
rm ./svgi

echo "Compressing for Windows"
mv ./svgi-win.exe ./svgi.exe
tar -zcf ./svgi-win-x64-$PACKAGE_VERSION.tar.gz ./svgi.exe
rm ./svgi.exe

echo "Done!"
cd ..
