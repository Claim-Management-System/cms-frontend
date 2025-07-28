export const getLocations = async (): Promise<string[]> => {
    // a mock api call that returns a list of locations
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['New York', 'London', 'Tokyo', 'San Francisco']);
        }, 1000);
    });
}; 