const constants = {
  //Database type
  DATABASE_TYPE: 'mysql',

  //Files folder path
  PATH_TO_FILES_FOLDER:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_PATH_TO_FILES_FOLDER || 'assets/dev/files'
      : process.env.PROD_PATH_TO_FILES_FOLDER || 'assets/prod/files',
};

export default constants;
