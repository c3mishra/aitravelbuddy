export interface User {
  id: string;
  name: string;
  profileImage: string;
  bio: string;
  followers: number;
  following: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: {
    time: string;
    title: string;
    description: string;
    location?: string;
    image?: string;
  }[];
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  location: string;
  coverImage: string;
  images: string[];
  tripLength: string;
  experienceType: string;
  userId: string;
  user: User;
  likes: number;
  comments: number;
  createdAt: string;
  days: ItineraryDay[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  itineraryId: string;
  createdAt: string;
}

// Mock Users
export const users: User[] = [
  {
    id: "user1",
    name: "Emma Wilson",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Travel enthusiast and photographer. Always seeking new adventures.",
    followers: 1247,
    following: 365
  },
  {
    id: "user2",
    name: "Alex Johnson",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Culinary explorer and culture lover. Finding the best food spots around the world.",
    followers: 834,
    following: 221
  },
  {
    id: "user3",
    name: "Sophia Chen",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Adventure seeker and outdoor enthusiast. Mountains are my second home.",
    followers: 1689,
    following: 412
  },
  {
    id: "user4",
    name: "Michael Brooks",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Digital nomad traveling the world while working. Coffee and wifi hunter.",
    followers: 965,
    following: 278
  }
];

// Mock Itineraries
export const itineraries: Itinerary[] = [
  {
    id: "itin1",
    title: "Weekend in Kyoto: Traditional Japan Experience",
    description: "Explore the ancient temples, traditional tea houses, and beautiful gardens of Kyoto in this culturally rich weekend itinerary.",
    location: "Kyoto, Japan",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1493997181344-a78db9d606b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "Weekend",
    experienceType: "Cultural",
    userId: "user1",
    user: users[0],
    likes: 347,
    comments: 42,
    createdAt: "2023-06-15T10:30:00Z",
    days: [
      {
        day: 1,
        title: "Eastern Kyoto Temples & Gardens",
        description: "Explore the eastern side of Kyoto, known for its historic temples and beautiful gardens.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Nishiki Market",
            description: "Start your day with a traditional Japanese breakfast at the famous Nishiki Market, known as 'Kyoto's Kitchen'.",
            location: "Nishiki Market",
            image: "https://images.unsplash.com/photo-1617866124825-20864b4394d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "10:00",
            title: "Visit Kiyomizu-dera Temple",
            description: "Explore this UNESCO World Heritage site with its wooden stage that offers stunning views of cherry and maple trees below.",
            location: "Kiyomizu-dera",
            image: "https://images.unsplash.com/photo-1606472777760-e643cf95d5b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "12:30",
            title: "Lunch in Higashiyama District",
            description: "Enjoy lunch at one of the traditional restaurants in this well-preserved historic district.",
            location: "Higashiyama District"
          },
          {
            time: "14:00",
            title: "Explore Gion District",
            description: "Walk through Kyoto's famous geisha district with its traditional wooden machiya houses.",
            location: "Gion District",
            image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "17:00",
            title: "Tea Ceremony Experience",
            description: "Participate in a traditional Japanese tea ceremony at Camellia tea house.",
            location: "Camellia Tea Ceremony Gion"
          },
          {
            time: "19:00",
            title: "Dinner at Pontocho Alley",
            description: "Enjoy dinner at one of the restaurants along this atmospheric alley that runs parallel to the Kamogawa River.",
            location: "Pontocho Alley",
            image: "https://images.unsplash.com/photo-1591881743149-16c4ee56aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          }
        ]
      },
      {
        day: 2,
        title: "Arashiyama & Northern Kyoto",
        description: "Visit the scenic Arashiyama district and explore northern Kyoto's temples.",
        activities: [
          {
            time: "08:30",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional Japanese breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Visit Arashiyama Bamboo Grove",
            description: "Walk through the iconic bamboo forest, one of the most photographed sites in Kyoto.",
            location: "Arashiyama Bamboo Grove",
            image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "11:30",
            title: "Explore Tenryuji Temple",
            description: "Visit this UNESCO World Heritage site, known for its beautiful zen garden.",
            location: "Tenryuji Temple" 
          },
          {
            time: "13:00",
            title: "Lunch in Arashiyama",
            description: "Try yudofu (boiled tofu), a local specialty, at one of the restaurants near the Togetsukyo Bridge."
          },
          {
            time: "15:00",
            title: "Visit Kinkaku-ji (Golden Pavilion)",
            description: "Marvel at this stunning Zen temple covered in gold leaf, surrounded by a reflecting pond.",
            location: "Kinkaku-ji",
            image: "https://images.unsplash.com/photo-1493997181344-a78db9d606b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "17:30",
            title: "Shopping on Shijo Street",
            description: "Enjoy some shopping on Kyoto's main shopping street for souvenirs and local crafts.",
            location: "Shijo Street"
          },
          {
            time: "19:30",
            title: "Farewell Dinner",
            description: "End your Kyoto trip with a traditional kaiseki (multi-course) dinner.",
            location: "Gion Karyo"
          }
        ]
      }
    ]
  },
  {
    id: "itin2",
    title: "Amalfi Coast Adventure: Clifftop Villages & Blue Waters",
    description: "A week-long journey along Italy's stunning Amalfi Coast. Experience breathtaking views, charming villages, and Mediterranean cuisine.",
    location: "Amalfi Coast, Italy",
    coverImage: "https://images.unsplash.com/photo-1533923156502-be31530547c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1533923156502-be31530547c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1535978245307-1e92aa8fa9ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "Week",
    experienceType: "Romantic",
    userId: "user2",
    user: users[1],
    likes: 529,
    comments: 63,
    createdAt: "2023-07-21T15:45:00Z",
    days: [
      {
        day: 1,
        title: "Arrival in Positano",
        description: "Begin your journey in the colorful cliffside village of Positano.",
        activities: [
          {
            time: "10:00",
            title: "Arrive in Positano",
            description: "Check into your accommodation and take in the stunning views of the colorful houses cascading down to the sea.",
            location: "Positano"
          },
          {
            time: "12:00",
            title: "Explore Positano",
            description: "Walk through the charming streets of Positano and visit the famous Piazza del Duomo.",
            location: "Positano"
          },
          {
            time: "14:00",
            title: "Visit the Amalfi Coast",
            description: "Explore the stunning coastline of Amalfi, known for its dramatic cliffs and crystal-clear waters.",
            location: "Amalfi Coast"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Italian meal at one of the local restaurants in Positano.",
            location: "Positano"
          }
        ]
      },
      {
        day: 2,
        title: "Explore the Amalfi Coast",
        description: "Continue exploring the Amalfi Coast and its charming villages.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional Italian breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Visit the Amalfi Coast",
            description: "Explore the stunning coastline of Amalfi, known for its dramatic cliffs and crystal-clear waters.",
            location: "Amalfi Coast"
          },
          {
            time: "12:00",
            title: "Explore Positano",
            description: "Walk through the charming streets of Positano and visit the famous Piazza del Duomo.",
            location: "Positano"
          },
          {
            time: "14:00",
            title: "Visit the Amalfi Coast",
            description: "Explore the stunning coastline of Amalfi, known for its dramatic cliffs and crystal-clear waters.",
            location: "Amalfi Coast"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Italian meal at one of the local restaurants in Positano.",
            location: "Positano"
          }
        ]
      }
    ]
  },
  {
    id: "itin3",
    title: "New Zealand South Island: Ultimate Outdoor Adventure",
    description: "Two weeks exploring New Zealand's South Island. Hike among dramatic mountains, kayak in pristine fjords, and experience adrenaline activities.",
    location: "South Island, New Zealand",
    coverImage: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1512291313946-5bd88c5c0fab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "2+ Weeks",
    experienceType: "Adventure",
    userId: "user3",
    user: users[2],
    likes: 728,
    comments: 89,
    createdAt: "2023-08-03T09:15:00Z",
    days: [
      {
        day: 1,
        title: "Christchurch to Lake Tekapo",
        description: "Journey from Christchurch to the stunning Lake Tekapo.",
        activities: [
          {
            time: "08:00",
            title: "Pick up rental car in Christchurch",
            description: "Start your South Island adventure by picking up your rental vehicle.",
            location: "Christchurch Airport"
          },
          {
            time: "10:00",
            title: "Explore the Southern Alps",
            description: "Hike through the stunning Southern Alps and enjoy breathtaking views of the surrounding mountains.",
            location: "Southern Alps"
          },
          {
            time: "12:00",
            title: "Visit Lake Tekapo",
            description: "Explore the stunning Lake Tekapo, known for its crystal-clear waters and stunning views of the surrounding mountains.",
            location: "Lake Tekapo"
          },
          {
            time: "14:00",
            title: "Kayak in the Fiordland National Park",
            description: "Kayak in the Fiordland National Park and experience the stunning natural beauty of New Zealand.",
            location: "Fiordland National Park"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional New Zealand meal at one of the local restaurants in the area.",
            location: "Christchurch"
          }
        ]
      },
      {
        day: 2,
        title: "Explore the South Island",
        description: "Continue exploring the South Island and its stunning natural beauty.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional New Zealand breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Explore the Southern Alps",
            description: "Hike through the stunning Southern Alps and enjoy breathtaking views of the surrounding mountains.",
            location: "Southern Alps"
          },
          {
            time: "12:00",
            title: "Visit Lake Tekapo",
            description: "Explore the stunning Lake Tekapo, known for its crystal-clear waters and stunning views of the surrounding mountains.",
            location: "Lake Tekapo"
          },
          {
            time: "14:00",
            title: "Kayak in the Fiordland National Park",
            description: "Kayak in the Fiordland National Park and experience the stunning natural beauty of New Zealand.",
            location: "Fiordland National Park"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional New Zealand meal at one of the local restaurants in the area.",
            location: "Christchurch"
          }
        ]
      }
    ]
  },
  {
    id: "itin4",
    title: "Exploring Barcelona: City of Gaudí and Gastronomy",
    description: "A perfect long weekend in Barcelona. Experience stunning architecture, vibrant markets, and delicious Catalan cuisine in this Mediterranean gem.",
    location: "Barcelona, Spain",
    coverImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "Long Weekend",
    experienceType: "Cultural",
    userId: "user4",
    user: users[3],
    likes: 413,
    comments: 51,
    createdAt: "2023-09-12T13:20:00Z",
    days: [
      {
        day: 1,
        title: "Gaudí's Barcelona",
        description: "Explore the iconic works of Antoni Gaudí throughout Barcelona.",
        activities: [
          {
            time: "09:00",
            title: "Visit Sagrada Familia",
            description: "Begin your day at Gaudí's masterpiece, the still-unfinished Sagrada Familia basilica.",
            location: "Sagrada Familia",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "11:00",
            title: "Explore Park Güell",
            description: "Walk through Park Güell, known for its colorful mosaic tiles and stunning views of Barcelona.",
            location: "Park Güell"
          },
          {
            time: "13:00",
            title: "Visit La Rambla",
            description: "Walk through La Rambla, the main street of Barcelona and a popular shopping and dining area.",
            location: "La Rambla"
          },
          {
            time: "15:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Catalan meal at one of the local restaurants in Barcelona.",
            location: "Barcelona"
          }
        ]
      },
      {
        day: 2,
        title: "Explore Barcelona",
        description: "Continue exploring Barcelona and its stunning architecture.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional Catalan breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Visit Sagrada Familia",
            description: "Begin your day at Gaudí's masterpiece, the still-unfinished Sagrada Familia basilica.",
            location: "Sagrada Familia",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          },
          {
            time: "12:00",
            title: "Explore Park Güell",
            description: "Walk through Park Güell, known for its colorful mosaic tiles and stunning views of Barcelona.",
            location: "Park Güell"
          },
          {
            time: "14:00",
            title: "Visit La Rambla",
            description: "Walk through La Rambla, the main street of Barcelona and a popular shopping and dining area.",
            location: "La Rambla"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Catalan meal at one of the local restaurants in Barcelona.",
            location: "Barcelona"
          }
        ]
      }
    ]
  },
  {
    id: "itin5",
    title: "Bali Wellness Retreat: Mind, Body, and Soul",
    description: "A rejuvenating week in Bali focused on wellness. Experience yoga in rice terraces, spa treatments, and healthy cuisine in this tropical paradise.",
    location: "Bali, Indonesia",
    coverImage: "https://images.unsplash.com/photo-1581974206967-93856b25aa13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1581974206967-93856b25aa13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1557717188-529c1a580299?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "Week",
    experienceType: "Wellness",
    userId: "user1",
    user: users[0],
    likes: 621,
    comments: 72,
    createdAt: "2023-10-05T16:40:00Z",
    days: [
      {
        day: 1,
        title: "Arrival & Relaxation",
        description: "Begin your wellness journey with gentle relaxation and acclimatization.",
        activities: [
          {
            time: "10:00",
            title: "Check-in at retreat",
            description: "Arrive at your wellness retreat in Ubud and settle into your accommodation.",
            location: "Ubud"
          },
          {
            time: "12:00",
            title: "Yoga in Rice Terraces",
            description: "Enjoy a yoga class in the beautiful rice terraces of Ubud.",
            location: "Ubud"
          },
          {
            time: "14:00",
            title: "Spa Treatments",
            description: "Enjoy a range of spa treatments at the retreat, including massages and facials.",
            location: "Ubud"
          },
          {
            time: "16:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Indonesian meal at one of the local restaurants in Ubud.",
            location: "Ubud"
          }
        ]
      },
      {
        day: 2,
        title: "Explore Ubud",
        description: "Continue exploring Ubud and its stunning natural beauty.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional Indonesian breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Yoga in Rice Terraces",
            description: "Enjoy a yoga class in the beautiful rice terraces of Ubud.",
            location: "Ubud"
          },
          {
            time: "12:00",
            title: "Spa Treatments",
            description: "Enjoy a range of spa treatments at the retreat, including massages and facials.",
            location: "Ubud"
          },
          {
            time: "14:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Indonesian meal at one of the local restaurants in Ubud.",
            location: "Ubud"
          }
        ]
      }
    ]
  },
  {
    id: "itin6",
    title: "African Safari: Wildlife Adventure in Tanzania",
    description: "An unforgettable safari through Tanzania's iconic national parks. Witness the Big Five and experience the Great Migration in this wildlife paradise.",
    location: "Tanzania",
    coverImage: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    images: [
      "https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1550953581-a75aa86fec90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
    ],
    tripLength: "2+ Weeks",
    experienceType: "Adventure",
    userId: "user2",
    user: users[1],
    likes: 892,
    comments: 103,
    createdAt: "2023-11-18T11:25:00Z",
    days: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Begin your safari adventure in Arusha, the gateway to Tanzania's northern safari circuit.",
        activities: [
          {
            time: "09:00",
            title: "Arrival at Kilimanjaro International Airport",
            description: "Meet your guide and transfer to your lodge in Arusha.",
            location: "Kilimanjaro International Airport"
          },
          {
            time: "11:00",
            title: "Explore the Serengeti National Park",
            description: "Visit the Serengeti National Park and witness the Great Migration.",
            location: "Serengeti National Park"
          },
          {
            time: "13:00",
            title: "Visit the Ngorongoro Crater",
            description: "Explore the Ngorongoro Crater and witness the Big Five.",
            location: "Ngorongoro Crater"
          },
          {
            time: "15:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Tanzanian meal at one of the local restaurants in Arusha.",
            location: "Arusha"
          }
        ]
      },
      {
        day: 2,
        title: "Explore Tanzania",
        description: "Continue exploring Tanzania and its stunning natural beauty.",
        activities: [
          {
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Enjoy a traditional Tanzanian breakfast at your accommodation."
          },
          {
            time: "10:00",
            title: "Explore the Serengeti National Park",
            description: "Visit the Serengeti National Park and witness the Great Migration.",
            location: "Serengeti National Park"
          },
          {
            time: "12:00",
            title: "Visit the Ngorongoro Crater",
            description: "Explore the Ngorongoro Crater and witness the Big Five.",
            location: "Ngorongoro Crater"
          },
          {
            time: "14:00",
            title: "Dinner at a Local Restaurant",
            description: "Enjoy a traditional Tanzanian meal at one of the local restaurants in Arusha.",
            location: "Arusha"
          }
        ]
      }
    ]
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: "comment1",
    content: "This itinerary was perfect! We followed it exactly and had an amazing time.",
    userId: "user2",
    user: users[1],
    itineraryId: "itin1",
    createdAt: "2023-06-18T14:20:00Z"
  },
  {
    id: "comment2",
    content: "The temple recommendations were spot on. I'd add Kiyomizu-dera to the list too!",
    userId: "user3",
    user: users[2],
    itineraryId: "itin1",
    createdAt: "2023-06-20T09:45:00Z"
  },
  {
    id: "comment3",
    content: "We're planning our trip based on this itinerary. Any food recommendations?",
    userId: "user4",
    user: users[3],
    itineraryId: "itin1",
    createdAt: "2023-07-05T16:30:00Z"
  },
  {
    id: "comment4",
    content: "The views along the coast were even better than these photos show!",
    userId: "user1",
    user: users[0],
    itineraryId: "itin2",
    createdAt: "2023-07-23T12:15:00Z"
  },
  {
    id: "comment5",
    content: "We stayed in Positano for an extra night based on your suggestion - best decision ever.",
    userId: "user3",
    user: users[2],
    itineraryId: "itin2",
    createdAt: "2023-08-01T18:50:00Z"
  }
];

// Functions to get data
export const getItineraries = () => itineraries;
export const getItineraryById = (id: string) => itineraries.find(itinerary => itinerary.id === id);
export const getItinerariesByUser = (userId: string) => itineraries.filter(itinerary => itinerary.userId === userId);
export const getCommentsByItinerary = (itineraryId: string) => comments.filter(comment => comment.itineraryId === itineraryId);
export const getUserById = (id: string) => users.find(user => user.id === id);

// Functions to filter itineraries
export const filterItinerariesByLocation = (location: string) => {
  if (!location) return itineraries;
  return itineraries.filter(itinerary => 
    itinerary.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const filterItinerariesByTripLength = (tripLength: string) => {
  if (!tripLength) return itineraries;
  return itineraries.filter(itinerary => 
    itinerary.tripLength === tripLength
  );
};

export const filterItinerariesByExperienceType = (experienceType: string) => {
  if (!experienceType) return itineraries;
  return itineraries.filter(itinerary => 
    itinerary.experienceType === experienceType
  );
};

export const searchItineraries = (query: string) => {
  if (!query) return itineraries;
  const lowercaseQuery = query.toLowerCase();
  return itineraries.filter(itinerary => 
    itinerary.title.toLowerCase().includes(lowercaseQuery) ||
    itinerary.description.toLowerCase().includes(lowercaseQuery) ||
    itinerary.location.toLowerCase().includes(lowercaseQuery) ||
    itinerary.experienceType.toLowerCase().includes(lowercaseQuery)
  );
};

// Get unique values for filters
export const getTripLengths = () => {
  const lengths = new Set(itineraries.map(itinerary => itinerary.tripLength));
  return Array.from(lengths);
};

export const getExperienceTypes = () => {
  const types = new Set(itineraries.map(itinerary => itinerary.experienceType));
  return Array.from(types);
};

export const getLocations = () => {
  const locations = new Set(itineraries.map(itinerary => itinerary.location));
  return Array.from(locations);
};
