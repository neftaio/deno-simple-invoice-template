.PHONY: build

build: create-charge.ts
	deno run --allow-write --allow-read create-charge.ts
