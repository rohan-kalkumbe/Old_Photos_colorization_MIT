function uploadImage() {
    let fileInput = document.getElementById("fileInput");
    let colorizedImagesContainer = document.getElementById("colorizedImages");
    let selectedImageContainer = document.getElementById("selectedImageContainer");
    let selectedImage = document.getElementById("selectedImage");
    let downloadBtn = document.getElementById("downloadBtn");

    if (!fileInput.files.length) {
        alert("Please select an image to upload.");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (!data.images || data.images.length === 0) {
            alert("No colorized images returned.");
            return;
        }

        colorizedImagesContainer.innerHTML = ""; // Clear previous images

        data.images.forEach((imageUrl, index) => {
            let imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = `Colorized Image ${index + 1}`;
            imgElement.style.cursor = "pointer";
            imgElement.onclick = function () {
                selectedImage.src = imageUrl;
                selectedImageContainer.style.display = "block";
                downloadBtn.href = imageUrl;
            };
            colorizedImagesContainer.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong during the upload.");
    });
}
