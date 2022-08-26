function getRandomValue(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      battleLog: [
        "It's dangerous out there! Take this sword with you, young warrior!",
      ],
    };
  },
  calculated: {},
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.logInBattleLog(`Player deals ${attackValue} damage`);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.logInBattleLog(`Monster does ${attackValue} damage`);
    },

    specialAttackMonster() {
      const attackValue = getRandomValue(8, 15);
      this.monsterHealth -= attackValue;
      this.logInBattleLog(
        `Player's special attack deals ${attackValue} damage`
      );
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRandomValue(3, 8);
      this.playerHealth += healValue;
      this.logInBattleLog(`Player heals ${healValue} health points`);
    },
    logInBattleLog(action) {
      this.battleLog.push(action);
    },
    currentPlayerHealth() {
      console.log('current player health called...');
      return this.playerHealth > 0 ? `${this.playerHealth.toString()}%` : '0%';
    },
  },
});

app.mount('#game');
