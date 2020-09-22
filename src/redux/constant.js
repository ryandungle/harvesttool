export const constant = {
    Phases: {
        Phase1: 'Clone',
        Phase2: 'EarlyVeg',
        Phase3: 'Veg',
        Phase4: 'Flowering',
        Phase5: 'Harvest'
    },
    Duration: {
        Phase1: 84,
        Phase2: 70,
        Phase3: 56,
        Phase4: 1,
        Phase5: 0
    },
    Associated: {
        Phase1: ['Mother'],
        Phase2: ['Clone'],
        Phase3: ['Room4'],
        Phase4: ['Room1', 'Room2', 'Room3', 'Room5'],
    },
    Capacity: {
        Mother: 1000, 
        Clone: 1000,
        Room1: 1000,
        Room2: 1000,
        Room3: 700,
        Room4: 600,
        Room5: 220
    },
}