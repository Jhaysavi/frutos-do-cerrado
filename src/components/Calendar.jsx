import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
    const events = [
        { title: 'Feira Comunitária', date: '2024-12-10' },
        { title: 'Oficina de Reflorestamento', date: '2024-12-15' },
    ];

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
    );
};

export default Calendar;
