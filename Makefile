all: zip

zip:
	cd chrome-extension && zip -r concerto-player *
	mv chrome-extension/concerto-player.zip concerto-player.zip

clean:
	rm concerto-player.zip
