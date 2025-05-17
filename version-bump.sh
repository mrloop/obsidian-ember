#!/bin/bash

target_dir="packages"

find "$target_dir" -maxdepth 1 -type d -print0 | while IFS= read -r -d $'\0' dir; do
  if [ "$dir" != "$target_dir" ]; then
    pushd "$dir"
    echo "Running 'pnpm version $npm_package_version' in $dir"
    pnpm version $npm_package_version
    popd
  fi
  git add .
done

echo "Finished processing directories."
