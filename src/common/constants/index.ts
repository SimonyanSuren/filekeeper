//import * as dotenv from 'dotenv';
//dotenv.config();

const constants = {
  //APP DOMAIN
  DATABASE_TYPE: 'mysql',
  //IMAGE FOLDERS
  PATH_TO_USERS_IMAGE_FOLDER:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_PATH_TO_USERS_IMAGE_FOLDER || 'assets/dev/images/profile'
      : process.env.PROD_PATH_TO_USERS_IMAGE_FOLDER || 'assets/prod/images/profile',

  PATH_TO_SPORTS_IMAGE_FOLDER:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_PATH_TO_SPORT_IMAGE_FOLDER || 'assets/dev/images/sports'
      : process.env.PROD_PATH_TO_SPORT_IMAGE_FOLDER || 'assets/prod/images/sports',
};

export default constants;
