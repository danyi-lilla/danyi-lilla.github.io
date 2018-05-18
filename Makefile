
BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/build
GITHUB_PAGES_BRANCH=master

.PHONY: publish
publish:
	rm -rf $(OUTPUTDIR)
	yarn  build

.PHONY: github
github: publish
	ghp-import -m "Publishing site.." -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR)
	git push origin $(GITHUB_PAGES_BRANCH)
