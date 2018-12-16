# Some times I'm lazy and don't want to deal with
# CSV parsers and json writers. This is one of
# those times. Once this project is much more established,
# I will probably make this less hacky.
#
# This script expects a csv file (without line-terminating 
# commas) named storydata.csv in the directory containing
# id, title, lat, lon, zoom, text. Note the title cannot
# contain any commas in it (see what I mean about hacky?).
# It will write out a javascript import-able geoJSON array
# to display on the map with the file name storydata.geojson.

old = open('storydata.csv','r')
old = old.readlines()
old = old[1:]

f = open('storydata.geojson','w')
f.write('var storyData = ')
f.write('{')
f.write('"type": "FeatureCollection",')
f.write('"features": [')

for ll,l in enumerate(old):
    data = l.split(',')
    text = ''
    for x in data[5:]:
        text += x.strip('\n')
    f.write('{"type": "Feature", "properties": {')
    f.write('"id": %s, "title": %s, "zoom": %s, "text": %s},' % (data[0], data[1], data[4], text))
    f.write('"geometry": {"type": "Point", "coordinates": [%s, %s]}}' % (data[3], data[2]))
    if ll != len(old)-1:
        f.write(',')

f.write(']')
f.write('}')
f.write(';')

f.close()

