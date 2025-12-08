module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: { // This handles uploads from the Strapi Admin Media Library
          folder: env('CLOUDINARY_FOLDER', 'kakebe-media'), // Use env variable or a default
        },
        delete: {},
      },
      security: {
        checkSVG: true,
      },
    },
  },
});