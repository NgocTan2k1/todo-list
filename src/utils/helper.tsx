export const formatDate = (date: Date, formatForm: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const formattedDate: string = new Intl.DateTimeFormat('vi-VN', options).format(date);

    const [day, month, year] = formattedDate.split('/');

    switch (formatForm) {
        case 'DD-MM-YYYY':
            return `${day}-${month}-${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        default:
            return formattedDate;
    }
};
