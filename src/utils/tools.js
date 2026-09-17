
const getDay = () => {
    return new Date().toLocaleDateString("en-US", {
        weekday:"long"
    })
}

const getFullDate = () => {
    const date = new Date();

    const day = String(date.getDay()).padStart("0", 2);
    const month = date.toLocaleString("en-US", {month: "short"})
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}

const getTimeOfDay = () => {
    const date = new Date();

    const time = date.toLocaleTimeString("en-US", {
        minute:"2-digit",
        hour:"2-digit"
    })

    return time;
}

export {getFullDate, getDay, getTimeOfDay}