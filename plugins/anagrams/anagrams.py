import json
import os

from pelican import signals
from bs4 import BeautifulSoup

MIRROR_PATH = 'assets/anagrams-mirror.json'
MIX_PATH = 'assets/anagrams-mix.json'

TEMPLATE = '''\
<ul class="list-group mb-3">
    {rows}
</ul>
'''

ROW_TEMPLATE = '''\
    <li class="list-group-item">
        <div class="row">
            <div class="col-10 align-self-center">{words}</div>
            <div class="col-2 text-right"><button class="btn btn-outline-primary btn-sm" onclick="add_anagram('{words}')"><i class="fas fa-plus"></i></button></div>
        </div>
    </li>
'''


def get_data(path):
    with open(path) as f:
        data = json.load(f)
    return data


def render(path):
    data = get_data(path)
    rows = ''
    for words in data:
        rows += ROW_TEMPLATE.format(words=' - '.join(words))
    return TEMPLATE.format(rows=rows)


def generate_anagrams(pelican):
    print('>> Anagrams generator start')
    path = pelican.settings['OUTPUT_PATH'] + '/anagramma/index.html'
    with open(path) as f:
        soup = BeautifulSoup(f, 'html.parser')

    mirror = soup.find('div', id='mirror')
    mirror.string = render(MIRROR_PATH)

    mirror = soup.find('div', id='mix')
    mirror.string = render(MIX_PATH)
    
    with open(path, 'w') as f:
        f.write(soup.prettify(formatter=None))
    print('>> Anagrams generator finished')


def register():
    signals.finalized.connect(generate_anagrams)
    print('>> Anagrams generator registered')
