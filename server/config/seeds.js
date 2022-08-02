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
      image: 'squats.png',
      demo: 'squat-demo.gif',
      category: categories[0]._id,
      mgroup: "Quads, Glutes, Adductors",
    },
    {
      name: 'Leg Press',
      category: categories[0]._id,
      description:
        "The leg press is a compound weight training exercise in which the individual pushes a weight or resistance away from them using their legs. The term leg press machine refers to the apparatus used to perform this exercise. The leg press can be used to evaluate an athlete's overall lower body strength (from the gluteus Maximus to the lower leg muscles). It can help to build squat strength. If performed correctly, the inclined leg press can help develop knees to manage heavier free weights, on the other hand, it has the potential to inflict grave injury: the knees could bend the wrong way if they are locked during the exercise.",
      image: 'Leg-Press.jpg',
      demo: 'legpress-demo.gif',
      mgroup: "Quads, Glutes, Adductors",
    },
    {
      name: 'Leg Extension',
      category: categories[0]._id,
      description:
        "The leg extension is a resistance weight training exercise that targets the quadriceps muscle (m. quadriceps femoris) in the legs. The exercise is done using a machine called the Leg Extension Machine. There are various manufacturers of these machines and each one is slightly different. Most gym and weight rooms will have the machine in their facility. The leg extension is an isolated exercise targeting one specific muscle group, the quadriceps.",
      image: 'leg-extension.png',
      demo: 'legextension-demo.gif',
      mgroup: "Quads",
    },
    {
      name: 'Leg Curls',
      category: categories[0]._id,
      description:
        "The dumbbell split squat is a popular lower-body exercise to build strength and muscle one leg at a time. It can be used to teach proper lunge form, but is also valuable on its own when trained in traditional strength-focused rep ranges, such as 5-8 reps per set, or for higher reps to build muscle or for conditioning.",
      image: 'leg-curls.jpg',
      demo: 'legcurls-demo.gif',
      mgroup: "Hamstrings",
    },
    {
      name: 'Bench Press',
      category: categories[1]._id,
      description:
        "The bench press, or chest press, is a weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. Although the bench press is a full-body exercise, the muscles primarily used are the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.",
      image: 'benchpress.png',
      demo: 'benchpress-demo.gif',
      mgroup: "Chest, Shoulders, Triceps",
    },
    {
      name: 'Dumbbell Fly',
      category: categories[1]._id,
      description:
        "The dumbbell fly, also known as the dumbbell chest fly, is an upper body exercise that works muscle groups in your chest, shoulders, and arms. A dumbbell fly is performed by lying on a flat bench and lowering a pair of dumbbells to your sides while keeping relatively straight arms with slightly bent elbows.",
      image: 'dumbbell-fly.png',
      demo: 'dumbbellfly-demo.gif',
      mgroup: "Chest, Shoulders",
    },
    {
      name: 'Incline Dumbell Press',
      category: categories[1]._id,
      description:
        "The incline dumbbell press is a free weight exercise designed to target the chest, shoulders, and triceps, hitting each side of the body independently. Unlike the more traditional flat bench press, the incline press shifts the focus of the movement to the upper portion of the pectoral muscle groups and the front of the shoulder. This allows for greater hypertrophy (muscle growth) of the upper chest when the exercise is performed regularly.",
      image: 'incline-dumbbell-press.png',
      demo: 'inclinedumbbellpress-demo.gif',
      mgroup: "Chest, Shoulders, Triceps",
    },
    {
      name: 'Barbell Bent-Over Row',
      category: categories[2]._id,
      description:
        "The bent over row is a back day staple exercise and is considered one of the best muscle building back building exercises you can do. Sometimes referred to as the barbell row, the bent over row is a staple movement in most muscle building workouts. Those looking to build muscle utilize the bent over row to target their back, bicep and core muscle. Those in powerlifting and strength circles perform bent over rows to increase their strength on the big 3 movements. The bent over row is typically used to build and strengthen the muscles of the upper back (latissimus dorsi, rhomboids, and trapezius). However, it requires assistance from muscles of the low back, core, and arms to perform a bent over row correctly.",
      image: 'bentover-rows.png',
      demo: 'barbellbentoverrow-demo.gif',
      mgroup: "Lats, Biceps, Traps",
    },
    {
      name: 'Lat Pulldown',
      category: categories[2]._id,
      description:
        "A lat pulldown is a compound exercise that targets your back muscles. Perform the lat pulldown exercise by sitting in front of a cable machine with a pulldown bar. Grab the bar and bend your elbows to lower it closer towards your upper chest. Raise the bar and repeat this movement for your desired number of repetitions.",
      image: 'lat-pulldown.jpg',
      demo: 'latpulldown-demo.gif',
      mgroup: "Lats, Biceps",
    },
    {
      name: 'Deadlift',
      category: categories[2]._id,
      description:
        "The deadlift is a movement in which your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor. Your back is flat throughout the movement. Some benefits of performing deadlifts include strengthening and gaining more definition in your upper and lower back, glutes, and hamstrings.",
      image: 'deadlift.jpg',
      demo: 'deadlift-demo.gif',
      mgroup: "Lower-back, Glutes, Hamstrings",
    },
    {
      name: 'Barbell Curl',
      category: categories[3]._id,
      description:
        "A barbell curl is a variation of the biceps curl that uses a weighted barbell. Perform barbell curls by grabbing a barbell with a shoulder-width supinated grip (palms facing towards your body). Hinge your elbows, and lift the barbell toward your chest.",
      image: 'barbell-curl.jpg',
      demo: 'barbellcurl-demo.gif',
      mgroup: "Biceps, Forearms",
    },
    {
      name: 'Preacher Curl',
      category: categories[3]._id,
      description:
        "Curl the weight up, keeping your upper arms on the bench, until your forearms are vertical. Pause for a second at the top of the curl, then slowly lower the weight until your arms are fully extended once again. Count for three beats as you lower.",
      image: 'preacher-curl.jpg',
      demo: 'preachercurl-demo.gif',
      mgroup: "Biceps, Forearms",
      quantity: 100
    },
    {
      name: 'Tricep Extensions',
      category: categories[3]._id,
      description:
        "The triceps extension is an isolation exercise that works the muscle on the back of the upper arm. This muscle, called the triceps, has three heads: the long head, the lateral head, and the medial head. The three heads work together to extend the forearm at the elbow joint",
      image: 'tricep-extension.jpg',
      demo: 'tricepextensions-demo.gif',
      mgroup: "Triceps",
    },
    {
      name: 'Close Grip Bench Press',
      category: categories[3]._id,
      description:
        "What Is the Close Grip Bench Press? The close grip bench press is a compound exercise performed by lying on a flat bench and lifting a weighted barbell. This type of bench press uses a closer grip than a traditional bench press. The posture of a close grip bench press puts special emphasis on the triceps.",
      image: 'close-grip-bench.jpg',
      demo: 'closegripbench-demo.gif',
      mgroup: "Triceps, Chest, Shoulders",
    },
    {
      name: 'Dumbbell Shoulder Press',
      category: categories[4]._id,
      description:
        "Sit on an upright bench holding a dumbbell in each hand at shoulder height with your palms facing away from you. Keep your chest up and your core braced, and look straight forward throughout the move. Press the weights directly upwards until your arms are straight and the weights touch above your head.",
      image: 'shoulder-press.png',
      demo: 'shoulderpress-demo.gif',
      mgroup: "Shoulders, Triceps, Traps",
    },
    {
      name: 'Lateral Raise',
      category: categories[4]._id,
      description:
        "A lateral raise is a strength training shoulder exercise characterized by lifting a pair of dumbbells away from your body in an external rotation. Lateral raises work the trapezius muscle in your upper back as well as the deltoid muscle group in your shoulders—particularly the anterior and lateral deltoids",
      image: 'lateral-raise.png',
      demo: 'lateralraises-demo.gif',
      mgroup: "Shoulder, Traps",
    },
    {
      name: 'Arnold Press',
      category: categories[4]._id,
      description:
        "The Arnold presses is defined by a wrist rotation movement that ends when your palms face forward at the top of the press. The Arnold press uses dumbbells to work many of the main muscle groups in your upper body, including the triceps, trapezius, and the delts.",
      image: 'arnold-press.jpg',
      demo: 'arnoldpress-demo.gif',
      mgroup: "Shoulder, Traps, Lats",
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