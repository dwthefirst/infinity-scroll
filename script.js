const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true; //****NEW LINE****


//Unsplash API
let initialCount = 5;
const apiKey = '7KbZNC5frHWQVDQ1-MwwblM4ia50vd0Z4EF7stgE368';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//****NEW LINE****
function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}
//****NEW LINE****

//Check if all images were loaded (wil run on each indvidual image)
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) { //page is ready and everything has finished loading
        ready = true;
        loader.hidden = true; //hide the loader once the images have loaded.     
    }
    
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside .imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
        if(isInitialLoad) { //****NEW LINE****
            updateAPIURLWithNewCount(20); //****NEW LINE****
            isInitialLoad = false; //****NEW LINE****
        } //****NEW LINE****
    } catch (error) {
        //catch error here
        console.log(error, "A WHOOPSIE has occured!");
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; //reset so it can become ready again to load more images
        console.log('window.innerHeight: ', window.innerHeight);
        console.log('window.scrollY: ', window.scrollY);
        console.log('window.innerHeight + scrollY: ', window.scrollY + window.innerHeight);
        console.log('document.body.offsetHeight - 1000', document.body.offsetHeight - 1000);
        getPhotos();
    }
})



//On Load
getPhotos();