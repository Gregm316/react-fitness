const db = require('./connection');
const { User, Exercise, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Legs' },
    { name: 'Chest' },
    { name: 'Back' },
    { name: 'Arms' },
    { name: 'Shoulders' }
  ]);

  console.log('categories seeded');

  await Exercise.deleteMany();

  const exercises = await Exercise.insertMany([
    {
      name: 'Squats',
      description:
        'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      // price: 2.99,
      quantity: 500
    },
    {
      name: 'Leg Press',
      category: categories[0]._id,
      description:
        "The leg press is a compound weight training exercise in which the individual pushes a weight or resistance away from them using their legs. The term leg press machine refers to the apparatus used to perform this exercise. The leg press can be used to evaluate an athlete's overall lower body strength (from the gluteus Maximus to the lower leg muscles). It can help to build squat strength. If performed correctly, the inclined leg press can help develop knees to manage heavier free weights, on the other hand, it has the potential to inflict grave injury: the knees could bend the wrong way if they are locked during the exercise.",
      image: 'canned-coffee.jpg',
      // price: 1.99,
      quantity: 500
    },
    {
      name: 'Leg Extension',
      category: categories[0]._id,
      description:
        "The leg extension is a resistance weight training exercise that targets the quadriceps muscle (m. quadriceps femoris) in the legs. The exercise is done using a machine called the Leg Extension Machine. There are various manufacturers of these machines and each one is slightly different. Most gym and weight rooms will have the machine in their facility. The leg extension is an isolated exercise targeting one specific muscle group, the quadriceps.",
      image: 'canned-coffee.jpg',
      // price: 1.99,
      quantity: 500
    },
    {
      name: 'Leg Curls',
      category: categories[0]._id,
      description:
        "The dumbbell split squat is a popular lower-body exercise to build strength and muscle one leg at a time. It can be used to teach proper lunge form, but is also valuable on its own when trained in traditional strength-focused rep ranges, such as 5-8 reps per set, or for higher reps to build muscle or for conditioning.",
      image: 'canned-coffee.jpg',
      // price: 1.99,
      quantity: 500
    },
    {
      name: 'Bench Press',
      category: categories[1]._id,
      description:
        "The bench press, or chest press, is a weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. Although the bench press is a full-body exercise, the muscles primarily used are the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.",
      image: 'toilet-paper.jpg',
      // price: 7.99,
      quantity: 20
    },
    {
      name: 'Dumbbell Fly',
      category: categories[1]._id,
      description:
        "The dumbbell fly, also known as the dumbbell chest fly, is an upper body exercise that works muscle groups in your chest, shoulders, and arms. A dumbbell fly is performed by lying on a flat bench and lowering a pair of dumbbells to your sides while keeping relatively straight arms with slightly bent elbows.",
      image: 'soap.jpg',
      // price: 3.99,
      quantity: 50
    },
    {
      name: 'Incline Dumbell Press',
      category: categories[1]._id,
      description:
        "The incline dumbbell press is a free weight exercise designed to target the chest, shoulders, and triceps, hitting each side of the body independently. Unlike the more traditional flat bench press, the incline press shifts the focus of the movement to the upper portion of the pectoral muscle groups and the front of the shoulder. This allows for greater hypertrophy (muscle growth) of the upper chest when the exercise is performed regularly.",
        image: 'wooden-spoons.jpg',
      // price: 14.99,
      quantity: 100
    },
    {
      name: 'Barbell Bent-Over Row',
      category: categories[2]._id,
      description:
        "The bent over row is a back day staple exercise and is considered one of the best muscle building back building exercises you can do. Sometimes referred to as the barbell row, the bent over row is a staple movement in most muscle building workouts. Those looking to build muscle utilize the bent over row to target their back, bicep and core muscle. Those in powerlifting and strength circles perform bent over rows to increase their strength on the big 3 movements. The bent over row is typically used to build and strengthen the muscles of the upper back (latissimus dorsi, rhomboids, and trapezius). However, it requires assistance from muscles of the low back, core, and arms to perform a bent over row correctly.",
      image: 'camera.jpg',
      // price: 399.99,
      quantity: 30
    },
    {
      name: 'Lat Pulldown',
      category: categories[2]._id,
      description:
      "A lat pulldown is a compound exercise that targets your back muscles. Perform the lat pulldown exercise by sitting in front of a cable machine with a pulldown bar. Grab the bar and bend your elbows to lower it closer towards your upper chest. Raise the bar and repeat this movement for your desired number of repetitions.",
      image: 'tablet.jpg',
      // price: 199.99,
      quantity: 30
    },
    {
      name: 'Deadlift',
      category: categories[2]._id,
      description:
        "The deadlift is a movement in which your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor. Your back is flat throughout the movement. Some benefits of performing deadlifts include strengthening and gaining more definition in your upper and lower back, glutes, and hamstrings.",      
        image: 'tablet.jpg',
      // price: 199.99,
      quantity: 30
    },
    {
      name: 'Barbell Curl',
      category: categories[3]._id,
      description:
        "A barbell curl is a variation of the biceps curl that uses a weighted barbell. Perform barbell curls by grabbing a barbell with a shoulder-width supinated grip (palms facing towards your body). Hinge your elbows, and lift the barbell toward your chest.",
      image: 'bedtime-book.jpg',
      // price: 9.99,
      quantity: 100
    },
    {
      name: 'Preacher Curl',
      category: categories[3]._id,
      description:
        "A barbell curl is a variation of the biceps curl that uses a weighted barbell. Perform barbell curls by grabbing a barbell with a shoulder-width supinated grip (palms facing towards your body). Hinge your elbows, and lift the barbell toward your chest.",
      image: 'bedtime-book.jpg',
      // price: 9.99,
      quantity: 100
    },
    {
      name: 'Preacher Curl',
      category: categories[3]._id,
      description:
        "A barbell curl is a variation of the biceps curl that uses a weighted barbell. Perform barbell curls by grabbing a barbell with a shoulder-width supinated grip (palms facing towards your body). Hinge your elbows, and lift the barbell toward your chest.",
      image: 'bedtime-book.jpg',
      // price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      // price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      // price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      // price: 7.99,
      quantity: 100
    },
  ]);

  console.log('exercises seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        exercises: [exercises[0]._id, exercises[0]._id, exercises[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
