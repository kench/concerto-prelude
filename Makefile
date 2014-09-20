all: zip

zip: compile-js copy-files
	cd build && zip -r concerto-player *
	mv build/concerto-player.zip concerto-player.zip

server: copy-files
	rackup

copy-files:
	cp -R src build
	rm -rf build/closure build/js build/src

compile-js:
	./compile-js.sh

clean:
	rm concerto-player.zip || true
	rm -rf build || true
