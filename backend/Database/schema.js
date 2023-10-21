const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  height: 0,
  weight: 0,
  weightUnit: "",
  workoutType: "",
  macrosSetupCompleted: false,
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  isAdmin: false,
  sessionsPurchased: [
    {
      coachId: "",
      sessionDate: "",
      sessionDuration: 0,
      sessionPrice: 0,
      status: "",
    },
  ],
  trackingData: {
    calories: [
      {
        date: "",
        caloriesConsumed: 0,
        caloriesBurned: 0,
        dailyTargetCalories: 0,
      },
    ],
    nutrition: [
      {
        date: "",
        food: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        dailyTargetCalories: 0,
        dailyTargetProtein: 0,
        dailyTargetCarbs: 0,
        dailyTargetFat: 0,
      },
    ],
    weight: [
      {
        date: "",
        weight: 0,
      },
    ],
  },
  workoutRoutines: [
    {
      name: "Beginner Full Body Workout",
      description:
        "A simple workout for beginners to build overall strength and fitness",
      exercises: [
        {
          name: "Bodyweight Squats",
          muscleGroupTargeted: "Legs",
          instructions:
            "Stand with feet shoulder-width apart. Bend your knees and lower your hips down as if sitting in a chair. Keep your chest up and back straight. Push through your heels to return to the starting position.",
          sets: 3,
          reps: 12,
          restTime: 60,
        },
        {
          name: "Push-ups",
          muscleGroupTargeted: "Chest, Shoulders, Triceps",
          instructions:
            "Start in a plank position with hands slightly wider than shoulder-width apart. Lower your body by bending your elbows until your chest almost touches the floor. Push back up to the starting position.",
          sets: 3,
          reps: 10,
          restTime: 60,
        },
        {
          name: "Plank",
          muscleGroupTargeted: "Core",
          instructions:
            "Start in a push-up position with your elbows directly under your shoulders. Engage your core and hold your body in a straight line from head to heels. Keep your abs tight and breathe steadily.",
          sets: 3,
          reps: 20,
          restTime: 45,
        },
        {
          name: "Bent-over Dumbbell Rows",
          muscleGroupTargeted: "Back, Biceps",
          instructions:
            "Hold a dumbbell in each hand, bend your knees slightly, and hinge at the hips. Keep your back straight and core engaged. Pull the dumbbells towards your hips, squeezing your shoulder blades together. Lower the weights back down.",
          sets: 3,
          reps: 12,
          restTime: 45,
        },
        {
          name: "Dumbbell Shoulder Press",
          muscleGroupTargeted: "Shoulders",
          instructions:
            "Hold a dumbbell in each hand at shoulder height with palms facing forward. Press the weights overhead until your arms are fully extended. Lower the weights back down to shoulder level.",
          sets: 3,
          reps: 10,
          restTime: 45,
        },
        {
          name: "Hamstring Stretch",
          muscleGroupTargeted: "Hamstrings",
          instructions:
            "Sit on the floor with one leg extended and the other bent. Reach towards your toes on the extended leg, feeling a stretch in the back of your thigh. Hold the stretch for 20-30 seconds on each leg.",
          sets: 1,
          reps: 1,
          restTime: 0,
        },
        {
          name: "Chest Stretch",
          muscleGroupTargeted: "Chest",
          instructions:
            "Stand near a wall or doorway, place your forearm against the surface, and gently turn your body away until you feel a stretch in your chest. Hold for 20-30 seconds on each side.",
          sets: 1,
          reps: 1,
          restTime: 0,
        },
      ],
    },
  ],
  coaches: [
    {
      firstName: "",
      lastName: "",
      sessions: [
        {
          sessionDuration: 0,
          sessionPrice: 0,
        },
      ],
    },
  ],
};

export default defaultUser;
