import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WritingQuestionService {

  constructor() {
  }

  questions = {
    'advanced': {
      'part1': [
        'The book wrote in English.',
        'Have you ever go to Paris?',
        'The house who has a red roof is my grandparents.',
        'She is more beautiful girl in my school.',
        'Don\'t give up to make your dream come true',
      ],
      'part2': [
        'What do you want to be? And why do you want to be it?',
        'Write down the advantage and disadvantage of cellphones.',
        'Explain about the \'Greenhouse Effect\'.',
        'Write down about a king that you respect in Korean history.',
        'What is your favorite book? Write down the title, characters, and main story of it.',
      ]
    },
    'intermediate': {
      'part1': [
        'The fruit is very good for your health.',
        'I am tall than my brother.',
        'He wants buy a sports car.',
        'They build the house two years ago',
        'I am sorry that Tom don\'t keep his promise',
        'I am as stronger as Brian',
        'There is many trees in the garden'
      ],
      'part2': [
        'What do you want to be? And why do you want to be it?',
        'What is your favorite animal? Describe it in English.',
        'What is your favorite book? Write down the title, characters, and main story of it.'
      ]
    },
    'basic': {
      'part1': [
        'We is playing soccer in the ground.',
        'He watch TV in the living room',
        'Can your mother drives a car?',
        'I go to the swimming pool yesterday.',
        'They doesn\'t give any food to the old man',
        'I not will call you tomorrow',
        'Do he know my phone number?',
      ],
      'part2': [
        'Do you have brothers, sisters, or cousins? Write down about them.',
        'Do you use a computer? Write down the reasons of your answer.',
        'What is your favorite book? Write down the title, characters, and main story of it.'
      ]
    },
    'starter': {
      'part1': [
        'is happy he',
        'my love i mom',
        'friends are my they',
        'my is kind father',
        'is the cute dog',
      ],
      'part2': [
        'Are you tall?',
        'Do you like English?',
        'What is your favorite food?',
        'Can you play the piano?',
        'What do you need when it is raining outside?'
      ]
    }
  };

  answers = {
    'advanced': {
      'part1': [
        'The book was written in English.',
        'Have you ever been/gone to Paris?',
        'The house that/which has a red roof is my grandparents.',
        'She is the most beautiful girl in my school.',
        'Don\'t give up making your dream come true.'
      ],
      'part2': [
        'I want to be a doctor.<br>Because I will help sick poor people.<br>I will create the world without pain.',
        'Advantages: We can make a call everywehere or whenever.<br>Disadvantages: When we study or work, we can be prevented.',
        'The greenhouse effect helps to maintain the temperature of the surface of the earth.<br>It is causing the global warming.',
        'I respect King Sejong the most.<br> He was the fourth king in Joseon. He craeted Korean Alphabet \'Hangeul\' and developed science and technology. And he tried to make people happy.',
        `Title: Pandora's box
    <br>Characters: Pandora, Zeus
    <br>Introduction: There is a woman. Her name is Pandora. She is very beautiful.
    <br>Development: Zeus gives a box to Pandora. He says that she doesn't have to open the box. She is curious about the box.
    <br>Turn: She can't stand it. Finally, she opens the box. Pain, Sadness, and death come out of the box.
    <br>Conclusion: There is only hope in the box. Although all the bad things come out into the world, luckily, hope can make people happy.`
      ]
    },
    'intermediate': {
      'part1': ['Eating fruit is very good for your health.',
        'I am taller than my brother.',
        'He wants to buy a sports car.',
        'They built the house two years ago.',
        'I am sorry that Tom didn\'t keep his promise',
        'I am as strong as Brian',
        'There are many trees in the garden.'],
      'part2': ['I want to be a doctor. Because I can help sick poor people. I will create the world without a pain.',
        'My favorite animal is puppies.<br>Puppies are small and cute. Puppies are  smart so they follow people well.',
        `Title: Pandora's box
    <br>Characters: Pandora, Zeus
    <br>Introduction: There is a woman. Her name is Pandora. She is very beautiful.
    <br>Development: Zeus gives a box to Pandora. He says that she doesn't have to open the box. She is curious about the box.
    <br>Turn: She can't stand it. Finally, she opens the box. Pain, Sadness, and death come out of the box.
    <br>Conclusion: There is only hope in the box. Although all the bad things come out into the world, luckily, hope can make people happy.`]
    },
    'basic': {
      'part1': ['We are playing soccer in the ground.',
        'He watches TV in the living room.',
        'Can your mother drive a car?',
        'I went to the swimming pool yesterday.',
        'They don\'t give any food to the old man',
        'I will not call you tomorrow.',
        'Does he know my phone number?',
      ],
      'part2': ['Yes, I have one brother.<br>His name is Mike. He is tall and handsome. He likes soccer.',
        'Yes, I do./ No, I don\'t.<br>Because I play computer games.<br>Because I chat with my friends online.',
        `Title: Pandora's box
    <br>Characters: Pandora, Zeus
    <br>Introduction: There is a woman. Her name is Pandora. She is very beautiful.
    <br>Development: Zeus gives a box to Pandora. He says that she doesn't have to open the box. She is curious about the box.
    <br>Turn: She can't stand it. Finally, she opens the box. Pain, Sadness, and death come out of the box.
    <br>Conclusion: There is only hope in the box. Although all the bad things come out into the world, luckily, hope can make people happy.`
      ]
    },
    'starter': {
      'part1': ['he is happy.',
        'I love my mom.',
        'They are my friends.',
        'My father is kind.',
        'The dog is cute.'
      ],
      'part2': [ 'Yes, I am. / No, I am not.',
        'Yes, I do. / No, I don\'t.',
        'My favorite food is pizza.',
        'Yes, I can. / No, I can\'t.',
        'I need an umbrella.']
    }
  };

  my_answers = [
      'a',
      'b',
      'hello world',
      'd',
      'e',
      'hello[@]world',
      'g',
      'h',
      'i',
      'j',
  ];

  current_part_num = 1;
  current_problem_num = 1;
  part1_problem_num = 5;
  part2_problem_num = 5;

  initializeProblemNums(test_lv: string) {
    this.part1_problem_num = this.answers[test_lv]['part1'].length;
    this.part2_problem_num = this.answers[test_lv]['part2'].length;

    this.processMyAnswerString();
  }

  processMyAnswerString() {
    console.log('processMyAnswer');
    for (let i = 0; i < this.my_answers.length; i++) {
      console.log(i);
      console.log(this.my_answers[i]);
      this.my_answers[i] = this.my_answers[i].replace(/\[@\]/g, '&#10;');
    }
  }
}
