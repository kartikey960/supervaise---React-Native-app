from pathlib import Path
import struct
import sys

path = Path('assests/fonts/PlaywriteNO-ExtraLight.ttf')
if not path.exists():
    print('MISSING')
    sys.exit(1)

data = path.read_bytes()
sfnt = struct.unpack('>IIHHH', data[:16])
num_tables = sfnt[1]
offset = 16
name_off = None
for _ in range(num_tables):
    tag, _, off, length = struct.unpack('>4sIII', data[offset:offset+16])
    if tag == b'name':
        name_off = off
        break
    offset += 16

if name_off is None:
    print('NO NAME TABLE')
    sys.exit(1)

fmt, count, string_offset = struct.unpack('>HHH', data[name_off:name_off+6])
rec = name_off + 6
for _ in range(count):
    platform_id, encoding_id, language_id, name_id, length, off = struct.unpack('>HHHHHH', data[rec:rec+12])
    rec += 12
    string_pos = name_off + string_offset + off
    string_data = data[string_pos:string_pos+length]
    if platform_id in (0, 3):
        text = string_data.decode('utf-16-be', errors='ignore')
    else:
        text = string_data.decode('latin-1', errors='ignore')
    if name_id in (1, 4, 6, 16, 17, 18):
        print(platform_id, encoding_id, language_id, name_id, text)
