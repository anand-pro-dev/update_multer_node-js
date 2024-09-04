import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the "uploads" folder
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, uniqueName); // Replace spaces with underscores
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept only images
    } else {
        cb(new Error('Only images are allowed'), false); // Reject non-image files
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Middleware to handle single image upload
const uploadSingleImage = upload.single('image');

// Middleware to handle multiple images
const uploadMultipleImages = upload.fields([
    { name: 'image', maxCount: 1 },       // Single main image
    { name: 'all_images', maxCount: 10 }  // Up to 10 additional images
]);

export { uploadSingleImage, uploadMultipleImages };
