class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

const AgedBrie = {
  updateQuality() {
    if (this.sellIn <= 0) {
        this.quality += 2
      } else {
        this.quality += 1
      }

      if (this.quality > 50) {
        this.quality = 50
      }

      this.sellIn -= 1
    }
}

const BackstagePass = {
  updateQuality() {
      if (this.sellIn > 10) {
        this.quality += 1
      } else if (this.sellIn > 5) {
        this.quality += 2
      } else if (this.sellIn > 0) {
        this.quality += 3
      } else {
        this.quality = 0
      }

      this.sellIn -= 1
  }
}

const Sulfuras = {
  updateQuality() {}
}

const GenericItem = {
      updateQuality() {
        if (this.sellIn > 0) {
          this.quality -= 1
        } else {
          this.quality -= 2
        }

        if (this.quality < 0) {
          this.quality = 0
        }

        this.sellIn -= 1
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map(item => {
      switch(item.name) {
        case "Aged Brie": return Object.assign(AgedBrie, item)
        case "Backstage passes to a TAFKAL80ETC concert": return Object.assign(BackstagePass, item)
        case "Sulfuras, Hand of Ragnaros": return Object.assign(Sulfuras, item)
        default: return Object.assign(GenericItem, item)
      }
    })
  }

  updateQuality() {
    this.items.forEach(item => item.updateQuality())

    return this.items
  }
}

module.exports = {
  Item,
  Shop,
}
