export const INITIAL_MEDICINES = [
  {
    id: 'med-1',
    name: 'Paracetamol 500mg',
    brand: 'Crocin',
    category: 'Pain Relief',
    description: 'Effective relief from fever, headache, body aches, and mild-to-moderate pain.',
    price: 15.00,
    stock: 120,
    dosage: '1-2 tablets every 4-6 hours',
    prescriptionRequired: false,
    image: '/images/paracetamol.jpg'
  },
  {
    id: 'med-2',
    name: 'Amoxicillin 250mg',
    brand: 'Amoxil',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic used to treat bacterial infections of the ears, throat, and lungs.',
    price: 45.50,
    stock: 45,
    dosage: 'As prescribed by a physician',
    prescriptionRequired: true,
    image: '/images/amoxicillin.jpg'
  },
  {
    id: 'med-3',
    name: 'Cetirizine Hydrochloride 10mg',
    brand: 'Okacet',
    category: 'Allergy & Cold',
    description: 'Non-drowsy 24-hour relief from runny nose, sneezing, itchy/watery eyes, and throat itchiness.',
    price: 12.00,
    stock: 80,
    dosage: '1 tablet daily before bed',
    prescriptionRequired: false,
    image: '/images/cetirizine.jpg'
  },
  {
    id: 'med-4',
    name: 'Vitamin C + Zinc Chewable',
    brand: 'Limcee',
    category: 'Vitamins & Supplements',
    description: 'Immunity booster tablets that support overall cellular health and defense mechanisms.',
    price: 25.00,
    stock: 8,
    dosage: 'Chew 1 tablet daily',
    prescriptionRequired: false,
    image: '/images/vitaminc.jpg'
  },
  {
    id: 'med-5',
    name: 'Atorvastatin Tablets 10mg',
    brand: 'Lipitor',
    category: 'Heart Health',
    description: 'Prescription medicine used alongside diet to lower "bad" cholesterol and raise "good" cholesterol.',
    price: 85.00,
    stock: 30,
    dosage: '1 tablet daily with or without food',
    prescriptionRequired: true,
    image: '/images/atorvastatin.png'
  },
  {
    id: 'med-6',
    name: 'Metformin Hydrochloride 500mg',
    brand: 'Glycomet',
    category: 'Diabetes Care',
    description: 'Oral diabetes medicine that helps control blood sugar levels for people with type 2 diabetes.',
    price: 32.00,
    stock: 65,
    dosage: 'To be taken with meals as directed',
    prescriptionRequired: true,
    image: '/images/metformin.png'
  }
];

export const CATEGORIES = ['All', 'Pain Relief', 'Antibiotics', 'Allergy & Cold', 'Vitamins & Supplements', 'Heart Health', 'Diabetes Care'];
