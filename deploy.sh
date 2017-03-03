#!/usr/bin/env bash
set -eu

echo "Preparing bundle..."
rm -f site.zip
cd build
zip -q -r ../site.zip *
cd ..

echo "Uploading bundle..."
curl -s -H "Content-Type: application/zip" \
     -H "Authorization: Bearer ${ACCESS_TOKEN}" \
     --data-binary "@site.zip" \
     https://api.netlify.com/api/v1/sites/0c389e74-c231-4896-9bfb-79ecb86020dd/deploys \
     > /dev/null

echo "Done"
