#!/bin/bash

if [ ! -f compiler.jar ];  then
  echo -e 'compiler.jar not found.\nDownload it from http://closure-compiler.googlecode.com/files/compiler-latest.zip and drop it in this directory.'; exit 1;
fi

debug=0
while [ $# -gt 0 ]
do
  case "$1" in
    --debug ) 
      debug=1 ;;
    --superdebug )
      debug=2 ;;
  esac
  shift
done

echo $debug

if [ $debug -eq 0 ]; then
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Settings" \
    --output_mode=compiled --compiler_jar=compiler.jar \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
     > src/settings.js

elif [ $debug -eq 1 ]; then
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Settings" \
    --output_mode=compiled --compiler_jar=compiler.jar \
   > src/settings_debug.js

else
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Settings" \
    --output_mode=script --compiler_jar=compiler.jar \
   > src/settings_superdebug.js
fi

if [ $debug -eq 0 ]; then
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Home" \
    --output_mode=compiled --compiler_jar=compiler.jar \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
     > src/index.js

elif [ $debug -eq 1 ]; then
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Home" \
    --output_mode=compiled --compiler_jar=compiler.jar \
   > src/index_debug.js

else
  src/closure/closure/bin/build/closurebuilder.py \
    --root=src/closure/ --root=src/js/ --namespace="concerto.player.pages.Home" \
    --output_mode=script --compiler_jar=compiler.jar \
   > src/index_superdebug.js
fi
