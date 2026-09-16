#!/bin/bash
# Installs a screenshot you saved by hand as a project shot, matched to the
# 2160x1350 (16:10 at 2x) frame the Playwright captures use.
#
#   ./tools/install-shot.sh agentiq              newest image in ~/Downloads
#   ./tools/install-shot.sh agentiq path/to.png  a specific file
set -euo pipefail
slug="${1:?usage: install-shot.sh <slug> [file]}"
src="${2:-$(ls -t ~/Downloads/*.{png,jpg,jpeg,PNG,JPG,JPEG} 2>/dev/null | head -1)}"
[ -n "${src:-}" ] && [ -f "$src" ] || { echo "no image found; pass one explicitly"; exit 1; }
here="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
echo "source: $src"
sips -s format jpeg -s formatOptions 76 "$src" --out "$tmp/a.jpg" >/dev/null
# cover-crop to 16:10, then size to match the rest
w=$(sips -g pixelWidth "$tmp/a.jpg" | awk '/pixelWidth/{print $2}')
h=$(sips -g pixelHeight "$tmp/a.jpg" | awk '/pixelHeight/{print $2}')
target=$(echo "$w" | awk '{printf "%d", $1*10/16}')
if [ "$target" -le "$h" ]; then crop_w=$w; crop_h=$target; else crop_h=$h; crop_w=$(echo "$h" | awk '{printf "%d", $1*16/10}'); fi
sips -c "$crop_h" "$crop_w" "$tmp/a.jpg" >/dev/null          # crop from centre
sips -z 1350 2160 "$tmp/a.jpg" >/dev/null                     # match the others
cp "$tmp/a.jpg" "$here/public/shots/$slug.jpg"
sips -g pixelWidth -g pixelHeight "$here/public/shots/$slug.jpg" | awk '/pixel/{printf "%s ", $2} END{print ""}'
python3 "$here/tools/build-content.ts.py"
echo "installed public/shots/$slug.jpg"
