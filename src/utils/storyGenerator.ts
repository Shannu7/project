import { Mood, Story } from '../types';

const storyTemplates: Record<Mood, { titles: string[], themes: string[], characters: string[], settings: string[] }> = {
  happy: {
    titles: ['The Sunshine Adventure', 'Rainbow Friends', 'The Giggling Garden', 'Happy Helpers'],
    themes: ['friendship', 'helping others', 'celebrating', 'sharing joy'],
    characters: ['a cheerful bunny', 'a singing bird', 'a dancing butterfly', 'a smiling sun'],
    settings: ['a colorful meadow', 'a magical playground', 'a sunny village', 'a flower garden']
  },
  calm: {
    titles: ['The Peaceful Lake', 'Quiet Forest Friends', 'The Gentle Breeze', 'Moonlight Dreams'],
    themes: ['finding peace', 'meditation', 'gentle friendship', 'quiet moments'],
    characters: ['a wise owl', 'a gentle deer', 'a floating cloud', 'a sleepy turtle'],
    settings: ['a serene lake', 'a quiet forest', 'a peaceful mountain', 'a cozy cave']
  },
  energetic: {
    titles: ['The Lightning Race', 'Super Speed Adventure', 'The Energy Crystal', 'Zoom and Dash'],
    themes: ['racing', 'adventure', 'overcoming challenges', 'teamwork'],
    characters: ['a speedy cheetah', 'a lightning bolt', 'an energetic squirrel', 'a rocket ship'],
    settings: ['a racing track', 'a mountain trail', 'a busy city', 'an adventure park']
  },
  mysterious: {
    titles: ['The Secret Door', 'Mystery of the Lost Key', 'The Whispering Woods', 'Hidden Treasure'],
    themes: ['solving mysteries', 'discovering secrets', 'magical discoveries', 'hidden worlds'],
    characters: ['a detective mouse', 'a magical cat', 'a wise wizard', 'a curious explorer'],
    settings: ['an old castle', 'a mysterious forest', 'a hidden cave', 'an ancient library']
  },
  melancholic: {
    titles: ['The Rainy Day Friend', 'Finding Hope', 'The Lonely Star', 'After the Storm'],
    themes: ['finding comfort', 'overcoming sadness', 'hope after difficulty', 'gentle healing'],
    characters: ['a caring teddy bear', 'a gentle rain cloud', 'a understanding friend', 'a warm firefly'],
    settings: ['a cozy cabin', 'a quiet garden', 'a peaceful pond', 'a warm library']
  },
  excited: {
    titles: ['The Big Surprise', 'Party Time Adventure', 'The Magic Show', 'Celebration Day'],
    themes: ['surprises', 'celebrations', 'magical moments', 'joyful discoveries'],
    characters: ['a party elephant', 'a magical unicorn', 'a juggling monkey', 'a festive peacock'],
    settings: ['a carnival', 'a birthday party', 'a circus tent', 'a festival ground']
  },
  adventurous: {
    titles: ['The Great Expedition', 'Mountain Climbers', 'Jungle Explorer', 'Ocean Voyage'],
    themes: ['exploration', 'courage', 'discovering new places', 'brave journeys'],
    characters: ['a brave lion', 'an explorer bear', 'a sailing dolphin', 'a climbing monkey'],
    settings: ['a tall mountain', 'a dense jungle', 'a vast ocean', 'an unexplored island']
  },
  dreamy: {
    titles: ['The Cloud Castle', 'Starlight Journey', 'Dream Weaver', 'The Floating Garden'],
    themes: ['imagination', 'magical dreams', 'floating adventures', 'wish fulfillment'],
    characters: ['a dream fairy', 'a cloud sheep', 'a star dancer', 'a moon rabbit'],
    settings: ['a cloud kingdom', 'a starry sky', 'a floating island', 'a dream world']
  }
};

export const generateStory = async (mood: Mood): Promise<Story> => {
  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
  
  const template = storyTemplates[mood];
  const title = template.titles[Math.floor(Math.random() * template.titles.length)];
  const theme = template.themes[Math.floor(Math.random() * template.themes.length)];
  const character = template.characters[Math.floor(Math.random() * template.characters.length)];
  const setting = template.settings[Math.floor(Math.random() * template.settings.length)];
  
  const storyContent = generateStoryContent(mood, theme, character, setting);
  
  return {
    id: Date.now().toString(),
    mood,
    title,
    content: storyContent,
    createdAt: new Date()
  };
};

const generateStoryContent = (mood: Mood, theme: string, character: string, setting: string): string => {
  const storyParts = {
    happy: [
      `Once upon a time, in ${setting}, there lived ${character} who loved ${theme}.`,
      `Every morning, ${character} would wake up with a big smile and spread joy throughout ${setting}.`,
      `One day, ${character} discovered that ${theme} could make everyone around them happy too.`,
      `${character} organized a wonderful celebration where all the friends in ${setting} came together.`,
      `They laughed, played games, and shared delicious treats under the warm sunshine.`,
      `From that day forward, ${setting} became known as the happiest place in the world, all thanks to ${character}'s kind heart.`,
      `And they all lived happily ever after, spreading joy wherever they went! 🌟`
    ],
    calm: [
      `In the peaceful ${setting}, ${character} found the perfect spot for ${theme}.`,
      `Every evening, ${character} would sit quietly and listen to the gentle sounds of nature.`,
      `The soft whispers of the wind and the gentle rustling of leaves brought deep peace.`,
      `${character} learned that ${theme} was the key to finding inner happiness.`,
      `Soon, other forest friends joined ${character} in these quiet moments.`,
      `Together, they discovered that sometimes the most beautiful adventures happen in stillness.`,
      `And so, ${setting} became a sanctuary of peace for all who needed rest. 🕊️`
    ],
    energetic: [
      `${character} was the fastest and most energetic friend in all of ${setting}!`,
      `Every day brought new opportunities for ${theme} and exciting challenges.`,
      `One morning, ${character} heard about a great race that would test their speed and courage.`,
      `With determination and lots of practice, ${character} prepared for the big day.`,
      `The race was thrilling, with loops, jumps, and obstacles that made everyone cheer!`,
      `${character} didn't just win the race, but also helped other friends along the way.`,
      `The celebration afterward was filled with high-fives, cheers, and lots of happy energy! ⚡`
    ],
    mysterious: [
      `Deep in ${setting}, ${character} stumbled upon something very mysterious.`,
      `It was an old, glowing object that seemed to hold secrets about ${theme}.`,
      `${character} carefully examined the mysterious discovery, looking for clues.`,
      `With each clue they found, the mystery became more and more interesting.`,
      `Other curious friends joined ${character} in solving the puzzle together.`,
      `Finally, they unlocked the secret, which revealed a beautiful hidden world!`,
      `The mystery taught them that the best discoveries come to those who stay curious. 🔮`
    ],
    melancholic: [
      `On a quiet, cloudy day in ${setting}, ${character} was feeling a little sad.`,
      `Sometimes, even in beautiful places, we can feel lonely or worried.`,
      `${character} sat by themselves, thinking about ${theme} and wishing for comfort.`,
      `Just then, a gentle friend appeared and sat quietly beside ${character}.`,
      `Without saying much, the friend's presence brought warmth and understanding.`,
      `Together, they watched as the clouds slowly parted, revealing a beautiful rainbow.`,
      `${character} learned that it's okay to feel sad sometimes, and that friends make everything better. 🌈`
    ],
    excited: [
      `${character} could barely contain their excitement about the upcoming ${theme}!`,
      `All of ${setting} was buzzing with anticipation for the special celebration.`,
      `${character} helped prepare decorations, games, and wonderful surprises for everyone.`,
      `When the big day arrived, the excitement was absolutely magical!`,
      `There were colorful balloons, amazing performances, and delightful treats everywhere.`,
      `${character} danced and laughed with all their friends until the stars came out.`,
      `It was the most exciting day ever, filled with joy, laughter, and unforgettable memories! 🎉`
    ],
    adventurous: [
      `${character} was always ready for the next big adventure in ${setting}!`,
      `One day, they heard about an incredible journey that would test their courage.`,
      `With a backpack full of supplies and a heart full of bravery, ${character} set off.`,
      `The path was challenging, with steep climbs and rushing rivers to cross.`,
      `But ${character} never gave up, always finding creative solutions to each obstacle.`,
      `At the end of the journey, they discovered something more valuable than treasure.`,
      `${character} learned that the real adventure was the courage they found within themselves! 🗻`
    ],
    dreamy: [
      `In the magical ${setting}, ${character} had the most wonderful dreams about ${theme}.`,
      `Every night, they would float on soft clouds and dance among the twinkling stars.`,
      `In their dreams, anything was possible - they could fly, sing with the moon, and paint with starlight.`,
      `${character} met other dream friends who shared their love for imagination and wonder.`,
      `Together, they created beautiful dream worlds filled with floating castles and singing flowers.`,
      `When ${character} woke up, they brought some of that dream magic into the real world.`,
      `And so, ${setting} became a place where dreams and reality danced together beautifully. ✨`
    ]
  };
  
  return storyParts[mood].join('\n\n');
};