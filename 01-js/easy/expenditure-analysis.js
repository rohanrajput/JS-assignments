/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const hashMap = new Map();
  const result = [];

  for(const obj of transactions) {
    if(hashMap.has(obj.category)) {
      let currentAmount = hashMap.get(obj.category);
      currentAmount += obj.price;
      hashMap.set(obj.category, currentAmount);
    }
    else {
      hashMap.set(obj.category, obj.price);
    }
  }

  for(const item of hashMap) {
    result.push({ "category": item[0], "totalSpent": item[1] });
  }

  return result;
}

module.exports = calculateTotalSpentByCategory;
