import moment from 'moment';

function dateFormate(value) {
   return  moment(value).format('DD-MM-YYYY , h:mm  a');
}
module.exports = {
    dateFormate: dateFormate,
};