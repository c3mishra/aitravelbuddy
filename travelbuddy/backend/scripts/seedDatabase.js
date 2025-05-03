const mongoose = require('mongoose');
const User = require('../src/models/User');
const Itinerary = require('../src/models/Itinerary');
const Comment = require('../src/models/Comment');

// Mock data - Users
const users = [
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    password: "password123",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Travel enthusiast and photographer. Always seeking new adventures.",
    followers: 1247,
    following: 365
  },
  {
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Culinary explorer and culture lover. Finding the best food spots around the world.",
    followers: 834,
    following: 221
  },
  {
    name: "Sophia Chen",
    email: "sophia@example.com",
    password: "password123",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Adventure seeker and outdoor enthusiast. Mountains are my second home.",
    followers: 1689,
    following: 412
  },
  {
    name: "Michael Brooks",
    email: "michael@example.com",
    password: "password123",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Digital nomad traveling the world while working. Coffee and wifi hunter.",
    followers: 965,
    following: 278
  }
];

// Function to format day activities into a string format for the backend model
// const formatDayActivities = (activities) => {
//   return activities.map(activity => {
//     return `${activity.time} - ${activity.title}: ${activity.description}${activity.location ? ` @ ${activity.location}` : ''}`;
//   }).join('\n\n');
// };

// Connect to the database
mongoose
  .connect('mongodb://localhost:27017/travelbuddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB...');
    
    try {
      // Clear existing data
      await User.deleteMany({});
      await Itinerary.deleteMany({});
      await Comment.deleteMany({});
      
      console.log('Previous data cleared...');

      // Insert users
      const createdUsers = await User.insertMany(users);
      console.log(`${createdUsers.length} users created...`);
      
      // Map user IDs to easier access
      const userMap = createdUsers.reduce((acc, user, index) => {
        acc[`user${index + 1}`] = user._id;
        return acc;
      }, {});

      // Create itineraries
      const itineraries = [
        {
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
          user: userMap.user1,
          likes: 347,
          comments: 42,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "08:00",
                  title: "Breakfast at Nishiki Market",
                  description: "Start your day with a traditional Japanese breakfast at the famous Nishiki Market, known as 'Kyoto's Kitchen'.",
                  location: "Nishiki Market"
                },
                {
                  time: "10:00",
                  title: "Visit Kiyomizu-dera Temple",
                  description: "Explore this UNESCO World Heritage site with its wooden stage that offers stunning views of cherry and maple trees below.",
                  location: "Kiyomizu-dera"
                },
                {
                  time: "12:30",
                  title: "Lunch in Higashiyama District",
                  description: "Enjoy lunch at one of the traditional restaurants in this well-preserved historic district.",
                  location: "Higashiyama District"
                }
              ],
              accommodation: "Kyoto Traditional Ryokan",
              meals: "Breakfast at Nishiki Market, Lunch in Higashiyama, Dinner at Pontocho Alley",
              notes: "Eastern Kyoto Temples & Gardens day"
            },
            {
              dayNumber: 2,
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
                  location: "Arashiyama Bamboo Grove"
                },
                {
                  time: "11:30",
                  title: "Explore Tenryuji Temple",
                  description: "Visit this UNESCO World Heritage site, known for its beautiful zen garden.",
                  location: "Tenryuji Temple"
                }
              ],
              accommodation: "Kyoto Traditional Ryokan",
              meals: "Breakfast at hotel, Lunch in Arashiyama, Farewell Dinner at Gion Karyo",
              notes: "Arashiyama & Northern Kyoto day"
            }
          ]
        },
        {
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
          user: userMap.user2,
          likes: 529,
          comments: 63,
          days: [
            {
              dayNumber: 1,
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
                }
              ],
              accommodation: "Positano Cliffside Hotel",
              meals: "Lunch and dinner in Positano",
              notes: "Arrival in Positano day"
            }
          ]
        },
        {
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
          user: userMap.user3,
          likes: 728,
          comments: 89
        },
        {
          title: "Golden Triangle Tour: Delhi, Agra & Jaipur",
          description: "Experience India's iconic Golden Triangle, covering the historic capital Delhi, the city of Taj Mahal - Agra, and the pink city of Jaipur with its royal heritage.",
          location: "Delhi-Agra-Jaipur, India",
          coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          images: [
            "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1585484173186-5f8b2f9c1b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          ],
          tripLength: "Week",
          experienceType: "Cultural",
          user: userMap.user1,
          likes: 582,
          comments: 74,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "09:00",
                  title: "Explore Old Delhi",
                  description: "Start your journey with a rickshaw ride through the narrow lanes of Old Delhi, visiting Jama Masjid and experiencing the bustling Chandni Chowk market.",
                  location: "Old Delhi"
                },
                {
                  time: "14:00",
                  title: "Visit India Gate & Qutub Minar",
                  description: "Explore modern Delhi with visits to the iconic India Gate and the UNESCO World Heritage Site Qutub Minar complex.",
                  location: "New Delhi"
                },
                {
                  time: "17:00",
                  title: "Evening at Humayun's Tomb",
                  description: "End your day at this magnificent Mughal garden tomb that inspired the Taj Mahal.",
                  location: "Humayun's Tomb"
                }
              ],
              accommodation: "The Imperial New Delhi",
              meals: "Breakfast at hotel, Lunch at Karim's in Old Delhi, Dinner at Bukhara",
              notes: "Delhi historical and cultural exploration day"
            },
            {
              dayNumber: 2,
              activities: [
                {
                  time: "06:00",
                  title: "Drive to Agra",
                  description: "Early morning drive from Delhi to Agra (approx. 3-4 hours).",
                  location: "Delhi to Agra"
                },
                {
                  time: "10:30",
                  title: "Taj Mahal Visit",
                  description: "Experience the breathtaking beauty of the Taj Mahal, one of the world's most famous monuments of love.",
                  location: "Taj Mahal"
                },
                {
                  time: "15:00",
                  title: "Agra Fort Tour",
                  description: "Explore this UNESCO World Heritage Site, a magnificent red sandstone fort with stunning palaces and audience halls.",
                  location: "Agra Fort"
                }
              ],
              accommodation: "Oberoi Amarvilas",
              meals: "Breakfast at hotel, Lunch at Pind Balluchi, Dinner at hotel restaurant",
              notes: "Taj Mahal and Mughal architecture day"
            }
          ]
        },
        {
          title: "Kerala Backwaters: God's Own Country",
          description: "Journey through the serene backwaters, lush tea plantations, and pristine beaches of Kerala, experiencing its unique culture, cuisine, and tranquil landscapes.",
          location: "Kerala, India",
          coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          images: [
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1580428456083-42572a53b711?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          ],
          tripLength: "Week",
          experienceType: "Relaxation",
          user: userMap.user2,
          likes: 635,
          comments: 81,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "09:00",
                  title: "Explore Fort Kochi",
                  description: "Discover the colonial heritage of Fort Kochi with its Dutch, Portuguese, and British influences, including the famous Chinese fishing nets.",
                  location: "Fort Kochi"
                },
                {
                  time: "13:00",
                  title: "Kathakali Performance",
                  description: "Experience a traditional Kathakali dance performance, one of India's most stylized classical dance-drama forms.",
                  location: "Kerala Kathakali Centre"
                },
                {
                  time: "16:00",
                  title: "Spice Market Tour",
                  description: "Walk through the aromatic spice markets that made Kerala famous throughout history.",
                  location: "Mattancherry"
                }
              ],
              accommodation: "Brunton Boatyard",
              meals: "Breakfast at hotel, Lunch at traditional Kerala restaurant, Dinner at hotel",
              notes: "Cultural exploration of Kochi day"
            },
            {
              dayNumber: 2,
              activities: [
                {
                  time: "08:00",
                  title: "Drive to Alleppey",
                  description: "Morning drive to Alleppey, the gateway to Kerala's backwaters.",
                  location: "Kochi to Alleppey"
                },
                {
                  time: "11:00",
                  title: "Houseboat Check-in",
                  description: "Board your private traditional Kerala houseboat (kettuvallam) for an overnight cruise through the backwaters.",
                  location: "Alleppey Boat Jetty"
                },
                {
                  time: "14:00",
                  title: "Backwater Cruise",
                  description: "Cruise through the serene backwaters, observing rural Keralan life along the waterways.",
                  location: "Kerala Backwaters"
                }
              ],
              accommodation: "Traditional Kerala Houseboat",
              meals: "All meals prepared fresh on the houseboat by private chef",
              notes: "Kerala backwaters immersion day"
            }
          ]
        },
        {
          title: "Rajasthan Royal Heritage Tour",
          description: "Journey through the land of kings, exploring majestic forts, opulent palaces, vibrant markets, and the stark beauty of the Thar Desert in India's most colorful state.",
          location: "Rajasthan, India",
          coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          images: [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1568634452400-867d324334e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1590689857117-b78ffcf21454?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          ],
          tripLength: "10 Days",
          experienceType: "Heritage",
          user: userMap.user3,
          likes: 713,
          comments: 92,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "09:00",
                  title: "Amber Fort Visit",
                  description: "Experience the majestic Amber Fort with an elephant ride to the main courtyard, exploring its ornate halls and panoramic views.",
                  location: "Amber Fort, Jaipur"
                },
                {
                  time: "14:00",
                  title: "City Palace & Jantar Mantar",
                  description: "Visit Jaipur's City Palace complex and the astronomical observatory of Jantar Mantar, a UNESCO World Heritage site.",
                  location: "Jaipur City Center"
                },
                {
                  time: "17:00",
                  title: "Shopping in Local Markets",
                  description: "Explore Jaipur's vibrant markets, known for textiles, jewelry, and handicrafts at Johari Bazaar and Bapu Bazaar.",
                  location: "Jaipur Markets"
                }
              ],
              accommodation: "Rambagh Palace",
              meals: "Breakfast at hotel, Lunch at 1135 AD at Amber Fort, Dinner at hotel",
              notes: "Jaipur royal heritage day"
            },
            {
              dayNumber: 2,
              activities: [
                {
                  time: "08:00",
                  title: "Drive to Jodhpur",
                  description: "Morning drive from Jaipur to Jodhpur (approx. 5-6 hours), with stops at rural villages.",
                  location: "Jaipur to Jodhpur"
                },
                {
                  time: "15:00",
                  title: "Mehrangarh Fort Tour",
                  description: "Explore one of India's largest forts, perched 400 feet above the city with magnificent views of blue-painted Jodhpur.",
                  location: "Mehrangarh Fort"
                },
                {
                  time: "18:00",
                  title: "Blue City Walking Tour",
                  description: "Walk through the narrow lanes of the old city, discovering why Jodhpur is known as the 'Blue City'.",
                  location: "Jodhpur Old City"
                }
              ],
              accommodation: "Umaid Bhawan Palace",
              meals: "Breakfast at hotel, Lunch en route, Dinner at Indique",
              notes: "Travel to Jodhpur and fort exploration day"
            }
          ]
        },
        {
          title: "Varanasi: Spiritual Journey on the Ganges",
          description: "Experience India's spiritual heart in one of the world's oldest continuously inhabited cities. Witness ancient rituals, holy ghats, and the profound spirituality of the sacred Ganges River.",
          location: "Varanasi, India",
          coverImage: "https://images.unsplash.com/photo-1561361058-c12e04d4d252?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          images: [
            "https://images.unsplash.com/photo-1561361058-c12e04d4d252?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1571536802807-30aa7c468049?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1565633434283-b5902ae056ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          ],
          tripLength: "4 Days",
          experienceType: "Spiritual",
          user: userMap.user1,
          likes: 489,
          comments: 67,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "05:00",
                  title: "Sunrise Boat Ride",
                  description: "Experience a magical sunrise boat ride on the Ganges River, witnessing the morning rituals and prayers along the ghats.",
                  location: "Ganges River"
                },
                {
                  time: "09:00",
                  title: "Explore Old City Temples",
                  description: "Visit the Kashi Vishwanath Temple, one of India's most sacred Shiva temples, and other ancient sacred sites in the old city.",
                  location: "Varanasi Old City"
                },
                {
                  time: "16:00",
                  title: "Evening Ganga Aarti",
                  description: "Witness the spectacular Ganga Aarti ceremony at Dashashwamedh Ghat, a powerful spiritual ritual performed daily.",
                  location: "Dashashwamedh Ghat"
                }
              ],
              accommodation: "Taj Ganges",
              meals: "Breakfast at hotel, Lunch at Pizzeria Vaatika Cafe, Dinner at hotel",
              notes: "Spiritual immersion day"
            },
            {
              dayNumber: 2,
              activities: [
                {
                  time: "07:00",
                  title: "Morning Yoga Session",
                  description: "Participate in a traditional yoga session by the Ganges, connecting with India's ancient spiritual practice.",
                  location: "Assi Ghat"
                },
                {
                  time: "10:00",
                  title: "Excursion to Sarnath",
                  description: "Visit Sarnath, where Buddha gave his first sermon and explore the archaeological museum and Buddhist stupas.",
                  location: "Sarnath"
                },
                {
                  time: "16:00",
                  title: "Ghat Walking Tour",
                  description: "Walk along the river exploring different ghats, each with its own character and significance.",
                  location: "Varanasi Ghats"
                }
              ],
              accommodation: "Taj Ganges",
              meals: "Breakfast at hotel, Lunch at Sarnath, Dinner at Lotus Lounge",
              notes: "Buddhist heritage and ghat exploration day"
            }
          ]
        },
        {
          title: "Goa Beach Paradise: Sun, Sand & Portuguese Heritage",
          description: "Relax on pristine beaches, savor delicious seafood, experience vibrant nightlife, and explore the unique Portuguese colonial heritage of India's favorite coastal destination.",
          location: "Goa, India",
          coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
          images: [
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1587922546307-776227941871?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            "https://images.unsplash.com/photo-1582972236020-58d060126090?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          ],
          tripLength: "5 Days",
          experienceType: "Beach",
          user: userMap.user2,
          likes: 672,
          comments: 84,
          days: [
            {
              dayNumber: 1,
              activities: [
                {
                  time: "10:00",
                  title: "Beach Day at Calangute",
                  description: "Relax on Goa's most famous beach with water sports activities and beachside restaurants.",
                  location: "Calangute Beach"
                },
                {
                  time: "15:00",
                  title: "Visit Baga Beach",
                  description: "Stroll to neighboring Baga Beach, known for its lively atmosphere and water sports.",
                  location: "Baga Beach"
                },
                {
                  time: "19:00",
                  title: "Seafood Dinner & Beach Shacks",
                  description: "Enjoy fresh seafood at a beach shack while watching the sunset over the Arabian Sea.",
                  location: "Baga Beach Shacks"
                }
              ],
              accommodation: "Taj Fort Aguada Resort",
              meals: "Breakfast at hotel, Lunch at Souza Lobo, Dinner at beach shack",
              notes: "North Goa beaches day"
            },
            {
              dayNumber: 2,
              activities: [
                {
                  time: "09:00",
                  title: "Old Goa Churches Tour",
                  description: "Explore UNESCO World Heritage churches of Old Goa including Basilica of Bom Jesus and Se Cathedral.",
                  location: "Old Goa"
                },
                {
                  time: "13:00",
                  title: "Fontainhas Walking Tour",
                  description: "Walk through Fontainhas, Goa's Latin Quarter, with its colorful Portuguese-style houses and heritage buildings.",
                  location: "Fontainhas, Panjim"
                },
                {
                  time: "16:00",
                  title: "Cruise on Mandovi River",
                  description: "Take an evening cruise on the Mandovi River with cultural performances and beautiful views.",
                  location: "Panjim Jetty"
                }
              ],
              accommodation: "Taj Fort Aguada Resort",
              meals: "Breakfast at hotel, Lunch at Viva Panjim, Dinner at Fisherman's Wharf",
              notes: "Goan Portuguese heritage day"
            }
          ]
        }
      ];

      const createdItineraries = await Itinerary.insertMany(itineraries);
      console.log(`${createdItineraries.length} itineraries created...`);

      // Map itinerary IDs
      const itineraryMap = createdItineraries.reduce((acc, itin, index) => {
        acc[`itin${index + 1}`] = itin._id;
        return acc;
      }, {});

      // Create comments
      const comments = [
        {
          content: "This itinerary was perfect! We followed it exactly and had an amazing time.",
          user: userMap.user2,
          itinerary: itineraryMap.itin1,
        },
        {
          content: "The temple recommendations were spot on. I'd add Kiyomizu-dera to the list too!",
          user: userMap.user3,
          itinerary: itineraryMap.itin1,
        },
        {
          content: "We're planning our trip based on this itinerary. Any food recommendations?",
          user: userMap.user4,
          itinerary: itineraryMap.itin1,
        },
        {
          content: "The views along the coast were even better than these photos show!",
          user: userMap.user1,
          itinerary: itineraryMap.itin2,
        }
      ];

      await Comment.insertMany(comments);
      console.log(`${comments.length} comments created...`);

      console.log('Database seeded successfully!');
      process.exit();
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });