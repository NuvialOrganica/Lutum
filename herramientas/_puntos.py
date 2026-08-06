# -*- coding: utf-8 -*-
"""Dibuja los puntos sobre el mapa para poder ajustarlos a ojo."""
from PIL import Image, ImageDraw
import json, io, sys

PUNTOS = json.load(io.open('herramientas/puntos.json', encoding='utf-8'))
im = Image.open('Assets/mapa.jpeg').convert('RGB')
d = ImageDraw.Draw(im)
W, H = im.size
for i, p in enumerate(PUNTOS):
    x, y = int(p['x'] * W), int(p['y'] * H)
    r = 14
    d.ellipse([x-r, y-r, x+r, y+r], outline=(255, 40, 140), width=5)
    d.line([x-r-8, y, x+r+8, y], fill=(255, 40, 140), width=3)
    d.line([x, y-r-8, x, y+r+8], fill=(255, 40, 140), width=3)
    d.text((x+r+6, y-8), str(i), fill=(255, 255, 0))
im.save('herramientas/_puntos.png')
print('ok', W, H)
