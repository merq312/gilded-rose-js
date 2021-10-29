class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

// IDEA: Build and chain prototypes of each Item "type"

class Shop {
  constructor(items = []) {
    this.items = items
  }

  updateQuality() {
    const isAgedBrie = (item) => {
      if (item.sellIn <= 0) {
        item.quality += 2
      } else {
        item.quality += 1
      }

      if (item.quality > 50) {
        item.quality = 50
      }

      item.sellIn -= 1
    }

    const isBackstagePass = (item) => {
      if (item.sellIn > 10) {
        item.quality += 1
      } else if (item.sellIn > 5) {
        item.quality += 2
      } else if (item.sellIn > 0) {
        item.quality += 3
      } else {
        item.quality = 0
      }

      item.sellIn -= 1
    }

    const isGenericItem = (item) => {
      if (item.sellIn > 0) {
        item.quality -= 1
      } else {
        item.quality -= 2
      }

      if (item.quality < 0) {
        item.quality = 0
      }

      item.sellIn -= 1
    }

    this.items.forEach(item => {
      if (item.name === "Aged Brie") {
        isAgedBrie(item)
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        isBackstagePass(item)
      } else if (item.name === "Sulfuras, Hand of Ragnaros") {
        // Do nothing
      } else {
        isGenericItem(item)
      }
    })

    return this.items
  }
}

module.exports = {
  Item,
  Shop,
}
