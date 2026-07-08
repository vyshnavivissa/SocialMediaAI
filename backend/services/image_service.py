from django.core.files.storage import default_storage


class ImageService:

    @staticmethod
    def save_image(image):

        file_path = default_storage.save(image.name, image)

        return file_path