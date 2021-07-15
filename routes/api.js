const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.js')
const { getEventsPageSettings, createOrUpadteEventsPageSettings, subscribeNewEventsNotification, getCalendarEventsCategory, getMalka,  getPageEventsGallery
} = require('../controller/eventsGallery')

router.get('/:userName/getEventsPageSettings', authController.checkPermission, getEventsPageSettings);
router.post('/:userName/createOrUpadteEventsPageSettings', authController.checkPermission, createOrUpadteEventsPageSettings);
router.post('/:userName/subscribeNewEventsNotification', authController.checkPermission, subscribeNewEventsNotification);
router.get('/:userName/getCalendarEventsCategory', authController.checkPermission, getCalendarEventsCategory);
router.get('/:userName/getPageEventsGallery', getPageEventsGallery);
// router.post('/:userName/saveUserSettings', authController.checkPermission, saveUserSettings);

module.exports = router;