function getRandomValue(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      battleLog: [
        "It's dangerous out there! Take this sword with you, young warrior! Oh no! Here comes a giant moster to fight! Try your best!",
      ],
      currentRound: 0,
      result: null,
    };
  },
  computed: {
    playerBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
    areClicksAllowed() {
      return !(this.result === null || this.result === 'Match started');
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.result = 'draw';
        return this.logInBattleLog('You both kill each other');
      }
      if (value <= 0) {
        this.result = 'lose';
        return this.logInBattleLog('The monster kills and eats you');
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.result = 'draw';
        return this.logInBattleLog('You both kill each other');
      }
      if (value <= 0) {
        this.result = 'win';
        return this.logInBattleLog('You slayed the monster!!');
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      if (this.monsterHealth - attackValue < 0) this.monsterHealth = 0;
      else this.monsterHealth -= attackValue;
      console.log(this.playerHealth, this.monsterHealth);
      this.logInBattleLog(`Player deals ${attackValue} damage`);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      if (this.playerHealth - attackValue < 0) this.playerHealth = 0;
      else this.playerHealth -= attackValue;
      this.logInBattleLog(`Monster does ${attackValue} damage`);
    },

    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      if (this.monsterHealth - attackValue < 0) this.monsterHealth = 0;
      else this.monsterHealth -= attackValue;
      this.logInBattleLog(
        `Player's special attack deals ${attackValue} damage`
      );
      console.log(this.playerHealth, this.monsterHealth);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(5, 18);
      if (this.playerHealth + healValue < 100) this.playerHealth += healValue;
      else this.playerHealth = 100;
      this.logInBattleLog(`Player heals ${healValue} health points`);
      this.attackPlayer();
      console.log(this.playerHealth, this.monsterHealth);
    },
    logInBattleLog(action) {
      this.battleLog.unshift(action);
    },
    currentPlayerHealth() {
      return this.playerHealth > 0 ? `${this.playerHealth.toString()}%` : '0%';
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.result = 'Match started';
    },
    escape() {
      const number = getRandomValue(0, 10);
      // an easy escape
      if (this.playerHealth >= 50) return (this.result = 'escape safely');

      if (this.playerHealth < 50 && this.playerHealth >= 20) {
        // a lucky escape
        if (number <= 5) return (this.result = 'escape safely');
        // an unlucky escape
        if (number > 5) return (this.result = 'escape unsuccessfully');
      }

      if (this.playerHealth < 20) return (this.result = 'too weak to escape');
    },
  },
});

app.mount('#game');

// = Using a method to check for a winner
// checkForWinner() {
//   console.log('checking for winner');
//   // Neither have been defeated
//   if (this.playerHealth > 0 && this.monsterHealth > 0)
//     return { matchEnds: false };

//   // Tie
//   if (this.playerHealth === 0 && this.monsterHealth === 0)
//     return {
//       matchEnds: true,
//       action: "It's a draw! You and the monster kill each other in battle",
//     };

//   // Monster wins
//   if (this.playerHealth <= 0 && this.monsterHealth > 0)
//     return {
//       matchEnds: true,
//       action: 'You lose! The monster kills and eats you',
//     };

//   // Player wins
//   return {
//     matchEnds: true,
//     action: 'You win! You slayed the monster!! It cries and weeps and soon it sleeps a deathly dream',
//   };
// },
