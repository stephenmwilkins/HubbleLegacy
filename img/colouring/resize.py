from PIL import Image, ImageOps, ImageEnhance
import glob, os


# 5120 x 2880 # max resolution
# 2560 x 1440 # default
# 3200 x 1800

Image.MAX_IMAGE_PIXELS = 1E10

for infile in glob.glob('originals/*'):

    f = infile.split('/')[-1]
    f = f.split('.')[0]
    im = Image.open(infile)

    print(f, im.size)

    thumb = ImageOps.fit(im, (150,150), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    thumb.save(f'thumbs/{f}.jpg')

    rgbimage = ImageOps.fit(im, (300,300), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    rgbimage.save(f'images/{f}.jpg')
