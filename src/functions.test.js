import { createEvent } from './functions'

const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

const weekday = "fri";
const week = 1;
const openHour = 9;
const closeHour = 15;

const hour = new Date().getHours();

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime())
});

function addDays(days) {
    return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
    if (numDay >= currentDay && parseInt(closeHour) >= hour) {//posterior a dia de la semana
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }
    return addDays((numDay - currentDay) + 7 * (week - 1));
}


test('Validation a event title and content basic', () => {

    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, "hour"]);
});

test('Validation start date', () => {
    const currentDay = new Date().getDay();
    const numDay = NUM_DAY[weekday];
    const date = getDateCalendar(numDay, currentDay);
    const hour = new Date().getHours();
    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.start).toStrictEqual(date);
    
});

test('Validation date', () => {
    const currentDay = new Date().getDay();
    const numDay = NUM_DAY[weekday];
    const date = getDateCalendar(numDay, currentDay);
    const hour = new Date().getHours();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

    const dateResult = new Date(date).toLocaleDateString('es-ES', options);
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.date).toStrictEqual(dateResult);
});

describe('Validation illegal arguments', () => {
  
    test("Illegal check times", () => {
        const result = () => createEvent(15, 14);
        expect(result).toThrow(Error);        
    });

    test("Illegal week with negative value", () => {
        const result = () => createEvent(-1,);
        expect(result).toThrow(Error);        
    });
    
    test("Illegal weekday", () => {
        const result = () => createEvent("sab");
        expect(result).toThrow(Error);      
    });
  
});


test('Create an event list of at least 10 events', () => {

    const listEvent = [
        {
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 12
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 12
        },
        {
            weekday: 'wed',
            week: 3,
            openHour: 8,
            closeHour: 15
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 8,
            closeHour: 15
        },
        {
            weekday: 'mon',
            week: 5,
            openHour: 8,
            closeHour: 16
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 16
        },
        {
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 17
        },
        {
            weekday: 'thu',
            week: 1,
            openHour: 8,
            closeHour: 17
        }
    ]

    listEvent.map((event) =>{
        const result = createEvent(event.weekday,event.week,event.openHour,event.closeHour);
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual([(event.closeHour-event.openHour), "hour"]);
    })

});s