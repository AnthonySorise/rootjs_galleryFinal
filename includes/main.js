$(document).ready(initiateApp);

var pictures = [
    'images/landscape-1.jpg',
    'images/landscape-10.jpg',
    'images/landscape-11.jpg',
    'images/landscape-13.jpg',
    'images/landscape-15.jpg',
    'images/landscape-17.jpg',
    'images/landscape-18.jpg',
    'images/landscape-19.jpg',
    'images/landscape-2.jpg',
    'images/landscape-3.jpg',
    'images/landscape-8.jpg',
    'images/landscape-9.jpg',
    'images/pexels-photo-132037.jpeg',
    'images/pretty.jpg'
];

var imgOrder = pictures;

function initiateApp(){
    //advanced: add jquery sortable call here to make the gallery able to be sorted
    $("#gallery").sortable({
        stop:resetImgOrder
    });

    makeGallery(pictures);
    addModalCloseHandler();
}

function resetImgOrder(){
    imgOrder = [];
    for(var i = 1; i < $(".imageGallery").length + 1; i++){
        var imageSource = $("img:nth-of-type(" + i + ")").attr("src");
        imgOrder.push(imageSource);
    }
}

function makeGallery(imageArray){
    //use loops and jquery dom creation to make the html structure inside the #gallery section
    //create a loop to go through the pictures
    for(var i = 0; i < imageArray.length; i++) {
        //create the elements needed for each picture, store the elements in variable
        var imgElement = $("<img src = " + imageArray[i] +">");
        imgElement.addClass("imageGallery col-xs-12 col-sm-6 col-md-4").css("padding", "0");
        imgElement.src = imageArray[i];

        //attach a click handler to the img you create.  call the "displayImage" function.
        imgElement.on("click", displayImage);

        //append the element to the #gallery section
        $("#gallery").append(imgElement);
    }
}

function addModalCloseHandler(){
    //add a click handler to the img element in the image modal.  When the element is clicked, close the modal
    function hideModal(){
        $("#galleryModal").modal("hide")
    }
    $(".modal-body img").on("click", hideModal);
}

function displayImage(){
    //find the url of the image by grabbing the background-image source, store it in a variable
    var imgSRC = $(this).attr("src");

    //grab the direct url of the image by getting rid of the other pieces you don't need
    var frontStringToCut = imgSRC.lastIndexOf("/") + 1;
    imgSRC = imgSRC.substring(frontStringToCut);

    //change the src of the image in the modal to the url of the image that was clicked on
    $(".modal-body img").attr("src","images/" + imgSRC);

    //grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become "pexels-photo-132037"
    imgSRC = imgSRC.replace(".jpg", "");
    imgSRC = imgSRC.replace(".jpeg", "");

    //change the modal-title text to the name you found above
    $(".modal-title").text(imgSRC);

    //show the modal with JS.
    $("#galleryModal").modal("show");
}