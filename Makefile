all: zip

zip:
	zip -r concerto-player chrome-extension

clean:
	rm concerto-player.zip
