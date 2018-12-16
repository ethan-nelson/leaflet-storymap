# Leaflet Storymap

This is an implementation of a story map using a Leaflet slippy map. This is not a unique feature but one I could not find a compatible implementation for elsewhere.

It is still a work in progress, but this repository contains all the files needed to create a Leaflet supported story map on a single web page. The HTML, CSS, and Javascript can of course be implemented into a larger web project just as it is with my personal site.

[MIT license](LICENSE) Copyright 2018 Ethan Nelson

# Story Format

The data for the story map is stored in [a comma-separated file](storydata.csv). An example CSV file is included to demonstrate the syntax:

```
id, title, lat, lon, zoom, text, image
```

Note that lines are not terminated by a comma and that commas are only allowed in the text column. Text in the text column should also be enclosed in `"` characters only. All of these requirements are because of the to-be-explained hack in conversion.

Once the csv file is completed, [a script](convert.csv) converts the csv into a [javascript file](storydata.js) that is a Javascript defined array of geoJSON structure. This geoJSON is then read and processed by the story map page.

# Map Tiles

[OpenStreetMap tiles](https://www.openstreetmap.org) are used in the default page. Please be sure to read their [acceptable tile use policy](https://operations.osmfoundation.org/policies/tiles/) if you are using this code in your own site and also respect their [copyright](https://www.openstreetmap.org/copyright).

# Closing

I hope this project may be of help to you. Please file a GitHub issue if you have any feedback, questions, or concerns. Pull requests are welcomed! 

Finally, if this project helped you out, [drop me a line](mailto:git@ethan-nelson.com) as I would love to hear about your awesome work!
