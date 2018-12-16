// Initialize constants
var currentId = null;
var backButton = document.getElementById('goBackButton');
var forwardButton = document.getElementById('goForwardButton');
var storyContainer = document.getElementById('storyContainer');


// Initialize map
var map = L.map('map');
map.setView({lat: 0.0, lon: 0.0}, 5);
  // FIXME make sure you switch this off OSM if you cannot follow their tile policy at
  //  https://operations.osmfoundation.org/policies/tiles/
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
  opacity: 1
}).addTo(map);


function moveTo(moveId) {
  // Given a valid storyData id, moves to the location and updates the story
  if (moveId < storyData['features'].length) {
    var newFeatureProperties = storyData['features'][moveId]['properties'];
    var newFeatureGeometry = storyData['features'][moveId]['geometry']['coordinates'];
    storyContainer.innerHTML = 'Moving...';
    // the flyTo function takes [lat, lon], while the geoJSON standard is [lon, lat]
    map.flyTo([newFeatureGeometry[1], newFeatureGeometry[0]], newFeatureProperties['zoom'], {'duration': 4});
    map.invalidateSize();
    // FIXME we should wait for flyTo to finish before this is updated
    storyContainer.innerHTML = '<div id="story-' + moveId + '">';
    storyContainer.innerHTML += '<h3>' + newFeatureProperties['title'] + '</h3>';
    storyContainer.innerHTML += '<p>' + newFeatureProperties['text'] + '</p></div>';
    storyContainer.innerHTML += '</div>';
    currentId = moveId;
    checkButtons();
    } else {
    console.log('Invalid move Id supplied; not doing anything.');
  };
}


function goBack() {
  // Backtrack to the previous point if we are not at the end
  if (currentId !== 0) {
    moveTo(currentId-1);
  } else {
    // pass
  };
}


function goForward() {
  // Advance to the next point if we are not at the end
  if (currentId !== storyData['features'].length - 1) {
    moveTo(currentId+1);
  } else {
    // pass
  }
}


function checkButtons() {
  // Hide buttons if we are at the start or end
  if (currentId == 0) {
    backButton.setAttribute('disabled', 'true');
  } else {
    backButton.removeAttribute('disabled');
  };
  if (currentId == storyData['features'].length - 1) {
    forwardButton.setAttribute('disabled', 'true');
  } else {
    forwardButton.removeAttribute('disabled');
  }
}


// Finally kick off the story
moveTo(0);
