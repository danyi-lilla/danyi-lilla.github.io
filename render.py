import logging
import os
import shutil
import json
import glob

from jinja2 import Environment, FileSystemLoader


SETTINGS = {
    'output_dir': 'output',
    'delete_output': True,
    'app_path': 'apps'
}

VARIABLES = {
    'SITEURL': 'https://danyi-lilla.github.io',
    'SITE_TITLE': 'Danyi Lilla - Logopedia',
    'VERSION': '1.0.0',
    'STATIC_DIR': 'assets',
    'APPS': ['imre', 'bela']
}

VARIABLES['SITEURL'] = 'http://localhost:8000'


def init_output_dir():
    if not os.path.exists(SETTINGS['output_dir']):
        os.mkdir(SETTINGS['output_dir'])

def clear_output_dir():
    if SETTINGS['delete_output']:
        files = glob.glob(os.path.join(SETTINGS['output_dir'], '*'))
        for f in files:
            if os.path.isfile(f):
                os.remove(f)
            else:
                shutil.rmtree(f)



def get_apps():
    return [os.path.join(SETTINGS['app_path'], app) for app in os.listdir(SETTINGS['app_path'])]


def build_apps():
    app_paths = get_apps()
    apps = []
    for p in app_paths:
        apps.append(App(p))

    for app in apps:
        print(app.url)


def load_json(path):
    with open(path) as f:
        return json.load(f)


class App:
    def __init__(self, path):
        self._path = path
        self._config = load_json(os.path.join(path, 'conf.json'))
        self._logger = logging.getLogger('app-{}'.format(self._config['name']))
        self._logger.debug('App <{}> initialized'.format(self._config['name']))

    @property
    def url(self):
        return self._config['url']





def copy_assets():
    shutil.copytree(os.path.join('theme', 'assets'), os.path.join(SETTINGS['output_dir'], 'assets'))


def main():
    init_output_dir()
    clear_output_dir()
    copy_assets()
    build_apps()



    root = os.path.join(os.getcwd(), 'theme')
    jinja_env = Environment(loader=FileSystemLoader(root), trim_blocks=True)
    template = jinja_env.get_template('index.html')
    res = template.render(VARIABLES)

    with open(os.path.join(SETTINGS['output_dir'], 'index.html'), 'w') as f:
        f.write(res)


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s | %(name)18s | %(levelname)-8s | %(message)s')

    main()
