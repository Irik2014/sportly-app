export interface SportEvent {
    id: string;
    title: string;
    type: 'match' | 'practice' | 'tournament' | 'camp';
    date: string;
    time: string;
    location: string;
    price: number;
    image: string;
    ages: string;
    description: string;
}

export const mockEvents: SportEvent[] = [
    {
        id: '1',
        title: 'Kids Indoor Cricket Event',
        type: 'tournament',
        date: 'February 7th, 2026',
        time: '8:00 PM - 10:00 PM',
        location: 'Jersey Titans, Edison, NJ',
        price: 20,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
        ages: '6-16 Years',
        description: '10-Over Match. Games played with soft tennis balls. Pizza will be provided after the games.'
    },
    {
        id: '2',
        title: 'Elite Soccer Skills Camp',
        type: 'camp',
        date: 'March 15th, 2026',
        time: '9:00 AM - 12:00 PM',
        location: 'Metuchen Sports Plex',
        price: 45,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
        ages: '8-14 Years',
        description: 'Focus on dribbling, passing, and match awareness with pro coaches.'
    },
    {
        id: '3',
        title: 'Youth Basketball Open Run',
        type: 'practice',
        date: 'Every Saturday',
        time: '10:00 AM - 12:00 PM',
        location: 'Community Center, Edison',
        price: 10,
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
        ages: '10-18 Years',
        description: 'Casual scrimmages and skill drills. All skill levels welcome.'
    }
];
