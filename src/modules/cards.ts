import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import img12 from '../assets/12.png';
import img13 from '../assets/13.png';
import img14 from '../assets/14.png';
import img15 from '../assets/15.png';
import img16 from '../assets/16.png';
import img17 from '../assets/17.png';
import img18 from '../assets/18.png';
import img19 from '../assets/19.png';
import img20 from '../assets/20.png';
import img21 from '../assets/21.png';
import img22 from '../assets/22.png';
import img23 from '../assets/23.png';
import img24 from '../assets/24.png';
import img25 from '../assets/25.png';
import img26 from '../assets/26.png';
import img27 from '../assets/27.png';
import img28 from '../assets/28.png';
import img29 from '../assets/29.png';
import img30 from '../assets/30.png';

export interface IFurniture {
    id: number;
    name: string;
    description: string;
    classLabel: string;
    price: number;
    image: string;
    embedding?: number[];
}

export const CARDS_MOCK: IFurniture[] = [
    // ДИВАН (10 карточек) 
    {
        id: 1,
        name: 'Диван с аквариумами',
        description: 'White leather sofa with built-in aquariums filled with water and plants on both sides',
        classLabel: 'диван',
        price: 125000,
        image: img1
    },
    {
        id: 2,
        name: 'Диван с бассейном',
        description: 'Modern white sofa with an integrated water pool section in the middle',
        classLabel: 'диван',
        price: 98000,
        image: img2
    },
    {
        id: 3,
        name: 'Диван-камень',
        description: 'Unique sofa designed to look like a giant blue-gray rock with tufted black leather cushions',
        classLabel: 'диван',
        price: 156000,
        image: img3
    },
    {
        id: 4,
        name: 'Диван-гориллы',
        description: 'Extraordinary sofa shaped like three large gorillas sitting together with beige cushions',
        classLabel: 'диван',
        price: 189000,
        image: img4
    },
    {
        id: 5,
        name: 'Диван-свинья',
        description: 'Quirky sofa designed in the shape of a sleeping pink pig with detailed features',
        classLabel: 'диван',
        price: 87000,
        image: img5
    },
    {
        id: 6,
        name: 'Диван из яичных лотков',
        description: 'Creative sofa constructed entirely from stacked egg cartons creating a unique textured surface',
        classLabel: 'диван',
        price: 45000,
        image: img6
    },
    {
        id: 7,
        name: 'Диван-кактус',
        description: 'Green ribbed sofa designed to resemble a giant cactus with vertical striped texture',
        classLabel: 'диван',
        price: 112000,
        image: img7
    },
    {
        id: 8,
        name: 'Диван-дерево',
        description: 'Fantastical tree-shaped sofa with white sculptural trunk and branches holding yellow cushions',
        classLabel: 'диван',
        price: 245000,
        image: img8
    },
    {
        id: 9,
        name: 'Песчаный диван',
        description: 'Giant sofa sculpture carved from sand on a beach with people sitting and working on it',
        classLabel: 'диван',
        price: 35000,
        image: img9
    },
    {
        id: 10,
        name: 'Диван из машины',
        description: 'Upcycled sofa made from the front end of a vintage car featuring headlights, bumper, and brown leather cushions',
        classLabel: 'диван',
        price: 167000,
        image: img10
    },

    // КРОВАТЬ (10 карточек) 
    {
        id: 11,
        name: 'Кровать-гамбургер',
        description: 'Round bed designed to look like a giant hamburger with a bun top, lettuce, and patty layers',
        classLabel: 'кровать',
        price: 78000,
        image: img11
    },
    {
        id: 12,
        name: 'Кровать-ракушка',
        description: 'Pink bed shaped like an open seashell with a glowing pearl light fixture and quilted mattress',
        classLabel: 'кровать',
        price: 134000,
        image: img12
    },
    {
        id: 13,
        name: 'Кровать-книга',
        description: 'Unique bed designed as a giant open book with pages serving as the mattress and two people reading on it',
        classLabel: 'кровать',
        price: 92000,
        image: img13
    },
    {
        id: 14,
        name: 'Кровать-картошка фри',
        description: 'Whimsical bed featuring a red headboard shaped like a french fry container with yellow foam fries sticking out',
        classLabel: 'кровать',
        price: 67000,
        image: img14
    },
    {
        id: 15,
        name: 'Кровать-гнездо',
        description: "Large circular bed resembling a giant bird's nest made of wood, filled with large white and green egg-shaped cushions",
        classLabel: 'кровать',
        price: 145000,
        image: img15
    },
    {
        id: 16,
        name: 'Кровать-машина',
        description: "Red race car bed shaped like a cartoon character with wheels and a spoiler in a child's room",
        classLabel: 'кровать',
        price: 54000,
        image: img16
    },
    {
        id: 17,
        name: 'Ледяная кровать',
        description: 'Bed made entirely of ice blocks with fur blankets, located inside an illuminated ice room',
        classLabel: 'кровать',
        price: 198000,
        image: img17
    },
    {
        id: 18,
        name: 'Кровать-ступни',
        description: 'Beige leather bed designed to look like a pair of giant human feet with toes pointing upwards',
        classLabel: 'кровать',
        price: 112000,
        image: img18
    },
    {
        id: 19,
        name: 'Кровать-корабль',
        description: 'Bed shaped like an old wooden sailing ship with a mast and ropes, placed in a blue-themed room',
        classLabel: 'кровать',
        price: 176000,
        image: img19
    },
    {
        id: 20,
        name: 'Кровать-бочка',
        description: 'Bed built inside a large wooden barrel with a small ladder leading up to the sleeping area',
        classLabel: 'кровать',
        price: 89000,
        image: img20
    },

    // КУШЕТКА (10 карточек) 
    {
        id: 21,
        name: 'Белая изогнутая кушетка',
        description: 'Long white tufted couch with a curved, wave-like shape and dark legs',
        classLabel: 'кушетка',
        price: 76000,
        image: img21
    },
    {
        id: 22,
        name: 'Сюрреалистичная кушетка',
        description: 'Surreal white couch that appears to be melting or dripping into the wall corner',
        classLabel: 'кушетка',
        price: 143000,
        image: img22
    },
    {
        id: 23,
        name: 'Кушетка с узором',
        description: 'Artistic couch with a black, wavy metal frame resembling branches and soft white cushions',
        classLabel: 'кушетка',
        price: 98000,
        image: img23
    },
    {
        id: 24,
        name: 'Кушетка-тигр',
        description: 'Life-sized couch shaped like a reclining tiger with realistic fur and paws',
        classLabel: 'кушетка',
        price: 234000,
        image: img24
    },
    {
        id: 25,
        name: 'Кушетка пэчворк',
        description: 'Colorful couch featuring a black frame and vibrant patchwork upholstery with various patterns',
        classLabel: 'кушетка',
        price: 112000,
        image: img25
    },
    {
        id: 26,
        name: 'Фиолетовая волнистая кушетка',
        description: 'Modern purple couch with a smooth, wavy sculptural design placed on a raised platform',
        classLabel: 'кушетка',
        price: 87000,
        image: img26
    },
    {
        id: 27,
        name: 'Черная уличная кушетка',
        description: 'Black wicker outdoor couch and matching ottoman with white cushions situated on a wooden deck by a pool',
        classLabel: 'кушетка',
        price: 65000,
        image: img27
    },
    {
        id: 28,
        name: 'Роскошный изогнутый диван',
        description: 'Elegant curved black couch with silver trim, tufted upholstery, and brown pillows in a classic interior',
        classLabel: 'кушетка',
        price: 198000,
        image: img28
    },
    {
        id: 29,
        name: 'Массажная кушетка',
        description: 'Portable white massage couch with a face cradle and black folding metal legs',
        classLabel: 'кушетка',
        price: 34000,
        image: img29
    },
    {
        id: 30,
        name: 'Кушетки в форме раковин',
        description: 'Unique white chaise lounges designed to look like giant open seashells with silver legs on a red patio',
        classLabel: 'кушетка',
        price: 156000,
        image: img30
    }
];
