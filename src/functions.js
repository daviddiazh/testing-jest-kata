
const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

/**
 * Con esta función p8¿. odemos crear eventos partículas segun sea el caso, 
 * se usa para crear eventos basados en un dia de la semana y en semanas futuras, con un horario de apertura y de cierre para evento. 
 * 
 * CONTEXTO: este caso es practico y es basado en una problematica real que es para agendar eventos en google calendar.
 * 
 * @param {String} weekday opciones ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')
 * @param {int} week opciones (1,2,3,4,5,...)
 * @param {int} openHour opciones (8,9,10,...,20,21,21,23,24)
 * @param {int} closeHour opciones (8,9,10,...,20,21,21,23,24)
 */
export const createEvent = ( weekday, week, openHour, closeHour ) => {

    if((closeHour - openHour) < 0){
        throw new Error("Argumento ilegal en el horario de entrada.");
    }

    if(week < 0){
        throw new Error("Argumento ilegal para la semana, debe ser un valor positivo.");
    }

    if(!Object.keys(NUM_DAY).some(key => key === weekday)){
        throw new Error("Argumento ilegal el dia de la semana, valores posibles; 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' y 'sun'.");
    }

    const numDay = NUM_DAY[weekday];
    const currentDay = new Date().getDay();
    const hour = new Date().getHours();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
   

    function addDays(days) {
        return new Date(new Date().setDate(new Date().getDate() + days));
    }

    function getDateCalendar(numDay, currentDay) {
        if (numDay >= currentDay && parseInt(closeHour) >= hour) {//posterior a dia de la semana
            return addDays((numDay - currentDay) + 7 * (week - 1));
        }
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }

    const date = getDateCalendar(numDay, currentDay);
   
    return {
        title: "[SOFKA U] Meeting Room",
        description: "Mentoring and Practice",
        start: date,
        date: new Date(date).toLocaleDateString('es-ES', options),
        duration: [closeHour - openHour, "hour"]
    };
}