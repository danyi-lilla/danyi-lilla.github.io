#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import datetime
now = datetime.datetime.now()

YEAR = str(now.year)
VERSION = 'v1.0.0'

AUTHOR = 'Danyi Lilla'
SITENAME = 'Danyi Lilla'
SITEURL = ''

PATH = 'content'
DELETE_OUTPUT_DIRECTORY = True

TIMEZONE = 'Europe/Budapest'
DEFAULT_DATE_FORMAT = '%a %d %B %Y'

DEFAULT_LANG = 'hu'

THEME = 'themes/bootstrap4'

ARTICLE_SAVE_AS = '{slug}/index.html'
ARTICLE_URL = '{slug}'

PAGE_SAVE_AS = '{slug}/index.html'
PAGE_URL = '{slug}'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

PLUGIN_PATHS = ['plugins']
PLUGINS=['sitemap',]

SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'daily',
        'indexes': 'daily',
        'pages': 'weekly'
    }
}

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
