"""Render a real terminal session as a project shot.

Some projects are pipelines and command-line tools with no interface to
screenshot. For those the honest picture is the run itself: the exact command
on the prompt line and its output verbatim, framed as a terminal at the same
2160x1350 as every other shot. Nothing here is written for the image; the
text comes from a file the run produced.

  python3 tools/terminal-shot.py <slug> "<command>" <output.txt> ["<title>"]
"""
import re, sys, pathlib
from PIL import Image, ImageDraw, ImageFont

slug, command, src = sys.argv[1], sys.argv[2], sys.argv[3]
title = sys.argv[4] if len(sys.argv) > 4 else slug
W, H, PAD, SIZE, LEAD = 2160, 1350, 64, 27, 1.5

BG, BAR, FG, DIM = (8, 12, 20), (18, 24, 36), (222, 232, 245), (110, 128, 150)
ACCENT, OK, WARN, BAD, NUM = (86, 203, 240), (94, 214, 150), (240, 190, 90), (240, 110, 110), (170, 200, 255)

font = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", SIZE)
bold = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", SIZE, index=1)
ui = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 24)

im = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(im)

# window chrome
d.rectangle((0, 0, W, 64), fill=BAR)
for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
    d.ellipse((30 + i * 36, 22, 50 + i * 36, 42), fill=c)
tw = d.textlength(title, font=ui)
d.text(((W - tw) / 2, 18), title, font=ui, fill=DIM)

line_h = int(SIZE * LEAD)
max_lines = (H - 64 - PAD * 2) // line_h - 1
cols = int((W - PAD * 2) / d.textlength("M", font=font))

lines = pathlib.Path(src).read_text(errors="replace").rstrip("\n").splitlines()
lines = [l.expandtabs(4)[:cols] for l in lines]
if len(lines) > max_lines:
    keep = max_lines - 1
    lines = lines[: keep // 2] + [f"   ... {len(lines) - keep} lines ..."] + lines[-(keep - keep // 2):]

y = 64 + PAD
d.text((PAD, y), "$ ", font=bold, fill=OK)
d.text((PAD + d.textlength("$ ", font=bold), y), command[:cols - 2], font=bold, fill=FG)
y += line_h

def colour(line):
    s = line.lower()
    if re.search(r"\b(error|fail|failed|exception|traceback)\b", s): return BAD
    if re.search(r"\b(warn|warning|review|withheld|refused)\b", s): return WARN
    if re.search(r"\b(success|passed|ok|done|complete|pass)\b", s): return OK
    if re.match(r"^\s*[=\-]{8,}", line) or "===" in line: return DIM
    return FG

for line in lines:
    x = PAD
    # dim timestamps, keep the rest readable
    m = re.match(r"^(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d(?:[.,]\d+)?\s*\|?\s*)(.*)$", line)
    if m:
        d.text((x, y), m.group(1), font=font, fill=DIM)
        x += d.textlength(m.group(1), font=font)
        line = m.group(2)
    base = colour(line)
    for tok in re.split(r"(\b\d[\d,.]*%?|\bINFO\b|\bWARNING\b|\bERROR\b)", line):
        if not tok: continue
        fill = ACCENT if tok == "INFO" else WARN if tok == "WARNING" else BAD if tok == "ERROR" \
            else NUM if re.fullmatch(r"\d[\d,.]*%?", tok) and base == FG else base
        d.text((x, y), tok, font=font, fill=fill)
        x += d.textlength(tok, font=font)
    y += line_h

out = pathlib.Path(__file__).resolve().parents[1] / "public" / "shots" / f"{slug}.jpg"
im.save(out, quality=88)
print(f"wrote {out.name}  {out.stat().st_size // 1024} KB  {len(lines)} lines")
