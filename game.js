//Part 1: Humble Beginnings
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    //Give Robin a companion to travel with
    companion: {
        name: "Leo",
        type: "Cat",
        //give Robin’s feline friend a friend of his own
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"],
        },
    },
    //Give Robin the roll method
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}
// Testing the “dice rolls,”  method by calling adventurer.roll() a few times
//  adventurer.roll(1);
//  adventurer.roll(2);
//  adventurer.roll(20);
//  adventurer.roll(2);

///////////////////////
//Part 2: Class Fantasy
//Start with a Character class
class Character {
    static MAX_HEALTH = 100;// From part 4 

    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }
    //Add the roll method to the Character class.
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
        return result; // it has to return a value so i can us it in the games methodes
    }
}
//Re-create Robin using the Character class!
//   const robin = new Character("Robin");
//   robin.inventory = ["sword", "potion", "artifact"];
// //Add companion to Robin
//   robin.companion = new Character("Leo");
//   robin.companion.type = "Cat";

//  //Add companion to Robin`s companion 
//   robin.companion.companion = new Character("Frank");
//   robin.companion.companion.type = "Flea";
//   robin.companion.companion.inventory = ["small hat", "sunglasses"];

//Try Roll method in companion  
// robin.companion.roll();
// robin.companion.companion.roll();

/////////////////////////
//Part 3: Class Features
//Let’s begin by creating an Adventurer class.
class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"]; // From part 4
    constructor(name, role) {
        super(name);
        //From part 4 : Add a check to the constructor of the Adventurer class
    if (!Adventurer.ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}. Choose from ${Adventurer.ROLES.join(", ")}`);
       }
        //Assigning valid role
        this.role = role;
        // Every adventurer starts with a bed and 50 gold coins.
        this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
    // Adventurers can engage in combat
    fight(target) {
        const attackRoll = super.roll(2); // Roll with a bonus modifier
        console.log(`${this.name} attacks ${target} with a roll of ${attackRoll}!`);
    }

    // Adventurers can run away
    escape() {
        console.log(`${this.name} is trying to run away...`);

        // Random chance to succeed or fail
        const escapeRoll = super.roll(); // Get the rolled number
        if (escapeRoll > 10) {
            // Success condition
            console.log(`${this.name} successfully runs away!`);
        } else {
            // Failure condition
            console.log(`${this.name} stumbles while fleeing!`);

            // Apply failure consequences
            if (this.inventory.length > 0) {
                const lostItem = this.inventory.pop(); // Remove the last item from inventory
                console.log(`${this.name} drops their ${lostItem} while running away!`);
            } else {
                this.health -= 10; // Lose health if no items left
                console.log(`${this.name} loses 10 health while escaping. Current health: ${this.health}`);
            }
        }
    }
    // From part 6
    //Create an additional method, duel(), for the Adventurer class 
    duel(opponent) {
        console.log(`${this.name} challenges ${opponent.name} to a duel!`);
        // Repeat this process until one of the two adventurers reaches 50 health.
        while (this.health > 50 && opponent.health > 50) {
          //Use the roll() functionality to create opposing rolls for each adventurer.
          const myRoll = super.roll();
          const opponentRoll = opponent.roll();
          //Subtract 1 from the adventurer with the lower roll.
          if (myRoll > opponentRoll) {
            opponent.health -= 1;
            console.log(`${this.name} wins this round! (${this.name}'s Health: ${this.health}, ${opponent.name}'s Health: ${opponent.health})`);
          } else if (opponentRoll > myRoll) {
            this.health -= 1;
            console.log(`${opponent.name} wins this round! (${this.name}'s Health: ${this.health}, ${opponent.name}'s Health: ${opponent.health})`);
          } else {
            console.log(" No health lost this round! ");
          }
        }
    
        const winner = this.health > 50 ? this : opponent;
        console.log(`${winner.name} emerges victorious with ${winner.health} health remaining!`);
      }
  

}


//Next, create a Companion class
class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type; // Type of companion: e.g., "Cat", "Flea"
        this.loyalty = 100; // Starts fully loyal
    }

    // Companions boost morale
    boostMorale() {
        console.log(`${this.name} boosts morale, increasing loyalty!`);
        this.loyalty += 10;
    }
    // Companions lowering morale
    lowerMorale() {
        console.log(`${this.name} boosts morale, increasing loyalty!`);
        this.loyalty -= 10;
    }

}

let robin;
// From part 4 : Ensuring role validity
try {
    // Create Robin as an adventurer for a fighter roll
     robin = new Adventurer("Robin", "Fighter"); // Invalid role: throws error
  } catch (error) {
    console.error(error.message); // Invalid role: Rogue
  };
// if robin exist i execute the rest of insructions  
if (robin) {
    robin.inventory.push("sword", "potion", "artifact", "armor", "shield");

    // Create Leo as a companion
    robin.companion = new Companion("Leo", "Cat");
    
    // Create Frank as Leo's companion
    robin.companion.companion = new Companion("Frank", "Flea");
    robin.companion.companion.inventory = ["small hat", "sunglasses"];
    
    
    //Try the methodes
    robin.scout();
    robin.fight("a Monster");
    robin.escape();
    const leo = new Adventurer("Leo", "Wizard");
    robin.duel(leo);

      
}

/////////////////////////
//Part 4: Class Uniforms
//Are there other static properties or methods that make sense to add to these classes?

//1- Set defult items for each roll: 
// static DEFAULT_ITEMS = {
//     Fighter: ["sword", "shield", "armor"],
//     Healer: ["healing potion", "herbs"],
//     Wizard: ["staff", "spell book"]
//   };

// Add level to passe from stage to another
//static LEVELS = ["Novice", "Intermediate", "Expert"];

/////////////////////////
//Part 5: Gather your Party
// create Factorie classe that generate objects according to the factory’s instance properties.
class AdventurerFactory {
    constructor(role) {
      this.role = role; // Shared role for all adventurers in this factory
      this.adventurers = []; // Stores created adventurers
    }
  
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
      return newAdventurer; // Return the new adventurer for immediate use
    }
  
    findByIndex(index) {
      return this.adventurers[index];
    }
  
    findByName(name) {
      return this.adventurers.find((a) => a.name === name);
    }
  
    // Additional convenience method: list all adventurers in the factory
    listAll() {
      console.log(`Adventurers in the ${this.role} factory:`);
      this.adventurers.forEach((adventurer, index) => {
        console.log(`${index + 1}: ${adventurer.name} (${adventurer.role})`);
      });
    }
  }
  
  
//   const healers = new AdventurerFactory("Healer");
//   const robin2 = healers.generate("Robin2"); // Create Robin
//   const leo = healers.generate("Leo"); // Create Leo
//   healers.listAll(); // List all healers

///////////////////////////
//Part 7: Adventure Forth//
// Creat enemies using enemie class and methodes

class Ennemie extends Character {
    constructor(name, type, strength) {
        super(name);
        this.type = type; // Example: "Dragon", "Munster", "Vampire"
        this.strength = strength; // Unique strength attribute
    }

    attack(target) {
        const attackRoll = this.roll(this.strength); // Use creature’s strength as a modifier
        console.log(`${this.name} the ${this.type} attacks ${target.name} with a roll of ${attackRoll}!`);
        target.health -= attackRoll;
        console.log(`${target.name}'s remaining health: ${target.health}`);
    }

    roar() {
        console.log(`${this.name} roars mightily, intimidating everyone nearby!`);
    }
}

// Create a dragon to interact with adventurers
const smaug = new Ennemie("Volcano", "Dragon", 10);
smaug.roar();
smaug.attack(robin);

  



