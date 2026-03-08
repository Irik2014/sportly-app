import { supabase } from '../lib/supabase';

const mockEvents = [
    {
        title: 'Elite Soccer Camp',
        type: 'camp',
        date: 'July 15-20',
        time: '9:00 AM',
        location: 'Metuchen Sportsplex',
        price: 299,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
        ages: 'Boys & Girls 8-14',
        description: 'A high-intensity training camp focusing on technical skills, tactical understanding, and physical conditioning for young athletes.'
    },
    {
        title: 'Indoor Cricket Match',
        type: 'match',
        date: 'Feb 10',
        time: '7:30 PM',
        location: 'Jersey Titans Arena',
        price: 25,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        ages: 'Adults 18+',
        description: 'Competitive indoor cricket match open to all skill levels. Fast-paced action and great way to stay active during winter.'
    },
    {
        title: 'Youth Basketball Tournament',
        type: 'tournament',
        date: 'March 12-13',
        time: '8:00 AM',
        location: 'Edison Community Center',
        price: 150,
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
        ages: 'Youth U12, U14, U16',
        description: 'Dynamic basketball tournament featuring local teams. Guaranteed 3 games plus playoffs for qualifying teams.'
    }
];

export async function seedEvents() {
    const { data, error } = await supabase.from('events').insert(mockEvents);
    if (error) {
        console.error('Error seeding events:', error);
        return false;
    }
    console.log('Successfully seeded events:', data);
    return true;
}
