function ImageUploader({ image, setImage }) {

    const handleChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-6">

            <h2 className="text-lg font-semibold mb-2">
                Upload Image
            </h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />

            {image && (
                <p className="mt-2 text-sm text-gray-600">
                    {image.name}
                </p>
            )}

        </div>
    );
}

export default ImageUploader;