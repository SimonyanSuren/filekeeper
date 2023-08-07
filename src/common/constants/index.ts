const constants = {
  //APP DOMAIN
  DATABASE_TYPE: 'mysql',

  //FILES FOLDERS
  PATH_TO_FILES_FOLDER:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_PATH_TO_FILES_FOLDER || 'assets/dev/files'
      : process.env.PROD_PATH_TO_FILES_FOLDER || 'assets/prod/files',
};

export default constants;
