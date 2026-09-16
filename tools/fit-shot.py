"""Fit any saved image into a project shot: 16:10 at 2160x1350, the frame every
automated capture uses, anchored where the substance of that image sits.

  python3 tools/fit-shot.py <slug> <source> [top|center]
"""
import sys, pathlib
from PIL import Image

slug, src = sys.argv[1], sys.argv[2]
anchor = sys.argv[3] if len(sys.argv) > 3 else "center"
W, H = 2160, 1350
im = Image.open(src).convert("RGB")
scale = max(W / im.width, H / im.height)
im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
left = (im.width - W) // 2
top = 0 if anchor == "top" else (im.height - H) // 2
out = pathlib.Path(__file__).resolve().parents[1] / "public" / "shots" / f"{slug}.jpg"
im.crop((left, top, left + W, top + H)).save(out, quality=80)
print(f"wrote {out.name}  {out.stat().st_size // 1024} KB  anchor={anchor}")
