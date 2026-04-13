export const catalogData = {
	categories: [
		{
			name: 'Rice & Carbohydrates',
			items: [
				{ name: 'White rice', unit: 'kg', common: true, tags: ['staple'] },
				{ name: 'Jasmine rice', unit: 'kg', common: true, tags: ['staple'] },
				{ name: 'Brown rice', unit: 'kg', common: false, tags: ['healthy'] },
				{ name: 'Glutinous rice', unit: 'kg', common: false, tags: ['special'] },
				{ name: 'Bread loaf', unit: 'pack', common: true, tags: ['breakfast'] },
				{ name: 'Pandesal', unit: 'pack', common: true, tags: ['breakfast'] },
				{ name: 'Instant noodles', unit: 'pack', common: true, tags: ['quick'] },
				{ name: 'Pasta', unit: 'pack', common: true, tags: [] },
				{ name: 'Flour', unit: 'kg', common: true, tags: [] },
				{ name: 'Oats', unit: 'pack', common: true, tags: ['healthy'] },
				{ name: 'Corn', unit: 'kg', common: false, tags: [] }
			]
		},
		{
			name: 'Meat & Poultry',
			items: [
				{ name: 'Chicken (whole)', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Chicken cuts', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Pork liempo', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Pork kasim', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Ground pork', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Beef', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Ground beef', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Hotdog', unit: 'pack', common: true, tags: ['processed'] },
				{ name: 'Ham', unit: 'pack', common: false, tags: ['processed'] },
				{ name: 'Bacon', unit: 'pack', common: true, tags: ['processed'] },
				{ name: 'Sausage', unit: 'pack', common: true, tags: ['processed'] }
			]
		},
		{
			name: 'Fish & Seafood',
			items: [
				{ name: 'Bangus', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Tilapia', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Shrimp', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Squid', unit: 'kg', common: true, tags: ['ulam'] },
				{ name: 'Dried fish', unit: 'pack', common: true, tags: ['breakfast'] },
				{ name: 'Dried anchovies (dilis)', unit: 'pack', common: true, tags: [] },
				{ name: 'Frozen fish fillet', unit: 'pack', common: true, tags: [] }
			]
		},
		{
			name: 'Eggs & Dairy',
			items: [
				{ name: 'Eggs', unit: 'dozen', common: true, tags: ['staple'] },
				{ name: 'Fresh milk', unit: 'liter', common: true, tags: [] },
				{ name: 'Powdered milk', unit: 'pack', common: true, tags: [] },
				{ name: 'Evaporated milk', unit: 'can', common: true, tags: [] },
				{ name: 'Cheese', unit: 'pack', common: true, tags: [] },
				{ name: 'Butter', unit: 'pack', common: true, tags: [] },
				{ name: 'Margarine', unit: 'pack', common: true, tags: [] },
				{ name: 'Yogurt', unit: 'cup', common: false, tags: ['healthy'] }
			]
		},
		{
			name: 'Vegetables',
			items: [
				{ name: 'Pechay', unit: 'bundle', common: true, tags: ['ulam'] },
				{ name: 'Kangkong', unit: 'bundle', common: true, tags: ['ulam'] },
				{ name: 'Cabbage', unit: 'pc', common: true, tags: [] },
				{ name: 'Eggplant', unit: 'kg', common: true, tags: [] },
				{ name: 'Tomato', unit: 'kg', common: true, tags: [] },
				{ name: 'Onion', unit: 'kg', common: true, tags: [] },
				{ name: 'Garlic', unit: 'kg', common: true, tags: [] },
				{ name: 'Potato', unit: 'kg', common: true, tags: [] },
				{ name: 'Carrot', unit: 'kg', common: true, tags: [] },
				{ name: 'Sayote', unit: 'kg', common: true, tags: [] },
				{ name: 'Squash', unit: 'kg', common: true, tags: [] }
			]
		},
		{
			name: 'Fruits',
			items: [
				{ name: 'Banana', unit: 'kg', common: true, tags: ['snack'] },
				{ name: 'Apple', unit: 'kg', common: true, tags: [] },
				{ name: 'Orange', unit: 'kg', common: true, tags: [] },
				{ name: 'Mango', unit: 'kg', common: true, tags: ['seasonal'] },
				{ name: 'Pineapple', unit: 'pc', common: true, tags: [] },
				{ name: 'Watermelon', unit: 'pc', common: true, tags: [] },
				{ name: 'Papaya', unit: 'pc', common: true, tags: [] }
			]
		},
		{
			name: 'Canned & Packaged Goods',
			items: [
				{ name: 'Sardines', unit: 'can', common: true, tags: ['ulam'] },
				{ name: 'Canned tuna', unit: 'can', common: true, tags: ['ulam'] },
				{ name: 'Corned beef', unit: 'can', common: true, tags: ['ulam'] },
				{ name: 'Meat loaf', unit: 'can', common: true, tags: [] },
				{ name: 'Canned vegetables', unit: 'can', common: false, tags: [] },
				{ name: 'Canned fruits', unit: 'can', common: false, tags: [] },
				{ name: 'Ready-to-eat meals', unit: 'pack', common: false, tags: [] }
			]
		},
		{
			name: 'Pantry Essentials',
			items: [
				{ name: 'Sugar', unit: 'kg', common: true, tags: [] },
				{ name: 'Salt', unit: 'pack', common: true, tags: [] },
				{ name: 'Coffee', unit: 'pack', common: true, tags: [] },
				{ name: 'Powdered chocolate drink', unit: 'pack', common: true, tags: [] },
				{ name: 'Cooking oil', unit: 'liter', common: true, tags: [] },
				{ name: 'Vinegar', unit: 'bottle', common: true, tags: [] },
				{ name: 'Soy sauce', unit: 'bottle', common: true, tags: [] },
				{ name: 'Fish sauce', unit: 'bottle', common: true, tags: [] },
				{ name: 'Biscuits', unit: 'pack', common: true, tags: ['snack'] },
				{ name: 'Crackers', unit: 'pack', common: true, tags: ['snack'] }
			]
		},
		{
			name: 'Condiments & Seasonings',
			items: [
				{ name: 'Black pepper', unit: 'pack', common: true, tags: [] },
				{ name: 'Garlic powder', unit: 'pack', common: true, tags: [] },
				{ name: 'Onion powder', unit: 'pack', common: true, tags: [] },
				{ name: 'Seasoning mix', unit: 'pack', common: true, tags: [] },
				{ name: 'Ketchup', unit: 'bottle', common: true, tags: [] },
				{ name: 'Mayonnaise', unit: 'bottle', common: true, tags: [] },
				{ name: 'Chili sauce', unit: 'bottle', common: false, tags: [] },
				{ name: 'Oyster sauce', unit: 'bottle', common: true, tags: [] }
			]
		},
		{
			name: 'Beverages',
			items: [
				{ name: 'Bottled water', unit: 'liter', common: true, tags: [] },
				{ name: 'Soft drinks', unit: 'bottle', common: true, tags: [] },
				{ name: 'Juice drinks', unit: 'pack', common: true, tags: [] },
				{ name: '3-in-1 coffee', unit: 'pack', common: true, tags: [] },
				{ name: 'Tea', unit: 'pack', common: true, tags: [] },
				{ name: 'Energy drinks', unit: 'can', common: false, tags: [] }
			]
		},
		{
			name: 'Snacks',
			items: [
				{ name: 'Chips', unit: 'pack', common: true, tags: [] },
				{ name: 'Candy', unit: 'pack', common: true, tags: [] },
				{ name: 'Chocolate', unit: 'pack', common: true, tags: [] },
				{ name: 'Cup noodles', unit: 'cup', common: true, tags: [] }
			]
		},
		{
			name: 'Household Supplies',
			items: [
				{ name: 'Laundry detergent', unit: 'pack', common: true, tags: [] },
				{ name: 'Fabric conditioner', unit: 'bottle', common: true, tags: [] },
				{ name: 'Dishwashing liquid', unit: 'bottle', common: true, tags: [] },
				{ name: 'Bleach', unit: 'bottle', common: true, tags: [] },
				{ name: 'Multi-purpose cleaner', unit: 'bottle', common: true, tags: [] },
				{ name: 'Toilet cleaner', unit: 'bottle', common: true, tags: [] },
				{ name: 'Trash bags', unit: 'pack', common: true, tags: [] },
				{ name: 'Tissue paper', unit: 'pack', common: true, tags: [] }
			]
		},
		{
			name: 'Personal Care',
			items: [
				{ name: 'Shampoo', unit: 'bottle', common: true, tags: [] },
				{ name: 'Conditioner', unit: 'bottle', common: true, tags: [] },
				{ name: 'Soap', unit: 'bar', common: true, tags: [] },
				{ name: 'Body wash', unit: 'bottle', common: false, tags: [] },
				{ name: 'Toothpaste', unit: 'tube', common: true, tags: [] },
				{ name: 'Toothbrush', unit: 'pc', common: true, tags: [] },
				{ name: 'Deodorant', unit: 'bottle', common: true, tags: [] },
				{ name: 'Feminine products', unit: 'pack', common: true, tags: [] }
			]
		}
	]
}

export const localImageFiles = [
	'3-in-1-coffee.jpg', 'apple.jpeg', 'bacon.jpg', 'banana.jpg', 'bangus.jpg', 'beef.jpg',
	'biscuit.jpg', 'black-pepper.jpg', 'bleach.jpg', 'body-wash.jpg', 'bottled-water.jpg',
	'bread-loaf.jpg', 'brown-rice.jpg', 'butter.jpg', 'cabbage.jpg', 'candy.jpg',
	'canned-fruits.jpg', 'canned-tuna.jpg', 'canned-vegetables.jpg', 'carrot.jpg', 'cheese.jpg',
	'chicken-cuts.jpg', 'chicken-whole.jpg', 'chili-sauce.jpg', 'chips.jpg', 'chocolate.jpg',
	'coffee.jpg', 'conditioner.jpg', 'cooking-oil.jpg', 'corn.jpg', 'corned-beef.jpg',
	'crackers.jpg', 'cup-noodles.jpg', 'deodorant.jpg', 'dishwashing-liquid.jpg',
	'dried-anchovies.jpg', 'dried-fish.jpg', 'eggplant.jpg', 'eggs.jpg', 'energy-drink.jpg',
	'evaporated-milk.jpg', 'fabric-conditioner.jpg', 'feminine-products.jpg', 'fish-sauce.jpg',
	'flour.jpg', 'fresh-milk.jpg', 'frozen-fish-fillet.jpg', 'garlic-powder.jpg', 'garlic.jpg',
	'glutinous-rice.jpg', 'ground-beef.jpg', 'ground-pork.jpg', 'ham.jpg', 'hotdog.jpg',
	'instant-noodles.jpg', 'jasmine-rice.jpg', 'juice-drinks.jpg', 'kangkong.jpg', 'ketchup.jpg',
	'laundry-detergent.jpg', 'mango.jpg', 'margarine.jpg', 'mayonnaise.jpg', 'meat-loaf.jpg',
	'multi-purpose-cleaner.jpg', 'oats.jpg', 'onion-powder.jpg', 'onion.jpg', 'orange.jpg',
	'oyster-sauce.jpg', 'pandesal.jpg', 'papaya.jpg', 'pasta.jpg', 'pechay.jpg',
	'pineapple.jpg', 'pork-kasim.jpg', 'pork-liempo.jpg', 'potato.jpg',
	'powdered-chocolate-drink.jpg', 'ready-to-eat-meals.jpg', 'salt.jpg', 'sardines.jpg',
	'sausage.jpg', 'sayote.jpg', 'seasoning-mix.jpg', 'shampoo.jpg', 'shrimp.jpg', 'soap.jpg',
	'soft-drinks.jpg', 'soy-sauce.jpg', 'squash.jpg', 'squid.jpg', 'sugar.jpg', 'tea.jpg',
	'thrash-bags.jpg', 'tilapia.jpg', 'tissue-paper.jpg', 'toilet-cleaner.jpg', 'tomato.jpg',
	'toothbrush.jpg', 'toothpaste.jpg', 'vinegar.jpg', 'water-melon.jpg', 'white-rice.jpeg',
	'yogurt.jpg'
]

export const imageAliases = {
	chicken: 'chicken-whole',
	milkfish: 'bangus',
	'milkfish-bangus': 'bangus',
	water: 'bottled-water',
	biscuits: 'biscuit',
	watermelon: 'water-melon',
	'trash-bags': 'thrash-bags',
	'energy-drinks': 'energy-drink'
}
