function adjustTimeZone(lastActivityTime, offsetHours = 12) {
    return new Date(new Date(lastActivityTime).getTime() + offsetHours * 60 * 60 * 1000);
}

module.exports = { adjustTimeZone };
