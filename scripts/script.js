window.onload = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (currentLocation) {
            var data = {
                latitude: currentLocation.coords.latitude + 0.00005,
                longitude: currentLocation.coords.longitude + 0.00005
            };

            let model = Model();
            model.location = data;
            createEntity(model);

        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }

};

var Model = () => {
    return {
        code: 'ireland_terrain',
        url: './assets/ireland_terrain/scene.gltf',
        // scale: '0.05 0.05 0.05',
        scale: '10 10 10',
        rotation: '0 0 0',
        // position: '0 30 0',
        // lookAt: '[camera]',
        gestureConfig: 'minScale: 1; maxScale: 10',
        info: 'Ireland Terrain',
        //text: {
        //    scale: '100 100 100',
        //    lookAt: '[camera]',
        //    gestureConfig: 'minScale: 0.01; maxScale: 5',
        //    text: 'Bear Market'
        //},
        text: null,
        ground: false,
        // animation: 'clip: Arm_Bear|Idle_2; loop: repeat;',
        successAnimation: ''
    }
}

function createEntity(model, autoscale) {
    let scene = document.querySelector('a-scene');

    let entityEl = createEntityElement(model);
    scene.appendChild(entityEl);

    if (model.ground) {
        let planeEl = createPlaneElement();
        scene.appendChild(planeEl);
    }

    if (model.text) {
        let textEl = createTextElement(model.text);
        entityEl.appendChild(textEl);
        // refresh(entityEl, textEl, autoscale);
    }
}

function createEntityElement(config) {
    let element = document.createElement('a-entity');
    element.setAttribute('scale', config.scale);
    //element.setAttribute('rotation', config.rotation);
    element.setAttribute('position', config.position);
    element.setAttribute('gltf-model', config.url);
    element.setAttribute('info', config.info);
    element.setAttribute('animation-mixer', config.animation ? config.animation : '');
    element.setAttribute('success', 'false');
    element.setAttribute('gps-entity-place', `latitude: ${config.location.latitude}; longitude: ${config.location.longitude};`);

    if (config.lookAt == '[camera]') {
        element.setAttribute('look-at', '[camera]');
    }
    else if (config.gestureConfig) {
        element.setAttribute('gesture-handler', config.gestureConfig);
        element.classList.add('clickable');
    }

    return element;
}

function createPlaneElement() {
    let element = document.createElement('a-plane');
    element.setAttribute('position', '0 0 0');
    element.setAttribute('rotation', '-90 0 0');
    element.setAttribute('width', '50');
    element.setAttribute('height', '50');
    element.setAttribute('material', 'shader: shadow');
    element.setAttribute('shadow', '');
    return element;
}

function createTextElement(config) {
    let element = document.createElement('a-text');
    element.setAttribute('value', config.text);
    element.setAttribute('scale', config.scale)
    element.setAttribute('look-at', '[gps-camera]');
    element.setAttribute('gps-entity-place', `latitude: ${config.location.latitude}; longitude: ${config.location.longitude};`);

    if (config.color) {
        element.setAttribute('color', config.color);
    }

    if (config.lookAt == '[camera]') {
        element.setAttribute('look-at', '[camera]');
    }
    else if (config.gestureConfig) {
        element.setAttribute('gesture-handler', 'minScale: 1; maxScale: 10');
        element.classList.add('clickable');
    }
    

    return element;
}

