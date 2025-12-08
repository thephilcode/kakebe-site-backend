module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        upload_preset: env('CLOUDINARY_UPLOAD_PRESET', 'strapi_unsigned'),
        unsigned: true,
      },
      actionOptions: {
        upload: {},
        uploadStream: { // This handles uploads from the Strapi Admin Media Library
          folder: env('CLOUDINARY_FOLDER', 'kakebe-media'), // Use env variable or a default
          maxConcurrent: 3, // Force Cloudinary to process no more than 3 uploads at a time
        },
        delete: {},
      },
      security: {
        checkSVG: true,
      },
    },
  },
});