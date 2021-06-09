

import os
import shutil


files = sorted(os.listdir('original/'))



for i,f in enumerate(files):
    print(f)
    shutil.copy(f'original/{f}', f'{i}.png')
