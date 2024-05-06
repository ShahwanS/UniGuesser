window.onload = function() {
    pannellum.viewer('container360', { // id of the div where the 360-degree image will be displayed
        "type": "equirectangular",
        "panorama": "resources/IMG_20240506_111102_00_001.jpg", // path to your 360-degree image
        "autoLoad": true
    });
}