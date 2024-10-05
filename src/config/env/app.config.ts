export const EnvConfiguration = () => {
  return {
    environment: process.env.NODE_ENV || 'dev',
    dbname: process.env.DB_NAME,
    dbhost: process.env.DB_HOST,
    dbport: process.env.DB_PORT,
    dbusername: process.env.DB_USERNAME,

    jwtsecret: process.env.JWT_SECRET,

    maxfilesize: process.env.MAX_FILE_SIZE,
    uploadlocation: process.env.UPLOAD_LOCATION,

    hostapi: process.env.HOST_API,
    port: process.env.PORT,

    sendgridkey: process.env.SENDGRID_API_KEY,
  };
};
