-include custom.mk

export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN := $(TOKEN)

GH_PAGES_URL=https://contentful.github.io/widget-sdk/examples/chessboard/

SPACE_ID=$(SPACE)

update: widget.json
	contentful-widget update --space-id $(SPACE_ID) --force

update-gh: widget.json
	contentful-widget update --space-id $(SPACE_ID) --force --src "$(GH_PAGES_URL)"

create: widget.json
	contentful-widget create --space-id $(SPACE_ID)
